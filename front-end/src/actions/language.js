import superagent from 'superagent';

const languageSelect = language => ({
  type: 'LANGUAGE_SELECT',
  payload: language,
});

const languagesFetch = languages => ({
  type: 'LANGUAGES_SET',
  payload: languages,
});

const languagesFetchRequest = () => (store) => {
  return superagent.get(`${API_URL}/languages/all`)
    .then((response) => {
      return store.dispatch(languagesFetch(response.body));
    });
};

export { 
  languageSelect,
  languagesFetch,
  languagesFetchRequest,
};
