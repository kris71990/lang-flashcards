import * as languageActions from '../actions/language';

describe('Language Actions', () => {
  test('languageSelect should return object with language selected', () => {
    const lang = 'dutch';
    const expectedReturn = {
      type: 'LANGUAGE_SELECT',
      payload: lang,
    };

    expect(languageActions.languageSelect(lang)).toEqual(expectedReturn);
  });

  test('languageTransDirSet should return object without translation direction', () => {
    const dir = 'eng-native';
    const expectedReturn = {
      type: 'LANGUAGE_DIR_SET',
      payload: dir,
    };

    expect(languageActions.languageTransDirSet(dir)).toEqual(expectedReturn);
  });

  test('languagesFetch should return object with languages', () => {
    const langs = ['dutch', 'german', 'french'];
    const expectedReturn = {
      type: 'LANGUAGES_SET',
      payload: langs,
    };

    expect(languageActions.languagesFetch(langs)).toEqual(expectedReturn);
  });

  test('languageAdd should return object with language', () => {
    const lang = 'dutch';
    const expectedReturn = {
      type: 'LANGUAGE_ADD',
      payload: lang,
    };

    expect(languageActions.languageAdd(lang)).toEqual(expectedReturn);
  });
});
