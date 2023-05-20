import * as React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@material-ui/core'
import ym from 'react-yandex-metrika'
import styles from './styles.styl'
import { Loader } from 'components/Loader'
import { useAppSelector } from 'root/store/application.store'
import { getProject } from 'root/store/movie/project/project.actions'
import './styles.css'
import { ProjectScene } from 'root/shared/projects'
import { setPageInfo } from 'root/store/page/page.actions'

export interface RouteComponentProps {
  movieId: string
}

export const MoviePlayer: React.FC = () => {
  const project = useAppSelector(state => state.project.value)
  const { movieId } = useParams<RouteComponentProps>()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!project) dispatch(getProject.request(movieId))
  })

  const [scene, setScene] = useState<ProjectScene | null>(null)
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState(0)
  const [sceneDuration, setSceneDuration] = useState(0)

  useEffect(() => {
    if (project && !scene) {
      dispatch(setPageInfo({ title: project.name }))
      setScene(project.firstNode ?? null)
    }
  }, [project])

  const childrens = useMemo(() => {
    if (!project || !scene) return []
    return project?.nodes.filter(node => scene.childGuids?.includes(node.id))
  }, [scene])

  const endHandler = React.useCallback(() => {
    if (childrens.length !== 1) {
      setEnded(true)
    } else {
      setScene(childrens[0])
    }
  }, [scene])

  if (!movieId) return <></>

  if (!project || !scene) return <Loader />

  const timeLeftForShowButtons = Number(process.env.TIME_LEFT_FOR_SHOW_BUTTONS ?? 5)

  return (
    <div className={styles.container}>
      {childrens
        .filter(children => children.videoUrl)
        .map(children => (
          <video
            key={children.id}
            preload='auto'
            className={styles.childrenVideo}
            src={children.videoUrl}
          />
        ))}
      {scene.videoUrl && (
        <video
          className={styles.video}
          autoPlay={true}
          onTimeUpdate={event => {
            setTime(event.currentTarget.currentTime)
          }}
          onLoadedMetadata={event => {
            setSceneDuration(event.currentTarget.duration)
          }}
          onEnded={endHandler}
          controls
          src={scene.videoUrl}
        />
      )}
      {sceneDuration > 0 &&
        time > 0 &&
        (ended || sceneDuration - time <= timeLeftForShowButtons) &&
        childrens.length > 1 && (
          <div className={styles.choice}>
            <div className={styles.question}>{scene.question ?? 'Что ты выберешь?'}</div>
            <div className={styles.buttons}>
              {childrens.map(children => (
                <Button
                  className={styles.videoButton}
                  variant='raised'
                  key={children.id}
                  onClick={() => {
                    setScene(children)

                    ym('hit', `/movie/${movieId}`, {
                      params: {
                        [movieId]: {
                          [scene.id]: {
                            [scene.question ?? 'Что ты выберешь?']: {
                              [children.id]: children.buttonName
                            }
                          }
                        }
                      }
                    })
                  }}
                >
                  {children.buttonName}
                </Button>
              ))}
            </div>
          </div>
        )}
    </div>
  )
}
