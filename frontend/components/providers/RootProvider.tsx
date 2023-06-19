'use client'

import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const inter = Inter({ subsets: ['latin'] })

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </Provider>
  )
}
