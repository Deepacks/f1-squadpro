import { F1Drivers } from '@/data/drivers.data'

import { DriverInfo } from './components/DriverInfo'

export function DriverPageTemplate() {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[910px] flex flex-wrap gap-8 lg:gap-10">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="basis-full md:basis-[calc(50%-16px)] lg:basis-[calc(50%-20px)]"
          >
            <DriverInfo
              position={index + 1}
              points={110}
              driver={F1Drivers[index]}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
