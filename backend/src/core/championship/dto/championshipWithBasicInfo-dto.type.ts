import { ObjectId } from 'mongoose'

export interface ChampionshipWithBasicInfoDto {
  _id: ObjectId
  name: string
  partecipants: number
}
