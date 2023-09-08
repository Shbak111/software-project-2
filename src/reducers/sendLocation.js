import { createSlice } from "@reduxjs/toolkit";

export const sendLocation = createSlice({
  name: "location",
  initialState: {
    value: "",
  },
  reducers: {
    sendlocation: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sendlocation } = sendLocation.actions;

export default sendLocation.reducer;
