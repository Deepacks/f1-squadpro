'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch } from '@store'
import { fetchSession } from '@/redux/slices/userSlice'

import { Navbar } from '@ui'

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchSession({
        onReject: () => router.replace('/login'),
      }),
    )
  }, [])

  return (
    <>
      <Navbar appPage />

      <main>
        <div className="relative w-full p-5 lg:p-10 flex flex-col items-center">
          {children}
        </div>
      </main>
    </>
  )
}
