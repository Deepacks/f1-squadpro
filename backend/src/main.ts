import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getEnvVar } from './helpers/getEnvVar.helper'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('/f1-squadpro/api')
  app.enableCors({
    credentials: true,
    origin: getEnvVar('JAVASCRIPT_ORIGIN_URL'),
  })
  app.use(cookieParser(getEnvVar('COOKIE_SECRET')))

  await app.listen(8081)
}
bootstrap()
