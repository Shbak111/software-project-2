import { createSlice } from "@reduxjs/toolkit";

export const searchWord = createSlice({
  name: "search",
  initialState: {
    value: "",
  },
  reducers: {
    searchword: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { searchword } = searchWord.actions;

export default searchWord.reducer;
