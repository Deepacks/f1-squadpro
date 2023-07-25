import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { Team } from './team.schema'

@Schema()
export class Result {
  _id: ObjectId

  @Prop({ type: String, required: true })
  circuit: string

  @Prop({
    type: [
      {
        position: { type: Number, required: true },
        team: { type: SchemaTypes.ObjectId, ref: 'Team', required: true },
      },
    ],
  })
  leaderboard: {
    position: number
    team: Team
  }[]
}

export type ResultDocument = Result & Document

export const ResultSchema = SchemaFactory.createForClass(Result)
