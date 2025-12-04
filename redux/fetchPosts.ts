import axios from "axios";
import { appendPosts } from "./slice/latestPostsSlice";
import { AppDispatch, RootState } from './store';

export const fetchPosts = async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const currentCount = state.posts.posts.length;

    const res = await axios.get("/api/get",{
    params: {
        skip: currentCount,
        take: 6,
      },
    })
    dispatch(appendPosts(res.data));
}