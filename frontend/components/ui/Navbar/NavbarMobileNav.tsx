'use client'

import { FC, memo } from 'react'
import { useTabNavigation } from './hooks/useTabNavigation'
import { NAV_DATA } from './data/nav.data'

import { Collapse, Tab, Tabs, TabsHeader } from '@material'

interface NavbarMobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export const NavbarMobileNav: FC<NavbarMobileNavProps> = memo(
  ({ isOpen, onClose }) => {
    const [activeTab, handleNavigationChange] = useTabNavigation(onClose)

    return (
      <Collapse open={isOpen}>
        <Tabs value={activeTab} orientation="vertical">
          <TabsHeader
            className="pt-2 pb-5 px-0 w-screen rounded-none bg-transparent items-center gap-1"
            indicatorProps={{
              className: 'hidden',
            }}
          >
            {NAV_DATA.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleNavigationChange(value)}
                className="min-w-[30%] w-fit"
              >
                <p
                  className={`font-semibold ${
                    activeTab === value
                      ? 'text-[color:var(--accent-color)] border-b-2 border-[color:var(--accent-color)]'
                      : 'mb-[2px]'
                  }`}
                >
                  {label}
                </p>
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </Collapse>
    )
  },
)
