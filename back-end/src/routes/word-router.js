'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import models from '../models';

const jsonParser = json();
const wordRouter = new Router();
const Op = models.Sequelize.Op;

wordRouter.post('/word', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /word');

  if (!request.body || 
    (!request.body.wordEnglish || !request.body.wordLocal || 
      !request.body.typeOfWord || !request.body.category || !request.body.languageId)) {
    return next(new HttpError(400, 'Bad Request'));
  }

  return models.word.findOrCreate({
    where: {
      languageId: request.body.languageId,
      [Op.and]: { wordLocal: request.body.wordLocal },
    },
    defaults: {
      ...request.body,
    },
  })
    .then((wordRes) => {
      const [word, status] = wordRes;
      if (!status) {
        logger.log(logger.INFO, 'Word already exists, returning existing word');
        return response.status(200).json(word);
      }

      return models.language.increment('wordCount', {
        where: {
          languageId: request.body.languageId,
        },
      })
        .then(() => {
          logger.log(logger.INFO, 'Word created and count updated.');
          return response.status(201).json(word);
        });
    })
    .catch(next);
});

wordRouter.post('/words/bulk', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /words/bulk');

  const { 
    wordsEnglish, wordsLocal, wordTypes, category, languageId, 
  } = request.body;

  if (!(wordsEnglish instanceof Array || wordsLocal instanceof Array 
    || wordTypes instanceof Array)) {
    return next(new HttpError(400, 'Word format error'));
  }
  if ((wordsEnglish.length !== wordsLocal.length) || (wordsEnglish.length < 1 || wordsLocal.length < 1)) return next(new HttpError(400, 'Word organization error'));
  if (!languageId) return next(new HttpError(400, 'No language specified'));

  // remove duplicates
  const wordsEngReduced = []; 
  const wordsLocReduced = [];
  const wordTypesReduced = [];
  const categoryReduced = [];
  wordsEnglish.forEach((y, i) => {
    if (!wordsEngReduced.includes(y)) {
      wordsEngReduced.push(y);
      wordsLocReduced.push(wordsLocal[i]);
      wordTypesReduced.push(wordTypes[i]);
      categoryReduced.push(category[i]);
    }
  });

  const wordsToPost = wordsEngReduced.map((english, i) => {
    return {
      wordEnglish: english,
      wordLocal: wordsLocReduced[i],
      typeOfWord: wordTypesReduced[i],
      category: categoryReduced[i],
      languageId,
    };
  });

  return models.word.bulkCreate(wordsToPost)
    .then((wordsCreated) => {
      return models.word.findAll({
        where: {
          languageId,
        },
      })
        .then((words) => {
          logger.log(logger.INFO, `Created ${wordsCreated.length} new words and returning all words (${words.length})`);
          return response.status(201).json(words);
        })
        .catch(next);
    });
});

wordRouter.get('/words/:language', (request, response, next) => {
  logger.log(logger.INFO, 'Processing a get on /words');

  if (!request.params.language) return next(new HttpError(400, 'Bad Request'));

  return models.word.findAll({
    where: {
      languageId: request.params.language,
    },
  })
    .then((words) => {
      logger.log(logger.INFO, `Returning all words (${words.length}) for ${request.params.language}`);
      return response.status(200).json(words);
    })
    .catch(next);
});

export default wordRouter;
