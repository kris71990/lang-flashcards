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
    default:
      return state;
  }
};
