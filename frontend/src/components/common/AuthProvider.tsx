import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from 'root/store/application.store'
import { currentUser } from 'root/store/user/user.actions'

export const AuthProvider: React.FC = props => {
  const user = useAppSelector(state => state.user.value)
  const userPending = useAppSelector(state => state.user.userPending)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (user === undefined && !userPending) {
      dispatch(currentUser.request())
    }
  }, [user])

  return <>{props.children}</>
}
