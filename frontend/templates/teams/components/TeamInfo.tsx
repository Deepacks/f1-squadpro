import { FC, memo } from 'react'
import Image from 'next/image'
import { TeamLocal } from '@/types/teams.types'

interface TeamInfoProps {
  position: number
  points: number
  team: TeamLocal
}

export const TeamInfo: FC<TeamInfoProps> = memo(
  ({ position, points, team: { color, name } }) => {
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
              style={{ backgroundColor: color }}
            />

            <div>
              <p className="text-2xl font-semibold">{name}</p>
            </div>
          </div>

          <Image
            src={`/f1-squadpro/images/teams/${name
              .toLowerCase()
              .replaceAll(' ', '-')}.png`}
            height={50}
            width={50}
            alt={name}
          />
        </div>

        <div></div>
      </div>
    )
  },
)
