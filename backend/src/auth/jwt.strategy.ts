import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'

import { AuthService } from './auth.service'
import { RequestUser } from './types/auth.types'
import { getEnvVar } from 'src/helpers/getEnvVar.helper'
import { TokenDto } from 'src/core/revokedToken/dto/token.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: getEnvVar('F1_JWT_SECRET'),
    })
  }

  static extractJwt(req: Request): string | null {
    if (req.signedCookies && 'Bearer' in req.signedCookies) {
      return req.signedCookies.Bearer
    }
    return null
  }

  async validate(tokenDto: TokenDto): Promise<RequestUser> {
    return this.authService.validateToken(tokenDto)
  }
}
