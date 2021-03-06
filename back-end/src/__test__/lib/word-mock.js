'use strict';

import faker from 'faker';
import models from '../../models/index';

const mockWord = (wordLocal, wordEnglish, typeOfWord, category, languageId) => {
  return models.word.create({
    wordLocal, wordEnglish, typeOfWord, category, languageId,
  });
};

const mockWordsBulk = (quantity, languageId) => {
  const words = [];
  for (let i = 0; i < quantity; i++) {
    words.push({
      wordEnglish: faker.random.word(),
      wordLocal: faker.random.word(),
      category: faker.random.word(),
      typeOfWord: faker.random.word(),
      languageId,
    });
  }
  return models.word.bulkCreate(words);
};

export { mockWord, mockWordsBulk };
