import { F1Teams } from '@/data/teams.data'

import { ContainedWrap } from '@layouts'
import { TeamInfo } from './components/TeamInfo'

export function TeamsPageTemplate() {
  return (
    <ContainedWrap>
      {F1Teams.map((f1Team, index) => (
        <TeamInfo key={index} position={index + 1} points={110} team={f1Team} />
      ))}
    </ContainedWrap>
  )
}
