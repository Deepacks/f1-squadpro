'use client'

import { useSession } from '@/hooks/useSession'

export default function Root() {
  useSession({ isRoot: true })

  return <></>
}
