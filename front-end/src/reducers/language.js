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
    case 'LANGUAGE_SELECT':
      const { languageSelection, translationDirection } = payload;
      return Object.assign({}, state, {
        languageSelection, translationDirection,
      });
    case 'LANGUAGE_ADD':
      return Object.assign({}, state, {
        languages: [...state.languages, payload],
      });
    default:
      return state;
  }
};
