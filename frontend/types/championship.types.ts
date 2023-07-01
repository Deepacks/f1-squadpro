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

export interface ChampionshipWithBasicInfo {
  _id: string
  name: string
  partecipants: number
}
