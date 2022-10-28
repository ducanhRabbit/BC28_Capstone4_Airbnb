import { configureStore } from '@reduxjs/toolkit'
import locationReducer from './reducers/locationReducer'
import roomReducer from './reducers/roomReducer'
// ...

export const store = configureStore({
  reducer: {
    locationReducer: locationReducer,
    roomReducer: roomReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
