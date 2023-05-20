import * as React from 'react'
import styles from './styles.styl'
import { MenuItem } from './menu-item'
import { appRoutes } from 'root/appRoutes'
import { SiteLogo } from 'components/common/SiteLogo'
import { useAuth } from 'root/hooks/store'
import { useAppSelector } from 'root/store/application.store'

export const Navbar: React.FC = () => {
  const authorized = useAuth()

  const pageInfo = useAppSelector(store => store.page.info)

  return (
    <>
      <header className={styles.siteHeader} id='site-header'>
        <a className={`logo site-logo ${styles.logo}`} id='site-logo' href='/'>
          <SiteLogo />
        </a>
        <nav className={styles.navigation} role='navigation' id='site-nav'>
          <ul className={styles.menu}>
            <MenuItem link={appRoutes.projectsFeed()}>Лента</MenuItem>
            {authorized !== undefined && (
              <>
                {authorized ? (
                  <>
                    <MenuItem link={appRoutes.userProjects()}>Мои фильмы</MenuItem>
                    <MenuItem link={appRoutes.createMovie()}>Создать фильм</MenuItem>
                    <MenuItem link={appRoutes.analytics()}>Аналитика</MenuItem>
                    <MenuItem link={appRoutes.logout()}>Выйти</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem link={appRoutes.login()}>Вход</MenuItem>
                    <MenuItem link={appRoutes.register()}>Регистрация</MenuItem>
                  </>
                )}
              </>
            )}
          </ul>
        </nav>
      </header>
      {(pageInfo.title || pageInfo.headerTitle) && (
        <div className={styles.pageBar}>
          <div className={styles.pageTitle}>{pageInfo.headerTitle ?? pageInfo.title}</div>
        </div>
      )}
    </>
  )
}
