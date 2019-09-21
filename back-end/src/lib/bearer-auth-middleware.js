'use strict';

import HttpError from 'http-errors';
import jsonWebToken from 'jsonwebtoken';
import models from '../models/index';

const promisify = callback => (...args) => {
  return new Promise((resolve, reject) => {
    callback(...args, (error, data) => {
      if (error) reject(error);
      return resolve(data);
    });
  });
};

export default (request, response, next) => {
  if (!request.headers.authorization) {
    return next(new HttpError(401, 'AUTH - unauthorized'));
  }

  const token = request.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return next(new HttpError(401, 'AUTH - invalid request'));
  }

  return promisify(jsonWebToken.verify)(token, process.env.ACCOUNT_SECRET)
    .catch((error) => {
      return next(new HttpError(401, `AUTH - jsonWebToken Error ${error}`));
    })
    .then((decryptedToken) => {
      return models.account.findOne({ 
        where: { 
          tokenSeed: decryptedToken.tokenSeed,
        },
      });
    })
    .then((account) => {
      if (!account) {
        return next(new HttpError(404, 'AUTH - invalid request'));
      }
      request.account = account;
      return next();
    })
    .catch(next);
};
