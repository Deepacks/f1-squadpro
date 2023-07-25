import { Role } from 'src/auth/types/auth.types'

export interface UserSessionDto {
  email: string
  firstName: string
  lastName: string
  hasChampionship: boolean
  role: Role
}
