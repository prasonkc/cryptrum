import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ErrorSlice {
  value: string;
}

const initialState: ErrorSlice = {
  value: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearError: (state) => {
      state.value = "";
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default errorSlice.reducer;
