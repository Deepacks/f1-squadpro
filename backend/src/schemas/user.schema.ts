import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { Championship } from './championship.schema'
import { Role } from 'src/auth/types/auth.types'

@Schema()
export class User {
  _id: ObjectId

  @Prop({ type: String, required: true })
  email: string

  @Prop({ type: String, required: true })
  hash: string

  @Prop({ type: String, required: true })
  firstName: string

  @Prop({ type: String, required: true })
  lastName: string

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Championship', default: null })
  championship: Championship | null

  @Prop({ type: String, enum: Role, default: 'user' })
  role: Role

  @Prop({ type: Boolean, default: false })
  isF1Driver: boolean

  @Prop({ type: String, default: null })
  defaultTeam: string | null

  @Prop({ type: Boolean, default: null })
  isMainDriver: boolean | null
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
