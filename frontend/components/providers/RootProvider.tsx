import { Inter } from 'next/font/google'
import { ThemeProvider } from '@material'

const inter = Inter({ subsets: ['latin'] })

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <body className={inter.className}>{children}</body>
    </ThemeProvider>
  )
}
