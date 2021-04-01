import { combineReducers } from '@reduxjs/toolkit';

import messagesReducer from './slices/messages';
import channelsReducer from './slices/channels';
import modal from './slices/modal';

export default combineReducers({
  channelsData: channelsReducer,
  messagesData: messagesReducer,
  modal,
});
