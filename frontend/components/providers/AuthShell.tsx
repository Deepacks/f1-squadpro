import { Navbar } from '@ui'

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />

      <main>
        <div className="h-full flex-center">{children}</div>
      </main>
    </>
  )
}
