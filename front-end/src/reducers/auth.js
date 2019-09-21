import { fetchCookie } from '../utils/cookie';

const token = fetchCookie('lang-cards');
const defaultState = token || null;

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE': 
      return null;
    default:
      return state;
  }
};
