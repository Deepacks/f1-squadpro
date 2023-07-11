'use client'

import { FC, memo, useCallback } from 'react'
import { useAppSelector } from '@/redux/hooks'
import { getChamptionshipDrivers } from '@/redux/slices/championshipSlice'
import { DriverLocal } from '@/types/drivers.types'
import { ChampionshipDriver } from '@/types/championship.types'

import { DriverInfo } from './DriverInfo'

export const DriverGrid: FC = memo(() => {
  const championshipDrivers = useAppSelector(getChamptionshipDrivers)

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

  return championshipDrivers?.map((driver, index) => (
    <DriverInfo
      key={index}
      position={index + 1}
      points={110}
      driver={driver2Local(driver)}
    />
  ))
})
