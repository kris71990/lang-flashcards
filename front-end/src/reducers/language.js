const defaultState = {
  languages: null,
  languageSelection: null,
  languageSelectionCode: null,
  translationDirection: null,
  languageSelectionLocal: null,
  languageSelectionTransliteration: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'LANGUAGES_SET':
      return Object.assign({}, state, {
        languages: payload,
      });
    case 'WORDS_SET':
      const { 
        languageSelection, languageSelectionCode, translationDirection,
      } = payload;

      return Object.assign({}, state, {
        languageSelection, 
        languageSelectionCode, 
        translationDirection, 
        languageSelectionLocal: payload.languageSelectionLocal, 
        languageSelectionTransliteration: payload.languageSelectionTransliteration,
      });
    case 'LANGUAGE_DIR_SET':
      return Object.assign({}, state, {
        translationDirection: payload,
      });
    case 'LANGUAGE_SELECT':
      const { lang, id } = payload;
      let languageSelectionLocal;
      if (payload.transliteration) languageSelectionLocal = payload.localName;

      return Object.assign({}, state, {
        languageSelection: lang,
        languageSelectionCode: id,
        languageSelectionTransliteration: payload.transliteration,
        languageSelectionLocal,
      });
    case 'LANGUAGE_ADD':
      return Object.assign({}, state, {
        languages: [...state.languages, payload],
      });
    default:
      return state;
  }
};
