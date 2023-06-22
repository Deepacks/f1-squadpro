'use client'

import { useAppShellStateInit } from '@/hooks/useAppShellStateInit'

import { Navbar } from '@ui'
import { ChampionshipDialog } from './ChampionshipDialog'

export function AppShell({ children }: { children: React.ReactNode }) {
  const [showChampionshipDialog, handleDialogClose] = useAppShellStateInit()

  return (
    <>
      <Navbar appPage />

      <main>
        <div className="relative w-full p-5 lg:p-10 flex flex-col items-center">
          <ChampionshipDialog
            isOpen={showChampionshipDialog}
            onClose={handleDialogClose}
          />

          {children}
        </div>
      </main>
    </>
  )
}
