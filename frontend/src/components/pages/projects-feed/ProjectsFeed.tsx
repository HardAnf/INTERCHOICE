import * as React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import Share from '@material-ui/icons/Share'
import IconButton from '@material-ui/core/IconButton'
import ym from 'react-yandex-metrika'
import styles from './styles.styl'
import { Loader } from 'components/Loader'
import { useAppSelector } from 'root/store/application.store'
import { appRoutes, fullAppRoute } from 'root/appRoutes'
import { projectsActions } from 'root/store/projects/projects.slice'

export const ProjectsFeedPage: React.FC = () => {
  const projects = useAppSelector(state => state.projects.value)
  const pending = useAppSelector(state => state.projects.pending)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(projectsActions.fetch())
  }, [])

  if (pending) {
    return <Loader />
  }

  return (
    <div className='container'>
      <div className={styles.moviesGrid}>
        {projects.map(project => (
          <div key={project.projectId} className={styles.movie}>
            <div className={styles.moviePreview}>
              <img src={project.previewUrl} />
            </div>
            <div className={styles.movieInfo}>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <NavLink
                  className={styles.movieLink}
                  target='_blank'
                  to={appRoutes.movie(project.projectId)}
                >
                  <h2 className={styles.movieTitle}>{project.name}</h2>
                </NavLink>
                <IconButton
                  style={{
                    color: '#fff'
                  }}
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      fullAppRoute(appRoutes.movie(project.projectId))
                    )
                    toast('Ссылка скопирована', {
                      type: 'info',
                      toastId: `copy-${project.projectId}`
                    })
                    ym('hit', '/feed', {
                      params: {
                        share: {
                          [project.projectId]: project.name
                        }
                      }
                    })
                  }}
                >
                  <Share />
                </IconButton>
              </div>

              <div className={styles.shortDescription}>{project.shortDescription}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
