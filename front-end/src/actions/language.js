import superagent from 'superagent';

const languageSelect = language => ({
  type: 'LANGUAGE_SELECT',
  payload: language,
});

const languageTransDirSet = dir => ({
  type: 'LANGUAGE_DIR_SET',
  payload: dir,
});

const languagesFetch = languages => ({
  type: 'LANGUAGES_SET',
  payload: languages,
});

const languageAdd = language => ({
  type: 'LANGUAGE_ADD',
  payload: language,
});

const languagesFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}/languages/all`)
    .then((response) => {
      return store.dispatch(languagesFetch(response.body));
    });
};

const languageCreateRequest = lang => (store) => {
  const { selectedLanguage, transliteration } = lang;
  return superagent.post(`${API_URL}/language`)
    .send({ languageName: selectedLanguage, transliteration, wordCount: 0 })
    .then((response) => {
      return store.dispatch(languageAdd(response.body.language));
    });
};

export { 
  languageSelect,
  languagesFetch,
  languagesFetchRequest,
  languageCreateRequest,
  languageTransDirSet,
};
