import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'

import { ChampionshipService } from './championship.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChampionshipWithBasicInfoDto } from './dto/championshipWithBasicInfo-dto.type'
import { ChampionshipCreateDto } from './dto/championshipCreate-dto.type'
import { ChampionshipDocument } from 'src/schemas/championship.schema'
import { User } from 'src/decorators/user.decorator'

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Get('active')
  @UseGuards(JwtAuthGuard)
  async findActive(
    @User() userId: string,
  ): Promise<ChampionshipDocument | null> {
    return this.championshipService.findByUserId(userId)
  }

  @Get('code/:code')
  @UseGuards(JwtAuthGuard)
  async findByCode(
    @Param('code') code: string,
  ): Promise<ChampionshipWithBasicInfoDto | null> {
    return this.championshipService.findByCode(code)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @User() userId: string,
    @Body() championshipCreateDto: ChampionshipCreateDto,
  ): Promise<ChampionshipDocument> {
    return this.championshipService.create({ userId, ...championshipCreateDto })
  }
}
