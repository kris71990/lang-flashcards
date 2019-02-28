'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import models from '../models';

const jsonParser = json();
const wordRouter = new Router();

wordRouter.post('/word', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /word');

  if (!request.body || (!request.body.wordEnglish || !request.body.wordLocal)) {
    return new HttpError(400, 'Bad request');
  }
  
  return models.word.create({
    ...request.body,
  })
    .then((word) => {
      logger.log(logger.INFO, 'Word created.');
      return response.json({ word });
    })
    .catch(next);
});

export default wordRouter;
