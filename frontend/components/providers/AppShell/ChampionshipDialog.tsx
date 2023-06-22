import { FC, memo, useEffect, useState } from 'react'

import { Dialog } from '@ui'
import { ChampionshipRadioGroup } from './ChampionshipRadioGroup'

interface ChampionshipDialogProps {
  isOpen: boolean
  onClose: () => void
}

export enum CHAMPIONSHIP_MODE {
  JOIN = 'Join',
  CREATE = 'Create',
}

export const ChampionshipDialog: FC<ChampionshipDialogProps> = memo(
  ({ isOpen, onClose }) => {
    const [championshipMode, setChampionshipMode] = useState(
      CHAMPIONSHIP_MODE.JOIN,
    )

    useEffect(() => {
      console.log(championshipMode)
    }, [championshipMode])

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header={
          <h2 className="w-full text-center">
            Create or Join an F1 Championship
          </h2>
        }
      >
        <div className="mt-[-10px] w-full flex justify-center">
          <ChampionshipRadioGroup onModeChange={setChampionshipMode} />
        </div>
      </Dialog>
    )
  },
)
