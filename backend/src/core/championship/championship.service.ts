import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import {
  Championship,
  ChampionshipDocument,
} from 'src/schemas/championship.schema'
import { TeamService } from '../team/team.service'
import { UserService } from '../user/user.service'
import { ChampionshipCreateDto } from './dto/championshipCreate-dto.type'

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}

  async find(userId: string): Promise<ChampionshipDocument | null> {
    const { championship } = await this.userService.findById(userId)
    if (!championship) return null

    return this.championshipModel.findById(
      championship,
      {},
      { populate: ['teams.team', 'drivers.driver'] },
    )
  }

  async create({
    userId,
    name,
    teams,
    drivers,
  }: {
    userId: string
  } & ChampionshipCreateDto): Promise<ChampionshipDocument> {
    const newTeams = await this.teamService.createMany(teams)
    const teamsIds = newTeams.map((team) => team._id as string)

    const positionedTeams = this._buildPointsList(teamsIds, 'team')
    const positionedDrivers = this._buildPointsList(drivers, 'driver')

    const championship = await this.championshipModel.create({
      name,
      teams: positionedTeams,
      drivers: positionedDrivers,
    })

    await this.userService.saveChampionship(userId, championship._id)

    return championship
  }

  private _buildPointsList(
    arr: string[],
    key: string,
  ): Array<{ points: number } & Record<string, string>> {
    return arr.map(
      (item) =>
        ({ points: 0, [key]: item } as { points: 0 } & Record<string, string>),
    )
  }
}
