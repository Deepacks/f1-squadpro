export interface AuthDto {
  email: string
  password: string
}

export interface AuthRegisterDto extends AuthDto {
  firstName: string
  lastName: string
  isF1Driver?: boolean
  defaultTeam?: string
}
