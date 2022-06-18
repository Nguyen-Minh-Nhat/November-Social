import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./slices/langSlice";

const rootReducer = {
  lang: langSlice,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
