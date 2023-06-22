import { configureStore } from '@reduxjs/toolkit'

import championshipSlice from './slices/championshipSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    championship: championshipSlice,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
