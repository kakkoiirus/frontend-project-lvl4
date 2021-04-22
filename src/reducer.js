import { combineReducers } from '@reduxjs/toolkit';

import messagesReducer from './slices/messages.js';
import channelsReducer from './slices/channels.js';
import modalReducer from './slices/modal.js';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
  modalData: modalReducer,
});
