import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GuardedRequest } from 'src/auth/types/auth.types'

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest() as GuardedRequest
  return request.user.userId
})
