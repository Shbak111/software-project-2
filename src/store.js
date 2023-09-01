import { configureStore } from "@reduxjs/toolkit";
import sendKeywordReducer from "./reducers/sendKeyword";

export default configureStore({
  reducer: {
    send: sendKeywordReducer,
  },
});
