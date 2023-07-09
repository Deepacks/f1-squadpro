import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { raiseBadRequest } from 'src/helpers/raiseBadRequest'
import {
  Championship,
  ChampionshipDocument,
} from 'src/schemas/championship.schema'
import { TeamService } from '../team/team.service'
import { UserService } from '../user/user.service'
import { User } from 'src/schemas/user.schema'
import {
  ChampionshipBasicInfoDto,
  ChampionshipCreateDto,
  ChampionshipJoinDto,
} from './dto'

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

  async findByCode(code: string): Promise<ChampionshipBasicInfoDto | null> {
    const championship = await this.championshipModel.findOne(
      { code },
      { _id: true, name: true, partecipants: true },
    )
    if (!championship) return null

    const { _id, name, partecipants } = championship

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
    const user = await this.userService.findById(userId)

    if (user.championship) {
      raiseBadRequest('User already subscribed to a championship')
    }

    const newTeams = await this.teamService.createMany(teams)
    const teamsIds = newTeams.map((team) => team._id as string)

    const positionedTeams = this._buildPointsList(teamsIds, 'team')
    const positionedDrivers = this._buildPointsList(drivers, 'driver')

    const championship = await this.championshipModel.create({
      name,
      code: 'PIPPOCOCA',
      partecipants: 1,
      teams: positionedTeams,
      drivers: positionedDrivers,
    })

    await this.userService.saveChampionship(userId, championship._id)

    return championship
  }

  async join(
    userId: string,
    championshipJoinDto: ChampionshipJoinDto,
  ): Promise<void> {
    const user = await this.userService.findById(userId)
    if (user.championship) {
      raiseBadRequest('User already subscribed to a championship')
    }

    const { championshipId, teamId, driverId } = championshipJoinDto
    if (!championshipId) raiseBadRequest('Bad championship Id')
    if (!teamId) raiseBadRequest('Bad team Id')

    const championship = await this.championshipModel.findById(championshipId)
    if (!championship) {
      raiseBadRequest('Championship not found')
    }

    const driverToUpdateIndex = championship.drivers.findIndex(
      ({ driver }) => driver.toString() === driverId,
    )
    if (driverToUpdateIndex === -1) {
      raiseBadRequest('Driver not found')
    }

    const newDriversList = [...championship.drivers]
    newDriversList[driverToUpdateIndex].driver = userId as unknown as User

    await this.teamService.replaceDriver({ userId, teamId, driverId })
    await championship.updateOne({
      $inc: { partecipants: 1 },
      $set: { drivers: newDriversList },
    })
    await this.userService.saveChampionship(userId, championshipId)

    return
  }

  private _buildPointsList(
    arr: string[],
    key: string,
  ): Array<{ points: number } & Record<string, string>> {
    return arr.map(
      (item) =>
        ({ points: 0, [key]: item }) as { points: 0 } & Record<string, string>,
    )
  }
}
