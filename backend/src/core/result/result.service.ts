import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { Result } from 'src/schemas/result.schema'

@Injectable()
export class ResultService {
  constructor(
    @InjectModel(Result.name) private readonly resultModel: Model<Result>,
  ) {}

  async create(): Promise<void> {
    return
  }
}
