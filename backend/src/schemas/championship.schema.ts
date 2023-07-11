import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { Team } from './team.schema'
import { User } from './user.schema'

@Schema()
export class Championship {
  _id: ObjectId

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  code: string

  @Prop({ required: true })
  partecipants: number

  @Prop({
    type: [
      {
        points: { type: Number, required: true },
        team: { type: SchemaTypes.ObjectId, ref: 'Team', required: true },
      },
    ],
  })
  teams: { _id: ObjectId; points: number; team: Team; required: true }[]

  @Prop({
    type: [
      {
        points: { type: Number, required: true },
        teamLocalId: { type: String, required: true },
        driver: { type: SchemaTypes.ObjectId, ref: 'User', required: true },
      },
    ],
  })
  drivers: {
    _id: ObjectId
    teamLocalId: string
    points: number
    driver: User
  }[]
}

export type ChampionshipDocument = Championship & Document

export const ChampionshipSchema = SchemaFactory.createForClass(Championship)
