import { configureStore } from '@reduxjs/toolkit';
import locationDetailReducer from './reducers/locationDetailReducer';
import phongThueReducer from './reducers/phongThueReducer';
// ...

export const store = configureStore({
  reducer: {
    phongThueReducer: phongThueReducer,
    locationDetailReducer: locationDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
