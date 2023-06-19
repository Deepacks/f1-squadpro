import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <body className={inter.className}>
      {children}
      <Toaster />
    </body>
  )
}
