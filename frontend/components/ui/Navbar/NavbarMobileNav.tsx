import { FC, memo } from 'react'

import { Collapse } from '@material'

interface NavbarMobileNavProps {
  isOpen: boolean
}

export const NavbarMobileNav: FC<NavbarMobileNavProps> = memo(({ isOpen }) => {
  return (
    <Collapse open={isOpen}>
      <div>mobile nav</div>
    </Collapse>
  )
})
