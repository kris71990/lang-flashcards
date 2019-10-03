'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import HttpError from 'http-errors';
import models from '../models/index';
import bearerAuthMiddleware from '../lib/bearer-auth-middleware';
import logger from '../lib/logger';
import * as profileUpdates from '../lib/profile-update';

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
  const { 
    profile, language, score, words,
  } = request.body;

  // simple update of username (!words, !score, !language, profile)
  // if no language data, only update name
  if (!language) {
    return models.profile.update(
      { ...profile },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, 'Returning updated profile (name change).');
        return response.json(prof[1][0]);
      })
      .catch(next);
  } 

  // update user score of language (!words, score, language, profile)
  // if score data, update scores for given language; add language if not on profile
  if (score) {
    let updatedLangs;
    if (!profile.languages.map(lang => lang.language).includes(language)) {
      updatedLangs = profileUpdates.addLanguage(profile.languages, language);
      updatedLangs = profileUpdates.updateScore(updatedLangs, language, score);
    } else {
      updatedLangs = profileUpdates.updateScore(profile.languages, language, score);
    }
    
    return models.profile.update(
      { languages: updatedLangs },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, `Returning updated profile (${language} updated).`);
        return response.json(prof[1][0]);
      })
      .catch(next);
  }

  // update of languages (!words, !score, language, profile)
  // add or remove a language
  if ((!words || words === null) && !score) {
    let updatedLangs;
    if (language.language) {
      updatedLangs = profileUpdates.removeLanguage(profile.languages, language.language);
    } else {
      updatedLangs = profileUpdates.addLanguage(profile.languages, language);
    }
    
    return models.profile.update(
      { languages: updatedLangs },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, `Returning updated profile (${language.language ? language.language : language} ${language.language ? 'removed' : 'added'}).`);
        return response.json(prof[1][0]);
      })
      .catch(next);
  } 

  // update word count when words are added (!score, language, words, profile)
  if (words) {
    const updatedLangs = profileUpdates.updateWordCount(profile.languages, language, words);
  
    return models.profile.update(
      { languages: updatedLangs },
      { where: { id: { [Op.eq]: request.params.id } }, returning: true },
    )
      .then((prof) => {
        if (prof[0] === 0) return next(new HttpError(400, 'Bad request'));
        logger.log(logger.INFO, `Returning updated profile (wordCount for ${language}).`);
        return response.json(prof[1][0]);
      })
      .catch(next);
  }

  // just in case, return profile
  return models.profile.findOne(
    { where: { id: { [Op.eq]: request.params.id } }, returning: true },
  )
    .then((prof) => {
      logger.log(logger.INFO, 'Returning profile (no updates registered).');
      return response.json(prof);
    })
    .catch(next);
});

export default profileRouter;
