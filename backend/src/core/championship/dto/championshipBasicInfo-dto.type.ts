import { ObjectId } from 'mongoose'

export interface ChampionshipBasicInfoDto {
  _id: ObjectId
  name: string
  partecipants: number
}
