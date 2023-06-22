import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'

import { ChampionshipService } from './championship.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChampionshipCreateDto } from './dto/championshipCreate-dto.type'
import { ChampionshipDocument } from 'src/schemas/championship.schema'
import { User } from 'src/decorators/user.decorator'

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async find(@User() userId: string) {
    return this.championshipService.find(userId)
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
