import { Driver } from './drivers.types'
import { Team } from './teams.types'

export interface Championship {
  name: string
  teams: {
    points: number
    team: Team
  }[]
  drivers: {
    points: number
    driver: Driver
  }[]
}

export interface ChampionshipBasicInfo {
  name: string
  partecipants: number
}
