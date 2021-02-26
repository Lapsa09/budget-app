import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./features/ModalSlice";
import postsReducer from "./features/PostsSlice";
import tabReducer from "./features/TabSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
    posts: postsReducer,
    tab: tabReducer,
  },
});
