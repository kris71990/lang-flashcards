'use strict';

import HttpError from 'http-errors';

export default (request, response, next) => {
  console.log(request.headers);
  if (!request.headers.authorization || request.headers.authorization.split(' ')[0] !== 'Token') {
    next(new HttpError(400, 'AUTH - invalid request'));
  }

  return request.headers.authorization.split(' ')[1];

  // const base64AuthHeader = request.headers.authorization.split('Basic ')[1];
  // if (!base64AuthHeader) next(new HttpError(400, 'AUTH - invalid request'));

  // const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  // const [username, password] = stringAuthHeader.split(':');

  // if (!username || !password) next(new HttpError(400, 'AUTH - invalid request'));
};
