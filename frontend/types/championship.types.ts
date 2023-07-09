import { Driver } from './drivers.types'
import { Team } from './teams.types'

export interface Championship {
  _id: string
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

export interface ChampionshipJoinDto {
  championshipId: string
  teamId: string
  driverId: string
}
