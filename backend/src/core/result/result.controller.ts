import { Controller, Post, UseGuards } from '@nestjs/common'

import { ResultService } from './result.service'
import { JwtAuthGuard, RoleGuard } from 'src/auth/guards'

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async create(): Promise<void> {
    return this.resultService.create()
  }
}
