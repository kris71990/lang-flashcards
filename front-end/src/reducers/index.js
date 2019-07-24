import { combineReducers } from 'redux';

import auth from './auth';
import language from './language';
import words from './words';

export default combineReducers({ 
  auth,
  language, 
  words,
});
