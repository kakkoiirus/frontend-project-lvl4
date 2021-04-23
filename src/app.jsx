import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';

import resources from './locales/index.js';

import rootReducer from './reducer.js';
import ServerContext from './contexts/serverContext.js';

import { addChannel, removeChannel, renameChannel } from './slices/channels.js';
import { addMessage } from './slices/messages.js';

import App from './components/App.jsx';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',

    interpolation: {
      escapeValue: false,
    },
  });

const store = configureStore({
  reducer: rootReducer,
});

const socket = io();

socket.on('newChannel', (channel) => {
  store.dispatch(addChannel(channel));
});

socket.on('removeChannel', ({ id }) => {
  store.dispatch(removeChannel({ id }));
});

socket.on('renameChannel', (channel) => {
  store.dispatch(renameChannel(channel));
});

socket.on('newMessage', (message) => {
  store.dispatch(addMessage(message));
});

const serverContextValue = {
  createChannel: (name, acknowledge) => {
    socket.emit('newChannel', { name }, acknowledge);
  },
  removeChannel: (id, acknowledge) => {
    socket.emit('removeChannel', { id }, acknowledge);
  },
  renameChannel: ({ id, name }, acknowledge) => {
    socket.emit('renameChannel', { id, name }, acknowledge);
  },
  sendMessage: (message, acknowledge) => {
    socket.emit('newMessage', message, acknowledge);
  },
};

export default () => {
  ReactDOM.render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ServerContext.Provider value={serverContextValue}>
          <App />
        </ServerContext.Provider>
      </Provider>
    </I18nextProvider>,
    document.querySelector('#chat'),
  );
};
