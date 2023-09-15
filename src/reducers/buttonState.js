import { createSlice } from "@reduxjs/toolkit";

export const btnTmp = createSlice({
  name: "btn",
  initialState: {
    value: true,
  },
  reducers: {
    btntmp: (state, action) => {
      state.value = action.payload;
    },
    btnfalse: (state, action) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { btntmp, btnfalse } = btnTmp.actions;

export default btnTmp.reducer;
