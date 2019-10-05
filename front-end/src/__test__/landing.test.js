import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Landing } from '../components/landing/landing';

import thunk from '../lib/redux-thunk';
import { defaultState, defaultProps } from './lib/mock-state';

configure({ adapter: new Adapter() });

describe('Landing Component', () => {
  test('Landing with no application state', () => {
    const middleware = [thunk];
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
