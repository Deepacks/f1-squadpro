import { FC, memo } from 'react'

export const ContainedWrap: FC<{ children: React.ReactNode }> = memo(
  ({ children }) => {
    return (
      <div className="max-w-[910px] flex flex-wrap gap-8 lg:gap-10">
        {children}
      </div>
    )
  },
)
