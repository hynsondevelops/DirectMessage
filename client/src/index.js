import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import './index.css';
import rootReducer from './reducers/index.js';
import { createLogger } from 'redux-logger'

import thunk from 'redux-thunk'
const loggerMiddleware = createLogger()



const store = createStore(rootReducer, applyMiddleware(loggerMiddleware, thunk))


ReactDOM.render(
  <Provider store={store}>
  <App />
  </Provider>,
  document.getElementById('root')
);
