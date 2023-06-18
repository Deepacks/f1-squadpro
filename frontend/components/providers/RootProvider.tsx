import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function RootProvider({ children }: { children: React.ReactNode }) {
  return <body className={inter.className}>{children}</body>
}
