import { Route, RouteProps, useHistory } from 'react-router-dom'
import * as React from 'react'
import { useAppSelector } from 'root/store/application.store'
import { Loader } from 'components/Loader'
import { appRoutes } from 'root/appRoutes'

export const AuthorizedRoute: React.FC<RouteProps> = props => {
  const user = useAppSelector(state => state.user.value)
  const userPending = useAppSelector(state => state.user.userPending)
  const history = useHistory()

  if (user === undefined) return <Loader />
  if (user === null && !userPending) {
    history.push(appRoutes.login())
    return <></>
  }

  return <Route {...props} />
}
