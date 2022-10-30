import { configureStore } from '@reduxjs/toolkit';
import commentReducer from './reducers/commentReducer';
import locationDetailReducer from './reducers/locationDetailReducer';
import guestDetailReducer from './reducers/guestDetailReducer';
import roomDetailReducer from './reducers/roomDetailReducer';
// import logger from 'redux-logger'
// ...

export const store = configureStore({
  reducer: {
    roomDetailReducer: roomDetailReducer,
    locationDetailReducer: locationDetailReducer,
    commentReducer: commentReducer,
    guestDetailReducer: guestDetailReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     immutableCheck: false,
  //     serializableCheck: false,
  //   }),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
