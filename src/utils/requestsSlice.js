import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: null,
  reducers: {
    addToRequests: (state, action) => {
      return action.payload;
    },
    removeRequests: (state, action) => {
      const newArr = state.filter((r) => r._id !== action.payload._id);
      return newArr;
    },
  },
});

export const { addToRequests, removeRequests } = requestsSlice.actions;

export default requestsSlice.reducer;
