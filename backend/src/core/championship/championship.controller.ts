import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { ChampionshipService } from './championship.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ChampionshipCreateDto } from './dto/championshipCreate-dto.type'
import { ChampionshipDocument } from 'src/schemas/championship.schema'

@Controller('championship')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() championshipCreateDto: ChampionshipCreateDto,
  ): Promise<ChampionshipDocument> {
    return this.championshipService.create(championshipCreateDto)
  }
}
