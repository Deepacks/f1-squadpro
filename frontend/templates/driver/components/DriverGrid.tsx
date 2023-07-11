'use client'

import { FC, memo, useCallback, useMemo } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { getChamptionshipDrivers } from '@/redux/slices/championshipSlice'
import { DriverLocal } from '@/types/drivers.types'
import { ChampionshipDriver } from '@/types/championship.types'

import { DriverInfo } from './DriverInfo'

export const DriverGrid: FC = memo(() => {
  const championshipDrivers = useAppSelector(getChamptionshipDrivers)

  const sortedDrivers = useMemo(
    () =>
      championshipDrivers
        ? [...championshipDrivers].sort((a, b) => {
            if (a.points > b.points) return -1
            if (a.points < b.points) return +1
            return 0
          })
        : [],
    [championshipDrivers],
  )

  const driver2Local = useCallback(
    (champDriver: ChampionshipDriver) =>
      ({
        id: champDriver._id,
        firstName: champDriver.driver.firstName,
        lastName: champDriver.driver.lastName,
        team: champDriver.teamLocalId,
      } as DriverLocal),
    [],
  )

  return sortedDrivers.map((driver, index) => (
    <DriverInfo
      key={index}
      position={index + 1}
      points={driver.points}
      driver={driver2Local(driver)}
    />
  ))
})
