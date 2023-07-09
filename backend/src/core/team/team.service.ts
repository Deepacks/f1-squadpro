import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Team, TeamDocument } from 'src/schemas/team.schema'
import { TeamCreateDto, TeamReplaceDto } from './dto'
import { raiseBadRequest } from 'src/helpers/raiseBadRequest'

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}

  async createMany(teamCreateDtos: TeamCreateDto[]): Promise<TeamDocument[]> {
    return this.teamModel.create(teamCreateDtos)
  }

  async replaceDriver(teamReplaceDto: TeamReplaceDto): Promise<void> {
    const { userId, teamId, driverId } = teamReplaceDto

    const team = await this.teamModel.findById(
      teamId,
      {},
      { populate: ['firstDriver', 'secondDriver'] },
    )
    if (!team) raiseBadRequest('Team not found')

    const driverRole =
      team.firstDriver._id.toString() === driverId
        ? 'firstDriver'
        : team.secondDriver._id.toString() === driverId
        ? 'secondDriver'
        : undefined
    if (!driverRole) {
      raiseBadRequest('Driver not found')
    }

    const driverToReplace = team[driverRole]
    if (!driverToReplace.isF1Driver) {
      raiseBadRequest('Player driver replace not allowed')
    }

    await team.updateOne({ [driverRole]: userId })
  }
}
