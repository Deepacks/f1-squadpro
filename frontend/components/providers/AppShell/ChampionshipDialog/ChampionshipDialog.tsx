import { FC, memo, useState } from 'react'

import { Dialog } from '@ui'
import { Card } from '@material'
import { ChampionshipRadioGroup } from './ChampionshipRadioGroup'
import { ChampionshipJoinForm } from './ChampionshipJoinForm'

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
        <div className="w-full flex justify-center">
          <ChampionshipRadioGroup onModeChange={setChampionshipMode} />
        </div>

        <Card className="mt-4 p-4" shadow={false}>
          {championshipMode === CHAMPIONSHIP_MODE.JOIN ? (
            <ChampionshipJoinForm />
          ) : (
            <></>
          )}
        </Card>
      </Dialog>
    )
  },
)
