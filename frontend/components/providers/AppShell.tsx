'use client'

import { useAppShellStateInit } from '@/hooks/useAppShellStateInit'

import { Navbar } from '@ui'

export function AppShell({ children }: { children: React.ReactNode }) {
  useAppShellStateInit()

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
