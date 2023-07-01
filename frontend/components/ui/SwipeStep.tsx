import { FC, memo } from 'react'

interface SwipeStepProps {
  isFirstStep: boolean
  firstStep: JSX.Element
  secondStep: JSX.Element
}

export const SwipeStep: FC<SwipeStepProps> = memo(
  ({ isFirstStep, firstStep, secondStep }) => {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <div
          className={isFirstStep ? 'swipe-first swipe-active' : 'swipe-first'}
        >
          {firstStep}
        </div>

        <div
          className={isFirstStep ? 'swipe-second' : 'swipe-second swipe-active'}
        >
          {secondStep}
        </div>
      </div>
    )
  },
)
