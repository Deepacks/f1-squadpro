'use client'

import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Championship } from '@/types/championship.types'
import { httpClient } from '@/clients/httpClient'

import { Card, Radio } from '@material'
import { Button, Select } from '@forms'

interface ChampionshipDriverSelectProps {
  championshipId: string | null
  disableTab: boolean
}

export const ChampionshipDriverSelect: FC<ChampionshipDriverSelectProps> = memo(
  ({ championshipId, disableTab }) => {
    const [championshipData, setChampionshipData] =
      useState<Championship | null>(null)

    const fetchChampionshipData = useCallback(async () => {
      const { data } = await httpClient.get<Championship>(
        `/championship/id/${championshipId!}`,
      )
      setChampionshipData(data)
    }, [championshipId])

    useEffect(() => {
      if (!championshipId) return
      fetchChampionshipData()
    }, [championshipId])

    const teamsDriversMap = useMemo(() => {
      if (!championshipData) return null

      const newMap: Map<string, string[]> = new Map()
      const f1Drivers = championshipData.drivers
        .filter(({ driver }) => driver?.isF1Driver)
        .map(({ driver }) => driver?._id)

      championshipData.teams.forEach(
        ({ team: { name, firstDriver, secondDriver } }) => {
          const teamDrivers: string[] = []

          Array.from([firstDriver, secondDriver]).forEach((driver) => {
            if (f1Drivers.includes(driver)) {
              const {
                driver: { firstName, lastName },
              } = championshipData.drivers.find(
                ({ driver: driverData }) => driverData?._id === driver,
              )!

              teamDrivers.push(`${firstName} ${lastName}`)
            }
          })

          newMap.set(name, teamDrivers)
        },
        [],
      )

      return newMap
    }, [championshipData])

    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedDriver, setSelectedDriver] = useState('')

    const handleTeamSelect = useCallback((selectedTeam: string) => {
      setSelectedTeam(selectedTeam)
      setSelectedDriver('')
    }, [])

    const teamOptions = useMemo(
      () => (teamsDriversMap ? Array.from(teamsDriversMap.keys()) : []),
      [teamsDriversMap],
    )
    const driverOptions = useMemo(
      () =>
        championshipData && teamsDriversMap && selectedTeam
          ? teamsDriversMap.get(selectedTeam)!
          : [],
      [championshipData, teamsDriversMap, selectedTeam],
    )

    const isSubmitDisabled = useMemo(
      () => !selectedTeam || !selectedDriver,
      [selectedTeam, selectedDriver],
    )

    return (
      <Card
        className="p-4 h-[172px] flex flex-col justify-between"
        shadow={false}
      >
        <Select
          tabIndex={disableTab ? -1 : undefined}
          label="Select Team"
          options={teamOptions}
          value={selectedTeam}
          onChange={handleTeamSelect}
          menuClassName="p-0 max-h-[92px] text-[color:var(--text-color)]"
        />

        <div className="flex justify-evenly">
          {driverOptions.length > 0 &&
            driverOptions.map((driver, index) => (
              <Radio
                tabIndex={disableTab ? -1 : undefined}
                key={index}
                id={driver}
                name="team-driver"
                label={driver}
                color="red"
                className="hover:before:opacity-0 material-radio"
                checked={selectedDriver === driver}
                onClick={() => setSelectedDriver(driver)}
              />
            ))}
        </div>

        <Button
          tabIndex={disableTab ? -1 : undefined}
          disabled={isSubmitDisabled}
          className="py-1.5 text-md"
        >
          Partecipa
        </Button>
      </Card>
    )
  },
)
