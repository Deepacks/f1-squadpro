import { FC, memo, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'

import { Button } from '@material'
import { Menu, MenuItem } from '../Menu'

enum UserMenuItems {
  LOGOUT = 'logout',
}

export const NavbarUserMenuDesktop: FC = memo(() => {
  const router = useRouter()

  const userMenuItems: MenuItem[] = useMemo(
    () => [
      {
        action: UserMenuItems.LOGOUT,
        label: (
          <div className="flex items-center gap-2 text-[color:var(--accent-color)]">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <p>Log out</p>
          </div>
        ),
      },
    ],
    [],
  )
  const handleUserMenuItemClick = useCallback(
    (action: string) => {
      switch (action as UserMenuItems) {
        case 'logout': {
          router.push('/login')
        }

        default:
          break
      }
    },
    [router],
  )

  return (
    <div className="hidden lg:inline-block">
      <Menu menuItems={userMenuItems} onItemClick={handleUserMenuItemClick}>
        <Button
          color="white"
          aria-label="toggle user menu"
          variant="text"
          className="flex items-center gap-2 text-base text-[color:var(--text-color)] font-medium normal-case material-button"
        >
          <p>SkilledSoda</p>
          <UserCircleIcon className="h-7 w-7" />
        </Button>
      </Menu>
    </div>
  )
})
