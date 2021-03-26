import { combineReducers } from '@reduxjs/toolkit';

import messagesReducer from './features/messages/messagesSlice';
import channelsReducer from './features/channels/channelsSlice';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
});
