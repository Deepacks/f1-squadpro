import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getEnvVar } from './helpers/getEnvVar.helper'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  console.log(
    `mongodb://${getEnvVar('F1_MONGO_HOST')}:27017/${getEnvVar('F1_MONGO_DB')}`,
  )
  console.log(
    getEnvVar('F1_MONGO_DB'),
    getEnvVar('F1_MONGO_USER'),
    getEnvVar('F1_MONGO_PASS'),
  )

  app.setGlobalPrefix('/f1-squadpro/api')
  app.enableCors({
    credentials: true,
    origin: getEnvVar('F1_JAVASCRIPT_ORIGIN_URL'),
  })
  app.use(cookieParser(getEnvVar('F1_COOKIE_SECRET')))

  await app.listen(8081)
}
bootstrap()
