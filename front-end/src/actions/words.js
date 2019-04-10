import superagent from 'superagent';

const wordsFetch = words => ({
  type: 'WORDS_SET',
  payload: words,
});

const wordAdd = word => ({
  type: 'WORD_ADD',
  payload: word,
});

const wordsBulkAdd = words => ({
  type: 'BULK_ADD',
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

const wordPostRequest = word => (store) => {
  return superagent.post(`${API_URL}/word`)
    .send({ word })
    .then((response) => {
      return store.dispatch(wordAdd(response.body));
    });
};

const wordsBulkPostRequest = words => (store) => {
  return superagent.post(`${API_URL}/words/bulk`)
    .send(words)
    .then((response) => {
      return store.dispatch(wordsBulkAdd(response.body));
    });
};

export {
  wordsFetchRequest,
  wordPostRequest,
  wordsBulkPostRequest,
};
