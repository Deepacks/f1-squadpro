import '../styles/globals.scss'

import { RootProvider } from '@providers'

export const metadata = {
  title: 'F1 SquadPro',
  description: 'Virtual F1 season manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <RootProvider>{children}</RootProvider>
    </html>
  )
}
