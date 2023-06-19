import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AuthModule } from './auth/auth.module'
import { getEnvVar } from './helpers/getEnvVar.helper'

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
  ],
})
export class AppModule {}
