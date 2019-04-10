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
    test('POST should return new language (201)', () => {
      return superagent.post(`${API_URL}/language`)
        .send({ languageName: 'Dutch' })
        .then((response) => {
          const { language } = response.body;
          expect(response.status).toEqual(201);
          expect(language).toBeInstanceOf(Object);
          expect(language.languageName).toEqual('Dutch');
          expect(language.languageId).toBeTruthy();
        });
    });

    test('POST should return conflict (409) if language already exists', () => {
      return mockLanguage('Dutch')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/language`)
            .send({
              languageName: languageMock.languageName,
              wordCount: 0,
            })
            .catch((error) => {
              expect(error.status).toEqual(409);
            });
        });
    });

    test('POST should return bad request (400) if missing information', () => {
      return superagent.post(`${API_URL}/language`)
        .catch((error) => {
          expect(error.status).toEqual(400);
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
