import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { Team } from './team.schema'
import { User } from './user.schema'

@Schema()
export class Championship {
  _id: ObjectId

  @Prop({ required: true })
  name: string

  @Prop({
    type: [
      {
        points: { type: Number },
        team: { type: SchemaTypes.ObjectId, ref: 'Team' },
      },
    ],
  })
  teams: { _id: ObjectId; points: number; team: Team }

  @Prop({
    type: [
      {
        points: { type: Number },
        driver: { type: SchemaTypes.ObjectId, ref: 'User' },
      },
    ],
  })
  drivers: { _id: ObjectId; points: number; driver: User }
}

export type ChampionshipDocument = Championship & Document

export const ChampionshipSchema = SchemaFactory.createForClass(Championship)
