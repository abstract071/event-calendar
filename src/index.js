import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router } from 'react-router-dom';
import thunk from 'redux-thunk';

import './styles/scss/styles.scss';

import history from './app/history';
import reducers from './app/reducers';
import App from './app/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducers, enhancer);

ReactDOM.render(
  <Router history={history}>
      <Provider store={store}>
          <App/>
      </Provider>
  </Router>
    , document.querySelector('.container'));
