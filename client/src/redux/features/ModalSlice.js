import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    opened: false,
  },
  reducers: {
    toggleModal: (state) => {
      state.opened = !state.opened;
    },
  },
});

export const { toggleModal } = modalSlice.actions;

export const getModalState = (state) => state.modal.opened;

export default modalSlice.reducer;
