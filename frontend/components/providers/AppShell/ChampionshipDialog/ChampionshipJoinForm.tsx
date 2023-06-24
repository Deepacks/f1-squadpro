import { FC, FormEvent, memo, useCallback, useState } from 'react'
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

import { Button, Chip, Input } from '@material'
import { httpClient } from '@/clients/httpClient'
import { ChampionshipBasicInfo } from '@/types/championship.types'

export const ChampionshipJoinForm: FC = memo(() => {
  const [code, setCode] = useState('')
  const [championship, setChampionship] =
    useState<ChampionshipBasicInfo | null>(null)

  const handleCodeSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setChampionship(null)

      const { data } = await httpClient.get<ChampionshipBasicInfo | null>(
        `/championship/code/${code}`,
      )
      if (data) setChampionship(data)
    },
    [code],
  )

  return (
    <div>
      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={handleCodeSubmit}
      >
        <div className="flex-1">
          <Input
            required
            size="lg"
            label="Championship Code"
            value={code}
            onChange={({ target: { value } }) => setCode(value.toUpperCase())}
          />
        </div>

        <Button
          aria-label="search championship"
          variant="filled"
          className="w-full flex justify-center sm:w-fit px-3"
          disabled={false}
          type="submit"
          color="red"
          fullWidth
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </Button>
      </form>

      <div
        className="overflow-hidden base-transition"
        style={championship ? { maxHeight: 96 } : { maxHeight: 0 }}
      >
        {championship && (
          <div className="mt-4 p-2 flex justify-between items-center border-2 border-[#dcdcdc] rounded-lg text-[color:var(--text-color)]">
            <div className="flex flex-col">
              <h5 className="text-lg font-bold">{championship.name}</h5>
              <Chip
                className="mt-1 w-fit"
                variant="ghost"
                color="blue-gray"
                value={`Partecipants: ${championship.partecipants}`}
              />
            </div>
            <Button color="red" aria-label="join championship" variant="text">
              <ArrowRightIcon className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
})
