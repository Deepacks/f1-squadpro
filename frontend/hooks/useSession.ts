import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/redux/hooks'
import { UserState, fetchSession } from '@/redux/slices/userSlice'

export const useSession = ({
  isRoot,
  onSessionAvailable,
}: {
  isRoot?: boolean
  onSessionAvailable?: (user: UserState) => void
}) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchSession({
        onReject: () => router.replace('/login'),
      }),
    ).then((action) => {
      const user = action.payload as UserState
      if (!user) return

      if (onSessionAvailable) onSessionAvailable(user)
      else if (isRoot) router.replace('/drivers')
    })
  }, [])
}
