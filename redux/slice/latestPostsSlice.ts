import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Post {
  id: number;
  title: string;
  body: string;
  status: string;
  createdAt: string;
  updatedAt: string
}

interface LatestPostsSlice {
  value: Post[];}

const initialState: LatestPostsSlice = {
  value: [],
};

export const postsSlice = createSlice({
  name: "latestPosts",
  initialState,
  reducers: {
    appendPosts: (state, action: PayloadAction<Post[]>) => {
        state.value = [...state.value, ...action.payload];
    },
    resetPosts: (state) => {
      state.value = [];
    }
},
});

export const { appendPosts, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;
