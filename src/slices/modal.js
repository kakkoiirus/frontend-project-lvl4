import { createSlice } from '@reduxjs/toolkit';
import { addNewChannel } from './channels';

export const modalSlice = createSlice({
  name: 'modalData',
  initialState: {
    isOpened: false,
    type: null,
    extra: null,
  },
  reducers: {
    openModal: (state, action) => {
      const { type, extra = null } = action.payload;
      return {
        ...state,
        isOpened: true,
        type,
        extra,
      };
    },
    closeModal: (state) => (
      {
        ...state,
        isOpened: false,
        type: null,
        extra: null,
      }
    ),
  },
  extraReducers: {
    [addNewChannel.fulfilled]: (state) => {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
