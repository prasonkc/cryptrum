import { configureStore } from '@reduxjs/toolkit'
import counter from "./slice/counterSlice"
import error from "./slice/ErrorSlice"
import posts from "./slice/latestPostsSlice"
import lexicalToHtml from "./slice/LexicalToHTML"

export const store = configureStore({
  reducer: {
    counter,
    error,
    posts,
    lexicalToHtml
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch