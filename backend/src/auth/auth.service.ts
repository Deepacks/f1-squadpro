import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { genSalt, hash as genHash, compare } from 'bcryptjs'

import { UserService } from 'src/core/user/user.service'
import { RequestUser } from './types/auth.types'
import { AuthDto, AuthRegisterDto } from './dto/auth-dto.type'
import { RevokedTokenService } from 'src/core/revokedToken/revokedToken.service'
import { TokenDto } from 'src/core/revokedToken/dto/token.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly revokedTokenService: RevokedTokenService,
  ) {}

  createJwt(userId: string): string {
    return this.jwtService.sign({ userId })
  }

  async validateToken(tokenDto: TokenDto): Promise<RequestUser> {
    const { userId } = tokenDto

    const user = await this.userService.findById(userId)
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    const revokedToken = await this.revokedTokenService.find(tokenDto)
    if (revokedToken) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }

    return { userId }
  }

  async register(authDto: AuthRegisterDto): Promise<string> {
    const { password, ...userData } = authDto

    const existingUser = await this.userService.findByEmail(userData.email)
    if (existingUser) {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN)
    }

    const salt = await genSalt(10)
    const hash = await genHash(password, salt)
    const user = await this.userService.create({
      ...userData,
      hash,
    })

    return this.createJwt(user._id.toString())
  }

  async loginUser(authDto: AuthDto): Promise<string> {
    const { email, password } = authDto

    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const areCredentialsValid = compare(password, user.hash)
    if (!areCredentialsValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    return this.createJwt(user._id.toString())
  }

  async revokeToken(token: string) {
    const jwt = this.jwtService.decode(token) as TokenDto
    await this.revokedTokenService.revoke(jwt)
  }
}
