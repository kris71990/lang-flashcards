'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createAccountMock, removeAccountMock } from './lib/account-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Account Router Tests', () => {
  beforeAll(startServer);
  afterEach(removeAccountMock);
  afterAll(stopServer);

  describe('/signup', () => {
    test('POST should create account and return token', () => {
      return superagent.post(`${API_URL}/signup`)
        .send({
          username: 'test',
          password: 'test', 
          email: 'test@test.com',
        })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.body.token).toBeTruthy();
        });
    });
  });

  test('POST should return 400 for missing username', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({
        password: 'test', 
        email: 'test@test.com',
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST should return 400 for missing email', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({
        username: 'test',
        password: 'test', 
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST should return 400 for missing password', () => {
    return superagent.post(`${API_URL}/signup`)
      .send({
        username: 'test', 
        email: 'test@test.com',
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });

  test('POST should return 409 if username already exists', () => {
    return createAccountMock()
      .then((accountMock) => {
        return superagent.post(`${API_URL}/signup`)
          .send({
            username: accountMock.request.username,
            password: 'blah',
            email: 'fake@user.com',
          })
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });

  test('POST should return 409 if email already exists', () => {
    return createAccountMock()
      .then((accountMock) => {
        return superagent.post(`${API_URL}/signup`)
          .send({
            username: 'meh',
            password: 'blah',
            email: accountMock.request.email,
          })
          .catch((err) => {
            expect(err.status).toEqual(409);
          });
      });
  });

  describe('/login', () => {
    test('GET should return token for successful login', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth(accountMock.request.username, accountMock.request.password)
            .then((res) => {
              expect(res.status).toEqual(200);
              expect(res.body.token).toBeTruthy();
            });
        });
    });

    test('GET should return 400 for incorrect username', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth('237849637896', accountMock.request.password)
            .catch((err) => {
              expect(err.status).toEqual(400);
            });
        });
    });

    test('GET should return 400 for incorrect password', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.get(`${API_URL}/login`)
            .auth(accountMock.request.username, '3892748394')
            .catch((err) => {
              expect(err.status).toEqual(400);
            });
        });
    });

    test('GET should return 400 with missing credentials', () => {
      return superagent.get(`${API_URL}/login`)
        .catch((err) => {
          expect(err.status).toEqual(400);
        });
    });
  });
});
