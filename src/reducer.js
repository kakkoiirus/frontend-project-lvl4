import { combineReducers } from '@reduxjs/toolkit';

import messagesReducer from './slices/messages.js';
import channelsReducer from './slices/channels.js';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
});
