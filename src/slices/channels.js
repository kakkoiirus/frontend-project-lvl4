import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes';

export const addNewChannel = createAsyncThunk(
  'channelsData/addNewChannel',
  async (data) => {
    const path = routes.channelsPath();
    try {
      const res = await axios.post(path, { data });
      if (res.status === 201) {
        return res.data;
      }
      throw Error(res.status);
    } catch (err) {
      throw Error(err);
    }
  },
);

export const channelsSlice = createSlice({
  name: 'channelsData',
  initialState: {
    channels: [],
    currentChannelId: null,
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    setCurrentChannel: (state, action) => {
      const { id } = action.payload;
      state.currentChannelId = id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;

      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }

      state.channels = state.channels.filter((c) => c.id !== id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload.attributes;
      const index = state.channels.findIndex((c) => c.id === id);
      state.channels[index].name = name;
    },
  },
  extraReducers: {
    [addNewChannel.fulfilled]: (state, { payload }) => {
      const { id } = payload.data.attributes;
      state.currentChannelId = id;
    },
  },
});

export const {
  addChannel,
  setCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
