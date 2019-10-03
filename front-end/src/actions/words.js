import superagent from 'superagent';

const wordsFetch = words => ({
  type: 'WORDS_SET',
  payload: words,
});

const wordAdd = word => ({
  type: 'WORD_ADD',
  payload: word,
});

const wordUpdate = word => ({
  type: 'WORD_UPDATE',
  payload: word,
});

const wordsBulkAdd = words => ({
  type: 'BULK_ADD',
  payload: words,
});

const wordsFetchRequest = langData => (store) => {
  const { 
    languageSelection, languageSelectionCode, translationDirection, languageSelectionLocal, languageSelectionTransliteration, spokenIn, family, totalSpeakers,
  } = langData;
  return superagent.get(`${API_URL}/words/${languageSelectionCode}`)
    .query(langData)
    .then((response) => {
      return store.dispatch(wordsFetch({
        words: response.body,
        languageSelection,
        languageSelectionCode,
        translationDirection,
        languageSelectionLocal,
        languageSelectionTransliteration,
        spokenIn,
        family,
        totalSpeakers,
      }));
    });
};

const wordPostRequest = word => (store) => {
  const { auth: token } = store.getState();

  return superagent.post(`${API_URL}/word`)
    .set('Authorization', `Bearer ${token}`)
    .send(word)
    .then((response) => {
      return store.dispatch(wordAdd(response.body));
    });
};

const wordsBulkPostRequest = words => (store) => {
  const { auth: token } = store.getState();
  
  return superagent.post(`${API_URL}/words/bulk`)
    .set('Authorization', `Bearer ${token}`)
    .send(words)
    .then((response) => {
      return store.dispatch(wordsBulkAdd(response.body));
    });
};

const wordUpdateRequest = word => (store) => {
  const { auth: token } = store.getState();

  return superagent.put(`${API_URL}/word/${word.id}`)
    .set('Authorization', `Bearer ${token}`)
    .send(word)
    .then((response) => {
      return store.dispatch(wordUpdate(response.body));
    });
};

export {
  wordsFetchRequest, wordPostRequest, wordsBulkPostRequest, wordUpdateRequest,
};
