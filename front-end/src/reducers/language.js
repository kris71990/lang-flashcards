const defaultState = {
  languages: null,
  languageSelection: null,
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
      return Object.assign({}, state, {
        languageSelection: payload,
      });
    case 'LANGUAGE_ADD':
      return Object.assign({}, state, {
        languages: [...state.languages, payload],
      });
    default:
      return state;
  }
};
