import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Loader } from 'components/Loader'
import { useAuth } from 'root/hooks/store'
import { logout } from 'root/store/user/user.actions'
import { appRoutes } from 'root/appRoutes'

export const LogoutPage: React.FC = () => {
  const authorized = useAuth()
  const dispatch = useDispatch()
  const history = useHistory()

  React.useEffect(() => {
    if (authorized === false) {
      history.push(appRoutes.login())
    } else {
      dispatch(logout.request())
    }
  }, [authorized])

  return <Loader />
}
