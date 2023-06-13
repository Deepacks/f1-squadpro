'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export const useTabNavigation: () => [string, (page: string) => void] = () => {
  const router = useRouter()
  const pathname = usePathname()

  const [activeTab, setActiveTab] = useState(pathname.split('/').at(-1)!)

  useEffect(() => {
    const route = pathname.split('/').at(-1)!

    if (route !== activeTab) setActiveTab(pathname.split('/').at(-1)!)
  }, [pathname])

  const handleNavigationChange = useCallback(
    (page: string) => {
      router.push(`/${page}`)
      setActiveTab(page)
    },
    [router],
  )

  return [activeTab, handleNavigationChange]
}
