import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './reducers/commentReducer';
import locationDetailReducer from './reducers/locationDetailReducer';
import phongThueReducer from './reducers/phongThueReducer';
import guestDetailReducer from './reducers/guestDetailReducer';
// ...

export const store = configureStore({
  reducer: {
    phongThueReducer: phongThueReducer,
    locationDetailReducer: locationDetailReducer,
    commentReducer: commentReducer,
    guestDetailReducer: guestDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
