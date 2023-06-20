import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Team, TeamDocument } from 'src/schemas/team.schema'
import { TeamCreateDto } from './dto/teamCreate-dto.type'

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async createMany(teamCreateDtos: TeamCreateDto[]): Promise<TeamDocument[]> {
    return this.teamModel.create(teamCreateDtos)
  }
}
