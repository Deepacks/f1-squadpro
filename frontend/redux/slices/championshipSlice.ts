import { Championship } from '@/types/championship.types'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import createAsyncGetThunk from '../helpers/createAsyncGetThunk'

interface ChampionshipState {
  championship: Championship | null | undefined
}

const initialState: ChampionshipState = {
  championship: undefined,
}

const championshipSlice = createSlice({
  name: 'championship',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchChampionship.fulfilled, (_, { payload }) => ({
      championship: payload,
    }))
  },
})

export const fetchChampionship = createAsyncGetThunk<Championship | null>(
  '/championship/active',
)

export const getChamptionshipDrivers = (state: RootState) =>
  state.championship.championship?.drivers
export const getChamptionshipTeams = (state: RootState) =>
  state.championship.championship?.teams

export default championshipSlice.reducer
