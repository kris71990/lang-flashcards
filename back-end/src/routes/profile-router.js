'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import models from '../models/index';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';

const jsonParser = json();
const profileRouter = new Router();
const Op = models.Sequelize.Op;

profileRouter.post('/profile', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.body.name) return next(new HttpError(400, 'Bad Request'));
  logger.log(logger.INFO, 'Processing POST on /profile');

  return models.profile.create({
    ...request.body,
    accountId: request.account.id,
  })
    .then((profile) => {
      logger.log(logger.INFO, `Returning new profile for ${request.body.name}`);
      return response.json(profile);
    })
    .catch(next);
});

profileRouter.get('/profile/me', bearerAuthMiddleware, (request, response, next) => {
  logger.log(logger.INFO, 'Processing GET /profile/me');

  return models.profile.findOne(
    { where: { accountId: { [Op.eq]: request.account.id } } },
  )
    .then((profile) => {
      if (!profile) return response.sendStatus(404);

      return response.json(profile);
    })
    .catch(next);
});

profileRouter.put('/profile/:id', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  logger.log(logger.INFO, 'Processing PUT on /profile');
  const { profile, language, words } = request.body;
  console.log(request.body);

  // simple update of username
  if (!language && words === null) {
    return models.profile.update(
      { ...profile },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, 'Returning updated profile');
        return response.json(prof[1][0]);
      })
      .catch(next);
  } 
  
  if (language && words === null) {
    // update of languages
    const updatedLangs = [...profile.languages];
    updatedLangs.push({ 
      language, wordsAdded: null, score: [], skillLevel: null, added: new Date(),
    });
    
    return models.profile.update(
      { languages: updatedLangs },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, 'Returning updated profile');
        return response.json(prof[1][0]);
      })
      .catch(next);
  } 

  // update word count when words are added
  if (language && words > 0) {
    const updatedLangs = [...profile.languages];
    updatedLangs.map((lang) => {
      if (lang.language === language) {
        if (lang.wordsAdded === null) {
          lang.wordsAdded = words;
        } else {
          lang.wordsAdded += words;
        }
        return lang;
      }
      return lang;
    });
  
    return models.profile.update(
      { languages: updatedLangs },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, 'Returning updated profile');
        return response.json(prof[1][0]);
      })
      .catch(next);
  }

  // just in case, return profile
  return models.profile.findOne(
    { where: { id: { [Op.eq]: request.params.id } }, returning: true },
  )
    .then((prof) => {
      logger.log(logger.INFO, 'Returning profile');
      return response.json(prof);
    })
    .catch(next);
});

export default profileRouter;
