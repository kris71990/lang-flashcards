import { combineReducers } from 'redux';

import language from './language';
import words from './words';

export default combineReducers({ 
  language, 
  words,
});
