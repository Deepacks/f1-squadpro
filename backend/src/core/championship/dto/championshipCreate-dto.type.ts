import { TeamCreateDto } from 'src/core/team/dto/teamCreate-dto.type'

export interface ChampionshipCreateDto {
  name: string
  teams: TeamCreateDto[]
  drivers: string[]
}
