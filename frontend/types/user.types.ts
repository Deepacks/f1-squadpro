import { UserState } from '@/redux/slices/userSlice'
import { Championship } from './championship.types'

export interface UserWithChampionshipResponse extends UserState {
  championship: Championship
}
