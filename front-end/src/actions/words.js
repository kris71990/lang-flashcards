import superagent from 'superagent';

const wordsFetch = words => ({
  type: 'WORDS_SET',
  payload: words,
});

const wordsFetchRequest = langData => (store) => {
  const { languageSelection, languageSelectionCode, translationDirection } = langData;
  return superagent.get(`${API_URL}/words/${languageSelectionCode}`)
    .then((response) => {
      return store.dispatch(wordsFetch({
        words: response.body,
        languageSelection,
        languageSelectionCode,
        translationDirection,
      }));
    });
};

export {
  wordsFetchRequest,
};
