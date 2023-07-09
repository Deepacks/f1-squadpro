'use client'

import {
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { httpClient } from '@/clients/httpClient'
import { useAppDispatch } from '@/redux/hooks'
import { fetchChampionship } from '@/redux/slices/championshipSlice'
import { F1Teams } from '@/data/teams.data'
import { Championship, ChampionshipJoinDto } from '@/types/championship.types'

import { Card, Radio } from '@material'
import { Button, Select } from '@forms'

interface ChampionshipDriverSelectProps {
  championshipId: string | null
  disableTab: boolean
  onDialogClose: () => void
}

export const ChampionshipDriverSelect: FC<ChampionshipDriverSelectProps> = memo(
  ({ championshipId, disableTab, onDialogClose }) => {
    const dispatch = useAppDispatch()

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
        ({ team: { teamId, firstDriver, secondDriver } }) => {
          const teamDrivers: string[] = []

          Array.from([firstDriver, secondDriver]).forEach((driver) => {
            if (f1Drivers.includes(driver)) {
              const {
                driver: { _id },
              } = championshipData.drivers.find(
                ({ driver: driverData }) => driverData?._id === driver,
              )!

              teamDrivers.push(_id)
            }
          })

          newMap.set(teamId, teamDrivers)
        },
        [],
      )

      return newMap
    }, [championshipData])

    const getDriverName = useCallback(
      (driverId: string) => {
        const driverData = championshipData?.drivers.find(
          ({ driver }) => driver._id === driverId,
        )?.driver
        if (!driverData) return ''

        return `${driverData.firstName} ${driverData.lastName}`
      },
      [championshipData],
    )

    // TODO: selectedTeamId should be of the document maybe???
    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedDriver, setSelectedDriver] = useState('')

    const handleTeamSelect = useCallback((selectedTeam: string) => {
      setSelectedTeam(F1Teams.find(({ name }) => selectedTeam === name)!.id)
      setSelectedDriver('')
    }, [])

    const teamOptions = useMemo(
      () =>
        teamsDriversMap
          ? Array.from(teamsDriversMap.keys()).map(
              (teamId) => F1Teams.find(({ id }) => id === teamId)?.name ?? '',
            )
          : [],
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

    const handleChampionshipJoin = useCallback(
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const teamId = championshipData!.teams.find(
          ({ team }) => team.teamId === selectedTeam,
        )!.team._id

        const dto: ChampionshipJoinDto = {
          championshipId: championshipData!._id,
          teamId: teamId,
          driverId: selectedDriver,
        }

        try {
          await httpClient.post('/championship/join', dto)
          dispatch(fetchChampionship()).then(() => onDialogClose())
        } catch (error) {
          console.error(error)
        }
      },
      [championshipData, selectedTeam, selectedDriver, dispatch],
    )

    return (
      <form onSubmit={handleChampionshipJoin}>
        <Card
          className="p-4 h-[172px] flex flex-col justify-between"
          shadow={false}
        >
          <Select
            tabIndex={disableTab ? -1 : undefined}
            label="Select Team"
            options={teamOptions}
            value={F1Teams.find(({ id }) => id === selectedTeam)?.name ?? ''}
            onChange={handleTeamSelect}
            menuClassName="p-0 max-h-[92px] text-[color:var(--text-color)]"
          />

          <div className="flex justify-evenly">
            {driverOptions.length > 0 &&
              driverOptions.map((driverId, index) => (
                <Radio
                  tabIndex={disableTab ? -1 : undefined}
                  key={index}
                  id={driverId}
                  name="team-driver"
                  label={getDriverName(driverId)}
                  color="red"
                  className="hover:before:opacity-0 material-radio"
                  checked={selectedDriver === driverId}
                  onClick={() => setSelectedDriver(driverId)}
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
      </form>
    )
  },
)
