import { configureStore } from '@reduxjs/toolkit'
import counter from "./slice/counterSlice"
import error from "./slice/ErrorSlice"
import posts from "./slice/latestPostsSlice"

export const store = configureStore({
  reducer: {
    counter,
    error,
    posts
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch