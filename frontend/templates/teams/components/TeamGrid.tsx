'use client'

import { FC, memo, useCallback, useMemo } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { getChamptionshipTeams } from '@/redux/slices/championshipSlice'
import { ChampionshipTeam } from '@/types/championship.types'
import { TeamLocal } from '@/types/teams.types'
import { F1Teams } from '@/data/teams.data'

import { TeamInfo } from './TeamInfo'

export const TeamGrid: FC = memo(() => {
  const championshipTeams = useAppSelector(getChamptionshipTeams)

  const sortedTeams = useMemo(
    () =>
      championshipTeams
        ? [...championshipTeams].sort((a, b) => {
            if (a.points > b.points) return -1
            if (a.points < b.points) return +1
            return 0
          })
        : [],
    [championshipTeams],
  )

  const team2Local = useCallback((champTeam: ChampionshipTeam) => {
    const f1Team = F1Teams.find(({ id }) => id === champTeam.team.teamId)!
    return {
      id: f1Team.id,
      name: f1Team.name,
      color: f1Team.color,
    } as TeamLocal
  }, [])

  return sortedTeams.map((team, index) => (
    <TeamInfo
      key={index}
      position={index + 1}
      points={team.points}
      team={team2Local(team)}
    />
  ))
})
