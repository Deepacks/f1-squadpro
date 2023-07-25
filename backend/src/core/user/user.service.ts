import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId } from 'mongoose'

import { User, UserDocument } from 'src/schemas/user.schema'
import { UserSessionDto } from './dto/userSession-dto.type'
import { raiseBadRequest } from 'src/helpers/raiseBadRequest'

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
      email: true,
      firstName: true,
      lastName: true,
      championship: true,
      role: true,
    })

    const { email, firstName, lastName, championship, role } = userData

    return {
      email,
      firstName,
      lastName,
      hasChampionship: !!championship,
      role,
    }
  }

  async getF1Drivers(): Promise<UserDocument[]> {
    return this.userModel.find(
      { isF1Driver: true },
      {
        _id: true,
        firstName: true,
        lastName: true,
        defaultTeam: true,
        isMainDriver: true,
      },
    )
  }

  async saveChampionship(
    userId: string,
    championshipId: string | ObjectId,
  ): Promise<void> {
    if (!championshipId) raiseBadRequest('Bad championship Id')

    return this.userModel.findByIdAndUpdate(userId, {
      $set: { championship: championshipId },
    })
  }
}
