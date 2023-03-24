import { configureStore } from "@reduxjs/toolkit";
import { jokesReducer } from "./slices/jokes";
const store = configureStore({
  reducer: {
    jokes: jokesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
