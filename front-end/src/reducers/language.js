export default (state = {}, { type, payload }) => {
  switch (type) {
    case 'LANGUAGES_SET':
      state.languages = payload;
      return state;
    case 'LANGUAGE_SELECT':
      state.languageSelection = payload;
      return state;
    default:
      return state;
  }
};
