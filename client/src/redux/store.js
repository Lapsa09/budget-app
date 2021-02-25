import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/ModalSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
