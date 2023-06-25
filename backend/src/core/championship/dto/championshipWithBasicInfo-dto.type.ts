import { Championship } from 'src/schemas/championship.schema'

export interface ChampionshipWithBasicInfoDto
  extends Omit<Championship, 'code'> {
  partecipants: number
}
