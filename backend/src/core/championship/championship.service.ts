import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import {
  Championship,
  ChampionshipDocument,
} from 'src/schemas/championship.schema'
import { TeamService } from '../team/team.service'
import { UserService } from '../user/user.service'
import { ChampionshipWithBasicInfoDto } from './dto/championshipWithBasicInfo-dto.type'
import { ChampionshipCreateDto } from './dto/championshipCreate-dto.type'

@Injectable()
export class ChampionshipService {
  constructor(
    @InjectModel(Championship.name)
    private readonly championshipModel: Model<Championship>,
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}

  async findByUserId(userId: string): Promise<ChampionshipDocument | null> {
    const { championship } = await this.userService.findById(userId)
    if (!championship) return null

    return this.championshipModel.findById(
      championship,
      { _id: false, code: false },
      { populate: ['teams.team', 'drivers.driver'] },
    )
  }

  async findById(championshipId: string): Promise<ChampionshipDocument | null> {
    return this.championshipModel.findById(
      championshipId,
      {},
      { populate: ['teams.team', 'drivers.driver'] },
    )
  }

  async findByCode(code: string): Promise<ChampionshipWithBasicInfoDto | null> {
    const championship = await this.championshipModel.findOne(
      { code },
      { _id: true, name: true, drivers: true },
      { populate: 'drivers.driver' },
    )
    if (!championship) return null

    const { _id, name, drivers } = championship

    const partecipants = drivers.reduce(
      (prevValue, { driver }) => prevValue + (driver?.isF1Driver ? 0 : 1),
      0,
    )

    return { _id, name, partecipants }
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
      code: 'PIPPOCOCA',
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
