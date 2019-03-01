'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { mockLanguage, removeMocks } from './lib/language-mock';
import { mockWord, mockWordsBulk } from './lib/word-mock';

const API_URL = `http://localhost:${process.env.PORT}`;

describe('Word Router Tests', () => {
  beforeAll(startServer);
  afterEach(removeMocks);
  afterAll(stopServer);

  describe('POST /word', () => {
    test('POST a word will create a word associated with a language', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/word`)
            .send({
              wordEnglish: 'girl',
              wordLocal: 'madchen',
              languageId: languageMock.languageId,
            })
            .then((response) => {
              const { word } = response.body;
              expect(response.status).toEqual(201);
              expect(word.wordEnglish).toEqual('girl');
              expect(word.wordLocal).toEqual('madchen');
              expect(word.languageId).toEqual(languageMock.languageId);
              expect(word.wordId).toBeTruthy();
            });
        });
    });

    test('POST same word in language will return existing version of word', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return mockWord('madchen', 'girl', languageMock.languageId)
            .then((wordMock) => {
              return superagent.post(`${API_URL}/word`)
                .send({
                  wordEnglish: wordMock.wordEnglish,
                  wordLocal: wordMock.wordLocal,
                  languageId: languageMock.languageId,
                })
                .then((response) => {
                  expect(response.status).toEqual(200);
                });
            });
        });
    });

    test('POST word with missing languageId returns bad request (400)', () => {
      return superagent.post(`${API_URL}/word`)
        .send({
          wordEnglish: 'girl',
          wordLocal: 'madchen',
        })
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });

    test('POST word with missing local word returns bad request (400)', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/word`)
            .send({
              wordEnglish: 'girl',
              languageId: languageMock.languageId,
            })
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });

    test('POST word with missing english word returns bad request (400)', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/word`)
            .send({
              wordLocal: 'madchen',
              languageId: languageMock.languageId,
            })
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });
  });

  describe('GET /words/:language', () => {
    test('GET words with languageId should return all words associated with that language', () => {
      return mockLanguage('Dutch')
        .then((languageMock) => {
          return mockWordsBulk(5, languageMock.languageId)
            .then(() => {
              return superagent.get(`${API_URL}/words/${languageMock.languageId}`)
                .then((response) => {
                  const { words } = response.body;
                  expect(response.status).toEqual(200);
                  expect(words).toBeInstanceOf(Array);
                  expect(words).toHaveLength(5);
                  expect(words[1].languageId).toEqual(languageMock.languageId);
                });
            });
        });
    });

    test('GET words with malformed languageId should return bad request', () => {
      return superagent.get(`${API_URL}/words/jsfdfsdfd`)
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });

    test('GET words from language that has no words should return empty array', () => {
      return mockLanguage('Dutch')
        .then((languageMock) => {
          return superagent.get(`${API_URL}/words/${languageMock.languageId}`)
            .then((response) => {
              expect(response.status).toEqual(200);
              expect(response.body.words).toBeInstanceOf(Array);
              expect(response.body.words).toHaveLength(0);
            });
        });
    });
  });
});
