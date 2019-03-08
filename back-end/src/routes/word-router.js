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
    (!request.body.wordEnglish || !request.body.wordLocal || !request.body.languageId)) {
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
        return response.status(200).json({ word });
      }
      logger.log(logger.INFO, 'Word created.');
      return response.status(201).json({ word });
    })
    .catch(next);
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
      logger.log(logger.INFO, `Returning all words for ${request.params.language}`);
      return response.status(200).json(words);
    })
    .catch(next);
});

export default wordRouter;
