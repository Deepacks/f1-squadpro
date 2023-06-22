import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { User } from 'src/schemas/user.schema'
import { UserSessionDto } from './dto/userSession-dto.type'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(user: {
    email: string
    hash: string
    defaultSender?: string
  }): Promise<User> {
    return this.userModel.create(user)
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id)
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email })
  }

  async getUserData(id: string): Promise<UserSessionDto> {
    const userData = await this.userModel.findById(id, {
      _id: false,
      hash: false,
      isF1Driver: false,
      __v: false,
    })

    const { email, firstName, lastName, championship } = userData

    return {
      email,
      firstName,
      lastName,
      hasChampionship: !!championship,
    }
  }

  async saveChampionship(
    userId: string,
    championshipId: ObjectId,
  ): Promise<void> {
    return this.userModel.findByIdAndUpdate(userId, {
      $set: { championship: championshipId },
    })
  }
}
