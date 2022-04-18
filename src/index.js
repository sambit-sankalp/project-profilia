import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootreducer';

import thunk from 'redux-thunk';

// const userInfoFromStorge = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null;

// const initialState = {
//   userLogin: { userInfo: userInfoFromStorge },
// };

const store = createStore(rootReducer, applyMiddleware(thunk));

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
