import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addToFeed: (state, action) => {
      return action.payload;
    },
    removeFromFeed: (state, action) => {
      const newArr = state.filter((card) => card._id !== action.payload);
      return newArr;
    },
  },
});

export const { addToFeed, removeFromFeed } = feedSlice.actions;

export default feedSlice.reducer;
