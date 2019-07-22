'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import passport from 'passport';
import HttpError from 'http-errors';
// import basicAuthMiddleware from '../lib/basic-auth-middleware';
import models from '../models';
import logger from '../lib/logger';

const accountRouter = new Router();
const jsonParser = json();

accountRouter.post('/signup', jsonParser, (request, response, next) => {
  const { username, email } = request.body;
  if (!username || !request.body.password || !email) {
    return next(new HttpError(400, 'Bad request'));
  }
  
  logger.log(logger.INFO, `Creating account for username: '${username}'`);

  return models.account.createAccount(username, email, request.body.password)
    .then((account) => {
      delete request.body.password;
      logger.log(logger.INFO, 'Creating auth token');
      return account.generateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, 'Returning successfully created token');
      response.cookie('nps-token', token, { maxAge: 9000000 });
      return response.json({ token });
    })
    .catch(next);
});

accountRouter.get('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), (request, response, next) => {
  logger.log(logger.INFO('??????'));
  return next;
  // return request.account.generateToken()
  //   .then((token) => {
  //     logger.log(logger.INFO, 'Returning token');
  //     response.cookie('nps-token', token, { maxAge: 9000000 });
  //     return response.json({ token });
  //   })
  //   .catch(next);
});

export default accountRouter;
