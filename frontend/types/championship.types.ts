import { Driver } from './drivers.types'
import { Team } from './teams.types'

export interface ChampionshipTeam {
  points: number
  team: Team
}

export interface ChampionshipDriver {
  _id: string
  points: number
  teamLocalId: string
  driver: Driver
}

export interface Championship {
  _id: string
  name: string
  teams: ChampionshipTeam[]
  drivers: ChampionshipDriver[]
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
