import Image from 'next/image'
import { FC, memo } from 'react'

export const Logo: FC = memo(() => {
  return (
    <div className="relative bottom-[2px]">
      <Image
        src="/f1-squadpro/images/f1logo.png"
        alt="f1 logo"
        height={60}
        width={60}
      />

      <p className="absolute top-[28px] left-[19px] font-semibold">SquadPro</p>
    </div>
  )
})
