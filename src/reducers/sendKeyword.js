import { createSlice } from "@reduxjs/toolkit";

export const sendKeyword = createSlice({
  name: "send",
  initialState: {
    value: "",
  },
  reducers: {
    sendword: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sendword } = sendKeyword.actions;

export default sendKeyword.reducer;
