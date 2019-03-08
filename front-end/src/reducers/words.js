const defaultState = {
  languageSelection: null,
  languageSelectionCode: null,
  translationDirection: null,
  words: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'WORDS_SET':
      const { 
        languageSelection, languageSelectionCode, translationDirection, words, 
      } = payload;
      return Object.assign({}, state, {
        words, languageSelection, translationDirection, languageSelectionCode,
      });
    case 'WORD_ADD':
      return Object.assign({}, state, {
        words: [...words, payload],
      });
    default:
      return state;
  }
};
