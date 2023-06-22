import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
  Championship,
  ChampionshipSchema,
} from 'src/schemas/championship.schema'
import { TeamModule } from '../team/team.module'
import { UserModule } from '../user/user.module'
import { ChampionshipController } from './championship.controller'
import { ChampionshipService } from './championship.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Championship.name, schema: ChampionshipSchema },
    ]),
    TeamModule,
    UserModule,
  ],
  controllers: [ChampionshipController],
  providers: [ChampionshipService],
})
export class ChampionshipModule {}
