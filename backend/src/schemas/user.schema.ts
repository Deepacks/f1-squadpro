import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId, SchemaTypes } from 'mongoose'

import { Championship } from './championship.schema'

@Schema()
export class User {
  _id: ObjectId

  @Prop({ required: true })
  email: string

  @Prop({ required: true })
  hash: string

  @Prop({ required: true })
  firstName: string

  @Prop({ required: true })
  lastName: string

  @Prop({ default: false })
  isF1Driver: boolean

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Championship', default: null })
  championship: Championship | null
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
