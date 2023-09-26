import { createSlice } from "@reduxjs/toolkit";

export const markerData = createSlice({
  name: "markerstore",
  initialState: {
    value: null,
  },
  reducers: {
    markerdata: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { markerdata } = markerData.actions;

export default markerData.reducer;
