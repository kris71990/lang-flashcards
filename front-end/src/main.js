import React from 'react';
import { render as reactDomRender } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import App from './components/app';

const container = document.createElement('div');
document.body.appendChild(container);
reactDomRender(<h1>Test</h1>, container);
