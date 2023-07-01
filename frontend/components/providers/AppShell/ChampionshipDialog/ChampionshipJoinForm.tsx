import {
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import { ChampionshipWithBasicInfo } from '@/types/championship.types'
import { httpClient } from '@/clients/httpClient'

import { Button, Chip, Input } from '@material'

interface ChampionshipJoinForm {
  disableTab: boolean
  onChampionshipSelect: (championshipId: string) => void
}

export const ChampionshipJoinForm: FC<ChampionshipJoinForm> = memo(
  ({ disableTab, onChampionshipSelect }) => {
    const [code, setCode] = useState('')
    const [championship, setChampionship] =
      useState<ChampionshipWithBasicInfo | null>(null)

    const handleCodeSubmit = useCallback(
      async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setChampionship(null)

        const { data } = await httpClient.get<ChampionshipWithBasicInfo | null>(
          `/championship/code/${code}`,
        )
        if (data) setChampionship(data)
      },
      [code],
    )

    const handleChampionshipSelect = useCallback(() => {
      onChampionshipSelect(championship!._id)
    }, [championship])

    const championshipContainer = useRef<HTMLDivElement>(null)
    const [championshipContainerHeight, setChampionshipContainerHeight] =
      useState(0)

    useEffect(() => {
      setChampionshipContainerHeight(
        championshipContainer.current
          ? championshipContainer.current.scrollHeight + 20
          : 0,
      )
    }, [championship])

    return (
      <div>
        <form
          className="flex flex-col sm:flex-row gap-2"
          onSubmit={handleCodeSubmit}
        >
          <div className="flex-1">
            <Input
              tabIndex={disableTab ? -1 : undefined}
              required
              size="lg"
              label="Championship Code"
              value={code}
              onChange={({ target: { value } }) => setCode(value.toUpperCase())}
            />
          </div>

          <Button
            aria-label="search championship"
            tabIndex={disableTab ? -1 : undefined}
            className="w-full flex justify-center sm:w-fit px-3 material-button"
            color="red"
            variant="filled"
            type="submit"
            fullWidth
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
          </Button>
        </form>

        <div
          className="overflow-hidden base-transition"
          style={{ maxHeight: championshipContainerHeight }}
        >
          {championship && (
            <div
              ref={championshipContainer}
              className="mt-4 p-2 flex justify-between items-center border-2 border-[#dcdcdc] rounded-lg text-[color:var(--text-color)]"
            >
              <div className="flex flex-col">
                <h5 className="text-lg font-bold">{championship.name}</h5>
                <Chip
                  className="mt-1 w-fit"
                  variant="ghost"
                  color="blue-gray"
                  value={`Partecipants: ${championship.partecipants}`}
                />
              </div>
              <Button
                tabIndex={disableTab ? -1 : undefined}
                className="material-button"
                color="red"
                aria-label="join championship"
                variant="text"
                onClick={handleChampionshipSelect}
              >
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  },
)
