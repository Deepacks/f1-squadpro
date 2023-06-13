'use client'

import { FC, memo } from 'react'
import { useTabNavigation } from './hooks/useTabNavigation'
import { NAV_DATA } from './data/nav.data'

import { Tab, Tabs, TabsHeader } from '@material'

export const NavbarDesktopNav: FC = memo(() => {
  const [activeTab, handleNavigationChange] = useTabNavigation()

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="p-0 rounded-none bg-transparent gap-6"
        indicatorProps={{
          className: 'hidden',
        }}
      >
        {NAV_DATA.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => handleNavigationChange(value)}
            className={
              activeTab === value
                ? 'text-[color:var(--accent-color)] border-b-2 border-[color:var(--accent-color)]'
                : 'text-black'
            }
          >
            <p className="font-semibold">{label}</p>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  )
})
