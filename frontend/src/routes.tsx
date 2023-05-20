import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { LinksPage } from './components/pages/LinksPage'
import { DetailPage } from './components/pages/DetailPage'
import { AuthPage } from './components/pages/auth/AuthPage'
import { RegPage } from './components/pages/register/RegPage'
import { ProfilePage } from './components/pages/ProfilePage'
import { ScenesEditor } from './components/pages/movie/scenes-editor/ScenesEditor'
import { appRoutes } from './appRoutes'
import { AuthorizedRoute } from 'components/common/AuthorizedRoute'
import { CreateMoviePage } from 'components/pages/movie/movie-project/CreateMoviePage'
import { MoviePlayer } from 'components/pages/movie/player/MoviePlayer'
import { PromoPage } from 'components/pages/promo/PromoPage'
import { UserProjectsPage } from 'components/pages/user-projects/UserProjects'
import { ProjectsFeedPage } from 'components/pages/projects-feed/ProjectsFeed'
import { LogoutPage } from 'components/pages/LogoutPage'
import { AnalyticsPage } from 'components/pages/movie/analytics/AnalyticsPage'

export const useRoutes = (): React.ReactNode => {
  return (
    <Switch>
      <Route path={appRoutes.promo()} exact component={PromoPage} />
      <Route path={appRoutes.login()} exact component={AuthPage} />
      <Route path={appRoutes.register()} component={RegPage} exact />
      <Route path={appRoutes.logout()} component={LogoutPage} exact />

      <AuthorizedRoute path={appRoutes.createMovie()} component={CreateMoviePage} exact />
      <Route path={appRoutes.movie()} component={MoviePlayer} exact />

      <Route path={appRoutes.projectsFeed()} component={ProjectsFeedPage} exact />

      <AuthorizedRoute path={appRoutes.scenesEditor()} component={ScenesEditor} exact />
      <AuthorizedRoute path={appRoutes.userProjects()} component={UserProjectsPage} exact />
      <Route path={appRoutes.analytics()} component={AnalyticsPage} exact />

      <Redirect to={appRoutes.createMovie()} />
    </Switch>
  )
}
