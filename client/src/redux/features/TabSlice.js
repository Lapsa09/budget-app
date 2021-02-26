import { createSlice } from "@reduxjs/toolkit";

export const tabSlice = createSlice({
  name: "tab",
  initialState: {
    tab: 0,
  },
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = tabSlice.actions;

export const getTab = (state) => state.tab.tab;

export default tabSlice.reducer;
