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
      state.currentChannelId = action.payload.id;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;

      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }

      state.channels = state.channels.filter((c) => c.id !== id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const index = state.channels.findIndex((c) => c.id === id);
      state.channels[index].name = name;
    },
  },
});

export const {
  addChannel,
  setInitialState,
  setCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
