'use client'

import { useEffect } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useToggle, useWindowSize } from 'react-use'

import { Navbar as MaterialNavbar, IconButton } from '@material'
import { NavbarUserMenuDesktop } from './NavbarUserMenuDesktop'
import { NavbarDesktopNav } from './NavbarDesktopNav'
import { NavbarMobileNav } from './NavbarMobileNav'
import { Logo } from '../Logo'

export function Navbar() {
  const { width } = useWindowSize()

  const [openNav, toggleOpenNav] = useToggle(false)
  useEffect(() => {
    if (openNav && width >= 960) toggleOpenNav(false)
  }, [width])

  return (
    <MaterialNavbar className="p-0 min-h-[66px] h-max max-w-full absolute top-0 inset-0 z-10 rounded-none text-[color:var(--text-color)]">
      <div className="px-5 lg:pr-0 w-full h-full flex items-center justify-between relative">
        <Logo />

        <div className="m-auto w-max hidden lg:flex absolute top-0 right-0 bottom-0 left-0 justify-center items-center">
          <NavbarDesktopNav />
        </div>

        <NavbarUserMenuDesktop />

        <IconButton
          aria-label="toggle mobile navigation"
          variant="text"
          className="text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden relative z-20"
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

      <NavbarMobileNav isOpen={openNav} />
    </MaterialNavbar>
  )
}
