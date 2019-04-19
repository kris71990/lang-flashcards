const defaultState = {
  languages: null,
  languageSelection: null,
  languageSelectionCode: null,
  translationDirection: null,
  languageSelectionLocal: null,
  languageSelectionTransliteration: null,
  spokenIn: null,
  family: null,
  totalSpeakers: null,
  wordCount: null,
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
        family: payload.family,
        spokenIn: payload.spokenIn,
        totalSpeakers: payload.totalSpeakers,
      });
    case 'LANGUAGE_DIR_SET':
      return Object.assign({}, state, {
        translationDirection: payload,
      });
    case 'LANGUAGE_SELECT':
      const { 
        lang, id, spokenIn, totalSpeakers, family, 
      } = payload;
      const languageSelectionLocal = payload.localName;

      return Object.assign({}, state, {
        languageSelection: lang,
        languageSelectionCode: id,
        languageSelectionTransliteration: payload.transliteration,
        languageSelectionLocal,
        spokenIn,
        totalSpeakers,
        family,
      });
    case 'LANGUAGE_ADD':
      return Object.assign({}, state, {
        languages: [...state.languages, payload],
      });
    default:
      return state;
  }
};
