import { HttpException, HttpStatus } from '@nestjs/common'

export const raiseBadRequest = (message: string) => {
  throw new HttpException(message, HttpStatus.BAD_REQUEST)
}
