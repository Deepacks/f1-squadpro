import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import createAsyncGetThunk from '../helpers/createAsyncGetThunk'

export interface UserState {
  email: string
  firstName: string
  lastName: string
  hasChampionship: boolean | undefined
}

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  hasChampionship: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (_, action: PayloadAction<UserState>) => action.payload,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSession.fulfilled, (_, { payload }) => payload!)
      .addCase(fetchSession.rejected, (state, { meta }) => {
        if (meta.arg?.onReject) meta.arg.onReject()
        return state
      })
  },
})

export const fetchSession = createAsyncGetThunk<UserState>('/user/me')
export const { updateUser } = userSlice.actions

export const getUser = (state: RootState) => state.user

export default userSlice.reducer
