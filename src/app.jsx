import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import faker from 'faker';
import Cookies from 'js-cookie';
import io from 'socket.io-client';

import rootReducer from './reducer';
import UserContext from './user-context';
import { addMessage } from './slices/messages';
import { addChannel, removeChannel, renameChannel } from './slices/channels';

import App from './components/App';

const getUsername = () => {
  const username = Cookies.get('username');

  if (!username) {
    const newUsername = faker.internet.userName();
    Cookies.set('username', newUsername);
    return newUsername;
  }

  return username;
};

export default (gon) => {
  const preloadedState = {
    channelsData: {
      channels: gon.channels,
      currentChannelId: gon.currentChannelId,
    },
    messagesData: {
      messages: gon.messages,
    },
  };

  const username = getUsername();

  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  const socket = io();

  socket.on('newMessage', ({ data: { attributes } }) => {
    store.dispatch(addMessage(attributes));
  });

  socket.on('newChannel', ({ data: { attributes } }) => {
    store.dispatch(addChannel(attributes));
  });

  socket.on('removeChannel', ({ data: { id } }) => {
    store.dispatch(removeChannel({ id }));
  });

  socket.on('renameChannel', ({ data: { attributes } }) => {
    store.dispatch(renameChannel({ attributes }));
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.querySelector('#chat'),
  );
};
