import { Inter } from 'next/font/google'

import { Navbar } from '@ui'

const inter = Inter({ subsets: ['latin'] })

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <body className={inter.className}>
      <Navbar />
      <main>{children}</main>
    </body>
  )
}
