import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalReducer";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    userReducer: userReducer,
    modalReducer: modalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {pots: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
