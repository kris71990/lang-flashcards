'use strict';

import models from '../../models';
import { createAccountMock, removeAccountMock } from './account-mock';

const createProfileMock = () => {
  const resultMock = {};

  return createAccountMock()
    .then((accountSetMock) => {
      resultMock.accountSetMock = accountSetMock;

      return models.profile.create({
        name: 'kris',
        languages: [],
        accountId: accountSetMock.account.id,
      });
    })
    .then((profile) => {
      resultMock.profile = profile;
      return resultMock;
    });
};

const removeProfileMock = () => {
  return Promise.all([
    models.profile.destroy({ where: {} }),
    removeAccountMock(),
  ]);
};

export { createProfileMock, removeProfileMock };
