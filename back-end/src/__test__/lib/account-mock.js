'use strict';

import faker from 'faker';
import models from '../../models';

const createAccountMock = () => {
  const mock = {};
  mock.request = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };
  
  return models.account.createAccount(
    mock.request.username, mock.request.email, mock.request.password,
  )
    .then((account) => {
      mock.account = account;
      return account.generateToken();
    })
    .then((token) => {
      mock.token = token;
      return models.account.find({ where: { id: mock.account.id } });
    })
    .then((account) => {
      mock.account = account;
      return mock;
    });
};

const removeAccountMock = () => models.account.destroy({ where: {} }).then(() => console.log('content removed'));

export { createAccountMock, removeAccountMock };
