'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { mockLanguage, removeMocks } from './lib/language-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Language Router Tests', () => {
  beforeAll(startServer);
  afterEach(removeMocks);
  afterAll(stopServer);

  describe('POST /language', () => {
    test('Post should return new language (201)', () => {
      return superagent.post(`${API_URL}/language`)
        .send({
          languageName: 'Dutch',
        })
        .then((response) => {
          const { language } = response.body;
          expect(response.status).toEqual(201);
          expect(language).toBeInstanceOf(Object);
          expect(language.languageName).toEqual('Dutch');
          expect(language.languageId).toBeTruthy();
        });
    });

    test('Post should return conflict (409) if language already exists', () => {
      return mockLanguage('Dutch')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/language`)
            .send({
              languageName: languageMock.languageName,
            })
            .catch((error) => {
              expect(error.status).toEqual(409);
            });
        });
    });

    test('Post should return bad request (400) if missing information', () => {
      return superagent.post(`${API_URL}/language`)
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });
  });
});
