import { Controller, Get, UseGuards } from '@nestjs/common'

import { UserService } from './user.service'
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards'
import { User } from 'src/decorators/user.decorator'
import { UserSessionDto } from './dto/userSession-dto.type'
import { UserDocument } from 'src/schemas/user.schema'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(@User() user: string): Promise<UserSessionDto> {
    return this.userService.getUserData(user)
  }

  @Get('drivers')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getF1Drivers(): Promise<UserDocument[]> {
    return this.userService.getF1Drivers()
  }
}
