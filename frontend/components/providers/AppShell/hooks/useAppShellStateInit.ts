import { useCallback, useState } from 'react'
import { useSession } from '@/hooks/useSession'
import { useAppDispatch } from '@/redux/hooks'
import { UserState } from '@/redux/slices/userSlice'
import { fetchChampionship } from '@/redux/slices/championshipSlice'

export const useAppShellStateInit: () => [boolean, () => void] = () => {
  const dispatch = useAppDispatch()

  const [showChampionshipDialog, setShowChampionshipDialog] = useState(false)

  const handleDialogClose = useCallback(
    () => setShowChampionshipDialog(false),
    [],
  )

  const handleSession = useCallback((user: UserState) => {
    if (!user.hasChampionship) {
      setShowChampionshipDialog(true)
    } else {
      dispatch(fetchChampionship())
    }
  }, [])

  useSession({ onSessionAvailable: handleSession })

  return [showChampionshipDialog, handleDialogClose]
}
