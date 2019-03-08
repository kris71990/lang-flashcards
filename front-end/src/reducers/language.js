const defaultState = {
  languages: null,
  languageSelection: null,
  languageSelectionCode: null,
  translationDirection: null,
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'LANGUAGES_SET':
      return Object.assign({}, state, {
        languages: payload,
      });
    case 'LANGUAGE_DIR_SET':
      return Object.assign({}, state, {
        translationDirection: payload,
      });
    case 'LANGUAGE_SELECT':
      const { lang, id } = payload;
      return Object.assign({}, state, {
        languageSelection: lang,
        languageSelectionCode: id,
      });
    case 'LANGUAGE_ADD':
      return Object.assign({}, state, {
        languages: [...state.languages, payload],
      });
    default:
      return state;
  }
};
