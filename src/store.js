import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sendKeywordReducer from "./reducers/sendKeyword";
import sendLocationReducer from "./reducers/sendLocation";
import searchWordReducer from "./reducers/searchWord";
import btnTmpReducer from "./reducers/buttonState";

// Redux Persist 구성
const persistConfig = {
  key: "root", // 저장 키를 지정합니다.
  storage, // 로컬 스토리지를 사용하여 저장합니다.
};

const persistedSendKeywordReducer = persistReducer(
  persistConfig,
  sendKeywordReducer
);
const persistedSendLocationReducer = persistReducer(
  persistConfig,
  sendLocationReducer
);
const persistedsearchWordReducer = persistReducer(
  persistConfig,
  searchWordReducer
);
const persistedbtnTmpReducer = persistReducer(persistConfig, btnTmpReducer);

const rootReducer = {
  send: persistedSendKeywordReducer,
  location: persistedSendLocationReducer,
  search: persistedsearchWordReducer,
  btn: persistedbtnTmpReducer,
};

// Redux Store 생성
const store = configureStore({
  reducer: rootReducer,
});

// Redux Persist를 사용하여 스토어를 초기화합니다.
const persistor = persistStore(store);

export { store, persistor };
