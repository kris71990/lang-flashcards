'use strict';

/* Word Router
  - POST /word
    - 201 - successful creation of word 
    - 200 - if duplicate word is posted, successful return of existing word (no duplicate creation)
    - 400 - bad request if no languageId, local word, english word, category, or word type
  - POST /words/bulk
    - 201 - successful creation of multiple words
    - 400 - bad request if unequal array lengths, no languageId, or data are not arrays
  - GET /words/:language
    - 201 - successful return of all words in a language
    - 200 - successful return of empty array if no words exist in a language
    - 400 - error if bad languageId
*/

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
              typeOfWord: 'noun',
              category: 'person',
              languageId: languageMock.languageId,
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body.wordEnglish).toEqual('girl');
              expect(response.body.wordLocal).toEqual('madchen');
              expect(response.body.typeOfWord).toEqual('noun');
              expect(response.body.category).toEqual('person');
              expect(response.body.languageId).toEqual(languageMock.languageId);
              expect(response.body.wordId).toBeTruthy();
            });
        });
    });

    test('POST same word in language will return existing version of word', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return mockWord('madchen', 'girl', 'noun', 'person', languageMock.languageId)
            .then((wordMock) => {
              return superagent.post(`${API_URL}/word`)
                .send({
                  wordEnglish: wordMock.wordEnglish,
                  wordLocal: wordMock.wordLocal,
                  typeOfWord: wordMock.typeOfWord,
                  category: wordMock.category,
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

    test('POST word with missing word type returns bad request (400)', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/word`)
            .send({
              wordLocal: 'madchen',
              wordEnglish: 'girl',
              category: 'person',
              languageId: languageMock.languageId,
            })
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });

    test('POST word with missing category returns bad request (400)', () => {
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/word`)
            .send({
              wordLocal: 'madchen',
              wordEnglish: 'girl',
              typeOfWord: 'noun',
              languageId: languageMock.languageId,
            })
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    });
  });

  describe('POST /words/bulk', () => {
    test('POST words in bulk returns all words in language', () => {
      const wordsEnglish = ['man', 'woman', 'girl'];
      const wordsLocal = ['mann', 'frau', 'madchen'];
      const wordTypes = ['noun', 'noun', 'noun'];
      const category = ['person', 'person', 'person'];
      const transliteration = [null, 'ni hao', 'shan'];

      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/words/bulk`)
            .send({ 
              wordsEnglish, 
              wordsLocal, 
              wordTypes, 
              category, 
              transliteration, 
              languageId: languageMock.languageId, 
            })
            .then((response) => {
              expect(response.status).toEqual(201);
              expect(response.body).toBeInstanceOf(Array);
              expect(response.body).toHaveLength(3);
              expect(response.body[0].wordId).toBeTruthy();
              expect(response.body[1].wordId).toBeTruthy();
              expect(response.body[2].wordId).toBeTruthy();
            });
        });
    });

    test('POST words with no language id returns bad request', () => {
      const wordsEnglish = ['man', 'woman', 'girl'];
      const wordsLocal = ['mann', 'frau', 'madchen'];
      const wordTypes = ['noun', 'noun', 'noun'];
      const category = ['person', 'person', 'person'];

      return superagent.post(`${API_URL}/words/bulk`)
        .send({ 
          wordsEnglish, wordsLocal, wordTypes, category, 
        })
        .catch((error) => {
          expect(error.status).toEqual(400);
        });
    });

    test('POST unequal number of words returns bad request', () => {
      const wordsEnglish = ['man', 'woman'];
      const wordsLocal = ['mann', 'frau', 'madchen'];
      const wordTypes = ['noun', 'noun', 'noun'];
      const category = ['person', 'person', 'person'];

      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/words/bulk`)
            .send({ 
              wordsEnglish, wordsLocal, wordTypes, category, languageId: languageMock.languageId, 
            })
            .catch((error) => {
              expect(error.status).toEqual(400);
            });
        });
    }); 

    test('POST with wrong type of word data returns bad request', () => {
      const wordsEnglish = 'man';
      const wordsLocal = 'mann';
      return mockLanguage('German')
        .then((languageMock) => {
          return superagent.post(`${API_URL}/words/bulk`)
            .send({ wordsEnglish, wordsLocal, languageId: languageMock.languageId })
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
                  expect(response.status).toEqual(200);
                  expect(response.body).toBeInstanceOf(Array);
                  expect(response.body).toHaveLength(5);
                  expect(response.body[1].languageId).toEqual(languageMock.languageId);
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
              expect(response.body).toBeInstanceOf(Array);
              expect(response.body).toHaveLength(0);
            });
        });
    });
  });
});
