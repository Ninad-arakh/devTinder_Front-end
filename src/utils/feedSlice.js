import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addToFeed: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToFeed } = feedSlice.actions;

export default feedSlice.reducer;
