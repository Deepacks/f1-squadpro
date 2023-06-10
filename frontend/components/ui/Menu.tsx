import { FC, memo } from 'react'

import {
  Menu as MaterialMenu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material'

export interface MenuItem {
  action: string
  label: JSX.Element
}

interface MenuProps {
  children: React.ReactNode
  menuItems: MenuItem[]
  onItemClick: (key: string) => void
}

export const Menu: FC<MenuProps> = memo(
  ({ children, menuItems, onItemClick }) => {
    return (
      <MaterialMenu
        placement="bottom-end"
        animate={{
          mount: { y: 0 },
          unmount: { y: -25 },
        }}
      >
        <MenuHandler>{children}</MenuHandler>

        <MenuList>
          {menuItems.map(({ action, label }, index) => (
            <MenuItem key={index} onClick={() => onItemClick(action)}>
              {label}
            </MenuItem>
          ))}
        </MenuList>
      </MaterialMenu>
    )
  },
)
