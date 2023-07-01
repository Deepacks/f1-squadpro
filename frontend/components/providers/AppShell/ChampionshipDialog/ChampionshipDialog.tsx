import { FC, memo, useState } from 'react'

import { Dialog, SwipeStep } from '@ui'
import { Card } from '@material'
import { ChampionshipJoinForm } from './ChampionshipJoinForm'
import { ChampionshipDriverSelect } from './ChampionshipDriverSelect'
// import { ChampionshipRadioGroup } from './ChampionshipRadioGroup'

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

    const [selectedChampionshipId, setSelectedChampionshipId] = useState<
      string | null
    >(null)

    return (
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header={<h2 className="w-full text-center">Join an F1 Championship</h2>}
      >
        {/* <div className="mb-4 w-full flex justify-center">
          <ChampionshipRadioGroup onModeChange={setChampionshipMode} />
        </div> */}

        <SwipeStep
          isFirstStep={!selectedChampionshipId}
          firstStep={
            <Card className="p-4" shadow={false}>
              {championshipMode === CHAMPIONSHIP_MODE.JOIN ? (
                <ChampionshipJoinForm
                  disableTab={!!selectedChampionshipId}
                  onChampionshipSelect={setSelectedChampionshipId}
                />
              ) : (
                <></>
              )}
            </Card>
          }
          secondStep={
            <ChampionshipDriverSelect
              championshipId={selectedChampionshipId}
              disableTab={!!selectedChampionshipId}
            />
          }
        />
      </Dialog>
    )
  },
)
