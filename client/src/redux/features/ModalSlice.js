import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    opened: false,
    incomes: null,
  },
  reducers: {
    openModal: (state) => {
      state.opened = true;
    },
    closeModal: (state) => {
      state.opened = false;
      state.incomes = null;
    },
    selectIncome: (state, action) => {
      state.incomes = action.payload;
    },
  },
});

export const { openModal, selectIncome, closeModal } = modalSlice.actions;

export const getModalState = (state) => state.modal.opened;
export const getForEdit = (state) => state.modal.incomes;

export default modalSlice.reducer;
