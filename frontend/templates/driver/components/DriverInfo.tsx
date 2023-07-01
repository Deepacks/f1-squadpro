import { FC, memo, useMemo } from 'react'
import { F1Teams } from '@/data/teams.data'
import { DriverLocal } from '@/types/drivers.types'

interface DriverInfoProps {
  position: number
  points: number
  driver: DriverLocal
}

export const DriverInfo: FC<DriverInfoProps> = memo(
  ({ position, points, driver: { firstName, lastName, team } }) => {
    const f1Team = useMemo(
      () => F1Teams.find((f1Team) => f1Team.id === team)!,
      [team],
    )

    return (
      <div className="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(50%-20px)] border-t-2 border-r-2 border-black rounded-tr-[10px]">
        <div className="mt-3 mr-[14px] pb-3 flex justify-between items-center border-b-[1px] border-black">
          <p className="text-5xl font-bold">{position}</p>

          <div className="text-center">
            <p className="text-2xl leading-6">{points}</p>
            <p className="px-[4px] py-[2px] text-lg leading-[18px] font-bold bg-black text-white rounded-[5px]">
              PTS
            </p>
          </div>
        </div>

        <div className="my-3 mr-[14px] flex justify-between items-center">
          <div className="flex items-center">
            <div
              className="mr-[10px] w-[5px] h-[38px]"
              style={{ backgroundColor: f1Team.color }}
            />

            <div>
              <p className="text-sm leading-[18px] text-[#15151E]">
                {firstName}
              </p>
              <p className="text-xl leading-[20px] font-semibold">{lastName}</p>
            </div>
          </div>

          <p className="text-[#67676C]">{f1Team.name}</p>
        </div>

        <div></div>
      </div>
    )
  },
)
