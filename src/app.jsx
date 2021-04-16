import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import rootReducer from './reducer.js';

import App from './components/App.jsx';

const store = configureStore({
  reducer: rootReducer,
});

export default () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector('#chat'),
  );
};
