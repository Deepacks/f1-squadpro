import { Championship } from '@/types/championship.types'
import { createSlice } from '@reduxjs/toolkit'
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
  '/championship',
)

export default championshipSlice.reducer
