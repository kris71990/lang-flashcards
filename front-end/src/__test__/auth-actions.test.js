// import superagent from 'superagent';
// import configureMockStore from 'redux-mock-store';
// import fetchMock from 'fetch-mock';

// import thunk from '../lib/redux-thunk';
import * as authActions from '../actions/auth';

describe('Auth Actions', () => {
  test('setToken should return object with token', () => {
    const token = 'fjndnfjslnfsjnfdjslnfd';
    const expectedReturn = {
      type: 'TOKEN_SET',
      payload: token,
    };

    expect(authActions.setToken(token)).toEqual(expectedReturn);
  });

  test('removeToken should return object without token', () => {
    const type = 'TOKEN_REMOVE';
    const removed = authActions.removeToken();
    expect(removed.type).toEqual(type);
    expect(removed.payload).toBeUndefined();
  });

  test('signupRequest should return setToken object', () => {
  });
});
