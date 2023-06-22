import { FC, memo } from 'react'
import { CHAMPIONSHIP_MODE } from './ChampionshipDialog'

import { Radio, Card, List, ListItem, ListItemPrefix } from '@material'

interface ChampionshipRadioGroupProps {
  onModeChange: (mode: CHAMPIONSHIP_MODE) => void
}

export const ChampionshipRadioGroup: FC<ChampionshipRadioGroupProps> = memo(
  ({ onModeChange }) => {
    return (
      <Card className="w-fit" shadow={false}>
        <List className="flex-row">
          <ListItem className="p-0">
            <label
              htmlFor="horizontal-list-join"
              className="px-3 py-2 flex items-center w-full cursor-pointer"
            >
              <ListItemPrefix className="mr-3">
                <Radio
                  defaultChecked
                  color="red"
                  onChange={() => onModeChange(CHAMPIONSHIP_MODE.JOIN)}
                  name="horizontal-list"
                  id="horizontal-list-join"
                  ripple={false}
                  className="hover:before:opacity-0 material-radio"
                  containerProps={{
                    className: 'p-0',
                  }}
                />
              </ListItemPrefix>
              <p>Join</p>
            </label>
          </ListItem>
          <ListItem className="p-0">
            <label
              htmlFor="horizontal-list-create"
              className="px-3 py-2 flex items-center w-full cursor-pointer"
            >
              <ListItemPrefix className="mr-3">
                <Radio
                  color="red"
                  onChange={() => onModeChange(CHAMPIONSHIP_MODE.CREATE)}
                  name="horizontal-list"
                  id="horizontal-list-create"
                  ripple={false}
                  className="hover:before:opacity-0 material-radio"
                  containerProps={{
                    className: 'p-0',
                  }}
                />
              </ListItemPrefix>
              <p>Create</p>
            </label>
          </ListItem>
        </List>
      </Card>
    )
  },
)
