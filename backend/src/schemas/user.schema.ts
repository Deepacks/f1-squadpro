import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, ObjectId } from 'mongoose'

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
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
