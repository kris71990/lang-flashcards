import superagent from 'superagent';

const wordsFetch = words => ({
  type: 'WORDS_SET',
  payload: words,
});

const wordAdd = word => ({
  type: 'WORD_ADD',
  payload: word,
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

const wordPostRequest = (word, languageId) => (store) => {
  console.log(word, languageId);
  const { wordEnglish, wordLocal } = word;
  return superagent.post(`${API_URL}/word`)
    .send({ wordEnglish, wordLocal, languageId })
    .then((response) => {
      return store.dispatch(wordAdd(response.body));
    });
};

export {
  wordsFetchRequest,
  wordPostRequest,
};
