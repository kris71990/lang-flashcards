import { combineReducers } from 'redux';

import auth from './auth';
import profile from './profile';
import language from './language';
import words from './words';

export default combineReducers({ 
  auth,
  profile,
  language, 
  words,
});
