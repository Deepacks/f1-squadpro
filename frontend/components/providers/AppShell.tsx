export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full p-5 lg:p-10 flex flex-col items-center">
      {children}
    </div>
  )
}
