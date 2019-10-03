const defaultState = {
  auth: null,
  profile: null,
  language: {
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
  },
  words: {
    languageSelection: null,
    languageSelectionCode: null,
    translationDirection: null,
    words: null,
  },
};

const defaultProps = {
  language: defaultState.language,
  createLanguage: jest.fn(),
  setLanguage: jest.fn(),
  setTransDir: jest.fn(),
  languagesFetch: jest.fn(),
  wordsFetch: jest.fn(),
  location: { pathname: '/' },
  history: {},
  signup: jest.fn(),
  login: jest.fn(),
  token: defaultState.auth,
  profile: defaultState.profile,
  fetchProfile: jest.fn(),
  createProfile: jest.fn(),
  updateProfile: jest.fn(),
};

export { defaultProps, defaultState };
