import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channels';

export const messagesSlice = createSlice({
  name: 'messagesData',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: {
    [removeChannel]: (state, action) => {
      const { id } = action.payload;
      state.messages = state.messages.filter((m) => m.channelId !== id);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
