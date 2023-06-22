import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { getEnvVar } from './helpers/getEnvVar.helper'
import { AuthModule } from './auth/auth.module'
import { ChampionshipModule } from './core/championship/championship.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      `mongodb://${getEnvVar('F1_MONGO_HOST')}:27017/${getEnvVar(
        'F1_MONGO_DB',
      )}`,
      {
        authSource: getEnvVar('F1_MONGO_DB'),
        user: getEnvVar('F1_MONGO_USER'),
        pass: getEnvVar('F1_MONGO_PASS'),
      },
    ),
    // --- auth ---
    AuthModule,

    // --- core ---
    ChampionshipModule,
  ],
})
export class AppModule {}
