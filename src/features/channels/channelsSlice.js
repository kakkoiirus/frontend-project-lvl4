import { createSlice } from '@reduxjs/toolkit';

export const channelsSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, action) => {
      console.log(action);
    },
  },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
