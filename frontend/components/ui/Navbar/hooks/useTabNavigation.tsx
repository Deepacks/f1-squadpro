'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

export const useTabNavigation: (
  onClose?: () => void,
) => [string, (page: string) => void] = (onClose) => {
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
      if (onClose) setTimeout(onClose, 200)
    },
    [router],
  )

  return [activeTab, handleNavigationChange]
}
