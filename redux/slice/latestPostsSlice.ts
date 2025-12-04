import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface Post {
  id: string;
  title: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string
}

interface LatestPostsSlice {
  posts: Post[];}

const initialState: LatestPostsSlice = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "latestPosts",
  initialState,
  reducers: {
    appendPosts: (state, action: PayloadAction<Post[]>) => {
        state.posts = [...state.posts, ...action.payload];
    },
    resetPosts: (state) => {
      state.posts = [];
    }
},
});

export const { appendPosts, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
