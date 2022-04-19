import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import App from './App';

import { Provider } from 'react-redux';

import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootreducer';

import thunk from 'redux-thunk';

import UserContextProvider from './context/UserContext';
const store = createStore(rootReducer, applyMiddleware(thunk));

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(
  <Provider store={store}>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </Provider>
);
