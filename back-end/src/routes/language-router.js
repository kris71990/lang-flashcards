'use strict';

/* Language Router
  - POST /language
  - GET /languages/all
*/

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import logger from '../lib/logger';
import models from '../models';

const jsonParser = json();
const languageRouter = new Router();

// POST /language creates a new language
languageRouter.post('/language', jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing a post on /language');
  
  if (!request.body || !request.body.languageName) return next(new HttpError(400, 'Bad request'));

  const { languageName, transliteration, wordCount } = request.body;

  let initialization;
  if (!wordCount) {
    initialization = 0;
  } else {
    initialization = wordCount;
  }

  return models.language.create({
    languageName,
    transliteration,
    wordCount: initialization,
  })
    .then((language) => {
      logger.log(logger.INFO, 'Language created.');
      return response.status(201).json({ language });
    })
    .catch(next);
});

// GET /languages/all finds and returns all lanaguages
languageRouter.get('/languages/all', (request, response, next) => {
  logger.log(logger.INFO, 'Processing a get on /languages/all');

  return models.language.findAll()
    .then((languages) => {
      logger.log(logger.INFO, 'Returning all existing languages');
      return response.status(200).json(languages);
    })
    .catch(next);
});

export default languageRouter;
