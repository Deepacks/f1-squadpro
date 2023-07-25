import type { Request } from 'express'

export interface RequestUser {
  userId: string
  role: string
}

export interface GuardedRequest extends Request {
  user: RequestUser
}

export enum Role {
  USER = 'user',
  MANAGER = 'manager',
}
