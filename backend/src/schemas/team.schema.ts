import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { User } from './user.schema'

@Schema()
export class Team {
  _id: ObjectId

  @Prop({ required: true })
  teamId: string

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  firstDriver: User

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  secondDriver: User
}

export type TeamDocument = Team & Document

export const TeamSchema = SchemaFactory.createForClass(Team)
