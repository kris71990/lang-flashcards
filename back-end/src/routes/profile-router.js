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
  console.log(request);
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

  return models.profile.update(
    { ...request.body },
    { where: { id: { [Op.eq]: request.params.id } }, returning: true },
  )
    .then((profile) => {
      if (profile[0] === 0) return next(new HttpError(400, 'Bad request'));
      logger.log(logger.INFO, 'Returning updated profile');
      return response.json(profile[1][0]);
    })
    .catch(next);
});

export default profileRouter;
