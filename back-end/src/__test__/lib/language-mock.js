'use strict';

import models from '../../models/index';

const mockLanguage = (languageName) => {
  return models.language.create({
    languageName, wordCount: 0,
  });
};

const removeMocks = () => {
  return models.language.destroy({ cascade: true, truncate: true });
};

export { mockLanguage, removeMocks };
