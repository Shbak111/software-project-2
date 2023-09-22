import { createSlice } from "@reduxjs/toolkit";

export const dataPersist = createSlice({
  name: "storedata",
  initialState: {
    value: null,
  },
  reducers: {
    datapersist: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { datapersist } = dataPersist.actions;

export default dataPersist.reducer;
