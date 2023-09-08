import { configureStore } from "@reduxjs/toolkit";
import sendKeywordReducer from "./reducers/sendKeyword";
import sendLocationReducer from "./reducers/sendLocation";

export default configureStore({
  reducer: {
    send: sendKeywordReducer,
    location: sendLocationReducer,
  },
});
