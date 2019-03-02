export default (state = { languages: null, languageSelection: null }, { type, payload }) => {
  switch (type) {
    case 'LANGUAGES_SET':
      return Object.assign({}, state, {
        languages: payload,
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
