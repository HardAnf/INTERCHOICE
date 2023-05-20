import * as React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Field, Form } from 'react-final-form'
import { useEffect } from 'react'
import { appRoutes } from 'root/appRoutes'
import { registerUser } from 'root/store/user/user.actions'
import { useAppSelector } from 'root/store/application.store'
import { registerFormDataToResponsePayload } from 'root/store/user/user.serializer'
import { RegisterFormData, registerFormRequiredField } from 'root/store/user/user.types'
import { FormInput } from 'components/common/fields/form-input/FormInput'
import { GradientButton } from 'components/common/buttons/gradient-button/GradientButton'
import { comparePasswords, required } from 'root/helpers/validators'

export const RegPage = (): JSX.Element => {
  const pending = useAppSelector(state => state.user.registerPending)
  const success = useAppSelector(state => state.user.registerSuccess)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (success) {
      history.push(appRoutes.login())
    }
  }, [success])

  return (
    <div className='container'>
      <Form<RegisterFormData>
        validate={values => {
          const errors: Partial<Record<keyof RegisterFormData, React.ReactNode>> = {}
          Object.keys(registerFormRequiredField).map(key => {
            if (registerFormRequiredField[key]) errors[key] = required(values[key])
          })
          if (!errors.confirmPassword)
            errors.confirmPassword = comparePasswords(values.password, values.confirmPassword)

          return errors
        }}
        onSubmit={formData => {
          dispatch(registerUser.request(registerFormDataToResponsePayload(formData)))
        }}
      >
        {props => (
          <form onSubmit={props.handleSubmit}>
            <Field name='firstName'>
              {props => (
                <FormInput
                  placeholder='Введите имя'
                  label='Имя'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='lastName'>
              {props => (
                <FormInput
                  placeholder='Введите фамилию'
                  label='Фамилия'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='birthDate'>
              {props => (
                <FormInput
                  placeholder='Введите дату рождения'
                  label='Дата рождения'
                  type='date'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='country'>
              {props => (
                <FormInput
                  placeholder='Введите название страны'
                  label='Страна'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='email'>
              {props => (
                <FormInput
                  placeholder='Введите E-mail'
                  label='E-mail'
                  type='email'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='tel'>
              {props => (
                <FormInput
                  placeholder='Введите номер телефона'
                  label='Телефон'
                  type='tel'
                  {...props.input}
                  style={{ display: 'none' }}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='password'>
              {props => (
                <FormInput
                  placeholder='Введите пароль'
                  label='Пароль'
                  type='password'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>

            <Field name='confirmPassword'>
              {props => (
                <FormInput
                  placeholder='Повторите пароль'
                  label='Повторите пароль'
                  type='password'
                  {...props.input}
                  meta={props.meta}
                />
              )}
            </Field>
            <GradientButton disabled={pending} type='submit'>
              Регистрация
            </GradientButton>
            <NavLink to={appRoutes.login()} className='other-auth-link'>
              У меня есть аккаунт
            </NavLink>
          </form>
        )}
      </Form>
    </div>
  )
}
