import { F1Drivers } from '@/data/drivers.data'

import { ContainedWrap } from '@layouts'
import { DriverInfo } from './components/DriverInfo'

export function DriverPageTemplate() {
  return (
    <ContainedWrap>
      {F1Drivers.map((f1Driver, index) => (
        <DriverInfo
          key={index}
          position={index + 1}
          points={110}
          driver={f1Driver}
        />
      ))}
    </ContainedWrap>
  )
}
