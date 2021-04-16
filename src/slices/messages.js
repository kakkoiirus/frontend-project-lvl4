import { createSlice } from '@reduxjs/toolkit';

import { setInitialState } from './channels.js';

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
    [setInitialState]: (state, action) => {
      const { messages } = action.payload;
      state.messages.push(...messages);
    },
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
