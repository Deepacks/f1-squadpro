import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/hooks'
import { UserState, fetchSession } from '@/redux/slices/userSlice'
import { fetchChampionship } from '@/redux/slices/championshipSlice'

export const useAppShellStateInit: () => [boolean, () => void] = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [showChampionshipDialog, setShowChampionshipDialog] = useState(false)

  const handleDialogClose = useCallback(
    () => setShowChampionshipDialog(false),
    [],
  )

  useEffect(() => {
    dispatch(
      fetchSession({
        onReject: () => router.replace('/login'),
      }),
    ).then((action) => {
      if (!(action.payload as UserState).hasChampionship) {
        setShowChampionshipDialog(true)
      } else {
        dispatch(fetchChampionship())
      }
    })
  }, [])

  return [showChampionshipDialog, handleDialogClose]
}
