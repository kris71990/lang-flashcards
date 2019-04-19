'use strict';

/* Word Router
  - POST /word
  - POST /words/bulk
  - GET /words/:language
*/

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import models from '../models';

const jsonParser = json();
const wordRouter = new Router();
const Op = models.Sequelize.Op;

// Creates a single word in one language
wordRouter.post('/word', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /word');
  console.log(request.body);

  if (!request.body || 
    (!request.body.wordEnglish || !request.body.wordLocal || 
      !request.body.typeOfWord || !request.body.category || !request.body.languageId)) {
    return next(new HttpError(400, 'Bad Request'));
  }

  // If word exists, return existing word without creating duplicate
  // If it doesn't exist, create and return new word
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

// Creation of mulitple words at a time in one language
wordRouter.post('/words/bulk', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /words/bulk');

  const { 
    wordsEnglish, wordsLocal, wordTypes, category, transliteration, languageId, 
  } = request.body;

  // validation of request data
  // must be arrays, array lengths must equal eachother and be greater than one to post in bulk
  if (!(wordsEnglish instanceof Array || wordsLocal instanceof Array 
    || wordTypes instanceof Array || category instanceof Array)) {
    return next(new HttpError(400, 'Word format error'));
  }
  if ((wordsEnglish.length !== wordsLocal.length) || (wordsEnglish.length < 1 || wordsLocal.length < 1)) return next(new HttpError(400, 'Word organization error'));
  if (!languageId) return next(new HttpError(400, 'No language specified'));

  // remove duplicates
  const wordsEngReduced = []; 
  const wordsLocReduced = [];
  const wordTypesReduced = [];
  const categoryReduced = [];
  const transliterationReduced = [];
  wordsEnglish.forEach((y, i) => {
    if (!wordsEngReduced.includes(y)) {
      wordsEngReduced.push(y);
      wordsLocReduced.push(wordsLocal[i]);
      wordTypesReduced.push(wordTypes[i]);
      categoryReduced.push(category[i]);
      transliterationReduced.push(transliteration[i]);
    }
  });

  const wordsToPost = wordsEngReduced.map((english, i) => {
    return {
      wordEnglish: english,
      wordLocal: wordsLocReduced[i],
      typeOfWord: wordTypesReduced[i],
      category: categoryReduced[i],
      transliteration: transliterationReduced[i],
      languageId,
    };
  });

  // Create words
  // Increment word count in the language model by the number of words being created
  // Find and return all words in the language
  return models.word.bulkCreate(wordsToPost)
    .then((wordsCreated) => {
      return models.language.increment('wordCount', {
        where: { languageId },
        by: wordsCreated.length,
      })
        .then(() => {
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
});

// Return all words in one language
wordRouter.get('/words/:language', (request, response, next) => {
  logger.log(logger.INFO, 'Processing a get on /words');

  if (!request.params.language) return next(new HttpError(400, 'Bad Request'));

  return models.word.findAll({
    where: {
      languageId: request.params.language,
    },
  })
    .then((words) => {
      logger.log(logger.INFO, `Returning all words (${words.length}) for ${request.query.languageSelection} (id - ${request.params.language})`);
      return response.status(200).json(words);
    })
    .catch(next);
});

export default wordRouter;
