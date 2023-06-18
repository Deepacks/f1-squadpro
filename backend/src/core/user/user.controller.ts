import { Controller, Get, UseGuards } from '@nestjs/common'

import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from 'src/decorators/user.decorator'
import { UserSessionDto } from './dto/userSession-dto.type'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: string): Promise<UserSessionDto> {
    return this.userService.getUserData(user)
  }
}
