'use client'

import { useEffect } from 'react'
import { useToggle, useWindowSize } from 'react-use'
import {
  Bars3Icon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { IconButton, Navbar as MaterialNavbar } from '@material'

export function Navbar() {
  const { width } = useWindowSize()

  const [openNav, toggleOpenNav] = useToggle(false)

  useEffect(() => {
    if (openNav && width >= 960) toggleOpenNav(false)
  }, [width])

  const navList = 'nav'

  return (
    <MaterialNavbar className="h-[66px] max-w-full flex items-center absolute inset-0 z-10 rounded-none">
      <div className="w-full flex items-center justify-between text-[color:var(--text-color)]">
        <h1>F1 SquadPro</h1>

        <div className="hidden lg:inline-block">{navList}</div>

        <IconButton
          color="white"
          aria-label="toggle user menu"
          variant="text"
          className="hidden lg:inline-block text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
        >
          <UserCircleIcon className="h-7 w-7" />
        </IconButton>
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
}
