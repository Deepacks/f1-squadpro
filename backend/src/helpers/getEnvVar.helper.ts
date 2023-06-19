import { secrets } from 'docker-secret'
import { isDev } from './isDev.helper'

export const getEnvVar: (n: string) => string = (n) =>
  isDev() ? process.env[n] : secrets[n]
