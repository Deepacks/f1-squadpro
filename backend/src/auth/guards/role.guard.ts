import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Role } from '../types/auth.types'

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const role = request.user.role as Role

    return role === Role.MANAGER
  }
}
