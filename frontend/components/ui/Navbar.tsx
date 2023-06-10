'use client'

import { memo, useCallback, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useToggle, useWindowSize } from 'react-use'
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Button, IconButton, Navbar as MaterialNavbar } from '@material'
import { Menu, MenuItem } from './Menu'

enum UserMenuItems {
  LOGOUT = 'logout',
}

export const Navbar = memo(() => {
  const router = useRouter()
  const { width } = useWindowSize()

  const [openNav, toggleOpenNav] = useToggle(false)
  useEffect(() => {
    if (openNav && width >= 960) toggleOpenNav(false)
  }, [width])

  const navList = 'nav'

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
    <MaterialNavbar className="h-[66px] max-w-full flex items-center absolute inset-0 z-10 rounded-none">
      <div className="w-full flex items-center justify-between text-[color:var(--text-color)]">
        <h1>F1 SquadPro</h1>

        <div className="hidden lg:inline-block">{navList}</div>

        <div className="hidden lg:inline-block">
          <Menu menuItems={userMenuItems} onItemClick={handleUserMenuItemClick}>
            <Button
              color="white"
              aria-label="toggle user menu"
              variant="text"
              className="flex items-center gap-2 text-base text-[color:var(--text-color)] font-medium normal-case"
            >
              <p>SkilledSoda</p>
              <UserCircleIcon className="h-7 w-7" />
            </Button>
          </Menu>
        </div>

        <IconButton
          aria-label="toggle mobile navigation"
          variant="text"
          className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={toggleOpenNav}
        >
          {openNav ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </IconButton>
      </div>

      {/* <Collapse open={openNav}>
        <div className="flex items-center justify-between text-[color:var(--text-color)]">
          {navList}
        </div>
      </Collapse> */}
    </MaterialNavbar>
  )
})
