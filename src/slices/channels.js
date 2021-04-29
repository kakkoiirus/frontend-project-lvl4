import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    setInitialState: (state, action) => (
      action.payload
    ),
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      Object.assign(state, { currentChannelId: action.payload.id });
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;

      if (state.currentChannelId === id) {
        Object.assign(state, { currentChannelId: 1 });
      }

      const newChannels = state.channels.filter((c) => c.id !== id);
      Object.assign(state, { channels: newChannels });
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((c) => c.id === id);
      channel.name = name;
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
