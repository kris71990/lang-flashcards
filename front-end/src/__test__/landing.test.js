import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Landing } from '../components/landing/landing';

import { testThunk } from '../lib/redux-thunk';

configure({ adapter: new Adapter() });

describe('Landing Component', () => {
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
    createLanguage: () => null,
    setLanguage: () => null,
    setTransDir: () => null,
    languagesFetch: () => null,
    wordsFetch: () => null,
    location: { pathname: '/' },
    history: {},
    signup: () => null,
    login: () => null,
    // token: PropTypes.string,
    profile: defaultState.profile,
    fetchProfile: () => null,
    createProfile: () => null,
    updateProfile: () => null,
  };

  const create = () => {
    const store = {
      getState: jest.fn(() => ({})),
      dispatch: jest.fn(),
    };
    const next = jest.fn();
    const invoke = action => testThunk(store)(next)(action);
    return { store, next, invoke };
  };

  test('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  test('calls function', () => {
    const { invoke } = create();
    const fn = jest.fn();
    invoke(fn);
    expect(fn).toHaveBeenCalled();
  });

  test('passes dispatch and getState', () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('TEST DISPATCH');
      getState();
    });
    expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH');
    expect(store.getState).toHaveBeenCalled();
  });

  test('Landing with no application state', () => {
    const middleware = [testThunk];
    const mockStore = configureStore(middleware);
    const mountedLanding = mount(
      <Provider store={ mockStore(defaultState) }>
        <Landing { ...defaultProps }/>
      </Provider>,
    );

    expect(mountedLanding.exists('#intro')).toEqual(true);
    expect(mountedLanding.find('#intro').children()).toHaveLength(1);
    expect(mountedLanding.find('#intro').childAt(0).text()).toEqual('Choose a languageORAdd a new language');
    expect(mountedLanding.exists('#lang-choices')).toEqual(true);
    expect(mountedLanding.find('#lang-choices').childAt(0).text()).toEqual('Server not responding.');
    expect(mountedLanding.find('#add-menu').children()).toHaveLength(0);
  });
});
