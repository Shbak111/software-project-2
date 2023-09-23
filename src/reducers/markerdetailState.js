import { createSlice } from "@reduxjs/toolkit";

export const markerdetailState = createSlice({
  name: "mdetail",
  initialState: {
    value: false,
  },
  reducers: {
    mdetailtmp: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { mdetailtmp } = markerdetailState.actions;

export default markerdetailState.reducer;
