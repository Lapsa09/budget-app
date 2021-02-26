import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    funds: 0,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setFunds: (state) => {
      let inc = 0;
      let dec = 0;

      state.posts.forEach(({ income, money }) => {
        income ? (inc += money) : (dec += money);
      });
      state.funds = inc - dec;
    },
  },
});

export const { setPosts, setFunds } = postsSlice.actions;

export const getPosts = (state) => state.posts.posts;

export const getFunds = (state) => state.posts.funds;

export default postsSlice.reducer;
