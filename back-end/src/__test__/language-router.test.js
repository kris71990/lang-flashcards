'use strict';

/* Language Router
  - POST /language
    - 201 - successful creation
    - 409 - error on duplicate
    - 400 - error on missing language data (languageName)
    - 401 - error when user is not authorized
  - GET /languages/all
    - 200 - successful return of all existing languages
*/

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { mockLanguage, removeMocks } from './lib/language-mock';
import { createAccountMock, removeAccountMock } from './lib/account-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Language Router Tests', () => {
  beforeAll(startServer);
  afterEach(removeMocks);
  afterEach(removeAccountMock);
  afterAll(stopServer);

  describe('POST /language', () => {
    test('POST should return new language (201)', () => {
      return createAccountMock()
        .then((accountMock) => {
          return superagent.post(`${API_URL}/language`)
            .set('Authorization', `Bearer ${accountMock.token}`)
            .send({ languageName: 'Dutch', transliteration: false })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body).toBeInstanceOf(Object);
              expect(response.body.languageName).toEqual('Dutch');
              expect(response.body.languageId).toBeTruthy();
            });
        });
    });

    test('POST should return conflict (409) if language already exists', () => {
      return createAccountMock() 
        .then((accountMock) => {
          return mockLanguage('Dutch')
            .then((languageMock) => {
              return superagent.post(`${API_URL}/language`)
                .set('Authorization', `Bearer ${accountMock.token}`)
                .send({
                  languageName: languageMock.languageName,
                  transliteration: false,
                })
                .catch((error) => {
                  expect(error.status).toEqual(409);
                });
            });
        });
    });

    test('POST should return bad request (400) if missing information', () => {
      return createAccountMock() 
        .then((accountMock) => {
          return superagent.post(`${API_URL}/language`)
            .set('Authorization', `Bearer ${accountMock.token}`)
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });

    test('POST should return 401 if unauthorized', () => {
      return superagent.post(`${API_URL}/language`)
        .send({ languageName: 'Dutch', transliteration: false })
        .catch((error) => {
          expect(error.status).toEqual(401);
        });
    });
  });

  describe('GET /languages/all', () => {
    test('GET should return all languages', () => {
      return mockLanguage('Dutch')
        .then((lang1) => {
          return mockLanguage('German')
            .then((lang2) => {
              return superagent.get(`${API_URL}/languages/all`)
                .then((response) => {
                  expect(response.status).toEqual(200);
                  expect(response.body).toBeInstanceOf(Array);
                  expect(response.body).toHaveLength(2);
                  expect(response.body[0].languageName).toEqual(lang1.languageName);
                  expect(response.body[1].languageName).toEqual(lang2.languageName);
                  expect(response.body[0].languageId).toBeTruthy();
                  expect(response.body[1].languageId).toBeTruthy();
                });
            });
        });
    });
  });
});
