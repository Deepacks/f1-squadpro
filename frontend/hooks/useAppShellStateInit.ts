import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { UserState, fetchSession } from '@/redux/slices/userSlice'
import { fetchChampionship } from '@/redux/slices/championshipSlice'

export const useAppShellStateInit = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      fetchSession({
        onReject: () => router.replace('/login'),
      }),
    ).then((action) => {
      if (!(action.payload as UserState).hasChampionship) return

      dispatch(fetchChampionship())
    })
  }, [])
}
