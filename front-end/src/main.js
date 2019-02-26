import React from 'react';
import { render as reactDomRender } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';
import './style/main.scss';

// const store = createStore();

const container = document.createElement('div');
document.body.appendChild(container);
reactDomRender(<App/>, container);
