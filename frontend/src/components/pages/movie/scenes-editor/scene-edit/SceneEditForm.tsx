import * as React from 'react'
import { Field, Form } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { Button, Checkbox, FormControlLabel, Switch } from '@material-ui/core'
import styles from './styles.styl'
import { ProjectSceneData } from 'root/shared/projects'
import { useAppSelector } from 'root/store/application.store'
import {
  setEditedScene,
  updateScene,
  uploadSceneVideo
} from 'root/store/movie/project/project.actions'
import { FormInput } from 'components/common/fields/form-input/FormInput'
import { FileInput } from 'components/common/fields/file-input/FileInput'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'

export const SceneEditForm: React.FC = () => {
  const scene = useAppSelector(state => state.project.editedScene)
  const dispatch = useDispatch()

  const videoLoading = useAppSelector(state => state.project.uploadVideoPending)

  const initialValues = useMemo(() => scene, [scene?.id])

  if (!scene || !initialValues) return <></>

  return (
    <div className={styles.container}>
      <div className={styles.closeButton} onClick={() => dispatch(setEditedScene.request(null))}>
        <svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1.2721 1.06072C1.85789 0.474935 2.77111 0.438406 3.31183 0.979132L26.8095 24.4768C27.3503 25.0176 27.3137 25.9308 26.7279 26.5166C26.1422 27.1024 25.2289 27.1389 24.6882 26.5982L1.19051 3.10045C0.649788 2.55973 0.686317 1.64651 1.2721 1.06072Z'
            fill='white'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1.27209 26.5165C0.686299 25.9307 0.649771 25.0175 1.1905 24.4768L24.6882 0.979099C25.2289 0.438371 26.1421 0.474901 26.7279 1.06069C27.3137 1.64647 27.3502 2.55969 26.8095 3.10042L3.31182 26.5981C2.77109 27.1388 1.85787 27.1023 1.27209 26.5165Z'
            fill='white'
          />
        </svg>
      </div>

      <div className={styles.fields}>
        <Form<ProjectSceneData>
          initialValues={initialValues}
          onSubmit={data => {
            dispatch(updateScene.request(data))
          }}
        >
          {props => (
            <form onSubmit={props.handleSubmit}>
              <Field name='name'>
                {props => (
                  <FormInput
                    placeholder='Введите название сцены'
                    label='Название'
                    {...props.input}
                  />
                )}
              </Field>
              <Field name='description'>
                {props => (
                  <FormInput
                    placeholder='Введите описание сцены'
                    label='Описание'
                    multiline={true}
                    rows={7}
                    {...props.input}
                  />
                )}
              </Field>
              <Field name='buttonName'>
                {props => (
                  <FormInput
                    placeholder='Введите название кнопки'
                    label='Название кнопки'
                    {...props.input}
                  />
                )}
              </Field>
              <Field name='question'>
                {props => (
                  <FormInput
                    placeholder='Введите вопрос'
                    label='Вопрос для выбора'
                    {...props.input}
                  />
                )}
              </Field>
              <div>
                <Field name='isBeginning' type='checkbox'>
                  {props => (
                    <FormControlLabel
                      className={styles.switchFormControl}
                      classes={{ label: styles.switchLabel }}
                      control={
                        <Switch
                          id='beginning-switch'
                          name={props.input.name}
                          onChange={props.input.onChange}
                          checked={Boolean(props.input.checked)}
                        />
                      }
                      label='Начало фильма'
                    />
                  )}
                </Field>
              </div>
              <GradientButton type='submit' variant='raised'>
                Сохранить изменения
              </GradientButton>
            </form>
          )}
        </Form>
      </div>
      <div>
        {scene.videoUrl && <video className={styles.video} controls src={scene.videoUrl} />}
        <FileInput
          disabled={videoLoading}
          accept='video/mp4,video/x-m4v,video/*'
          className={styles.fileInput}
          onChoose={value => {
            if (value) dispatch(uploadSceneVideo.request({ video: value, sceneId: scene.id }))
          }}
          label={scene.videoUrl ? 'Изменить видео' : 'Загрузить видео'}
        />
      </div>
    </div>
  )
}
