import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.channels.push(...channels);
      state.currentChannelId = currentChannelId;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
  },
});

export const { addChannel, setInitialState, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
