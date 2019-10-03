'use strict';

import HttpError from 'http-errors';
import models from '../models/index';

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(400, 'AUTH - invalid request'));
  }

  const base64AuthHeader = request.headers.authorization.split(' ')[1];
  if (!base64AuthHeader) return next(new HttpError(400, 'AUTH - invalid request'));

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  const [username, password] = stringAuthHeader.split(':');

  if (!username || !password) return next(new HttpError(400, 'AUTH - invalid request'));

  return models.account.findOne({ where: { username } })
    .then((account) => {
      if (!account) {
        return next(new HttpError(400, 'AUTH -invalid request'));
      }
      return account.verifyPassword(password);
    })
    .then((account) => {
      request.account = account;
      return next();
    })
    .catch(next);
};
