'use client'

import { FC, memo, useCallback, useState } from 'react'

import { Tab, Tabs, TabsHeader } from '@material'
import { usePathname, useRouter } from 'next/navigation'

const NAV_DATA = [
  {
    label: 'Championship',
    value: 'championship',
  },
  {
    label: 'Results',
    value: 'results',
  },
]

export const NavbarDesktopNav: FC = memo(() => {
  const router = useRouter()
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState(pathname.split('/')?.at(-1))

  const handleNavChange = useCallback(
    (page: string) => {
      router.push(`/${page}`)
      setActiveTab(page)
    },
    [router],
  )

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none bg-transparent p-0 gap-6"
        indicatorProps={{
          className:
            'bg-transparent border-b-2 border-[color:var(--accent-color)] shadow-none rounded-none',
        }}
      >
        {NAV_DATA.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => handleNavChange(value)}
            className={
              activeTab === value ? 'text-[color:var(--accent-color)]' : ''
            }
          >
            <p className="font-semibold">{label}</p>
          </Tab>
        ))}
      </TabsHeader>
    </Tabs>
  )
})
