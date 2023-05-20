import * as React from 'react'
import { default as CoreTextField, TextFieldProps } from '@material-ui/core/TextField'
import { FieldMetaState } from 'react-final-form'
import InputMask from 'react-input-mask'
import styles from './styles.styl'

export type FormInputProps<FieldValue = string> = TextFieldProps & {
  meta?: FieldMetaState<FieldValue>
  defaultValue?: string
  onValueChange?(value: string): void
}

export function FormInput<FieldValue = string>(props: FormInputProps<FieldValue>): JSX.Element {
  const { onValueChange, ...fieldProps } = props
  const { onChange, onBlur, onFocus, value, ...inputProps } = fieldProps
  const invalid: Boolean = Boolean(props.meta?.touched && props.meta.invalid)

  let type = props.type
  let mask = ''

  if (type === 'date') {
    type = 'text'
    mask = '99.99.9999'
  }

  if (type === 'tel') {
    mask = '+7 (999) 999 99-99'
  }

  const onChangeFinal = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(event)
    if (onValueChange) onValueChange(event.currentTarget.value)
  }

  const input = (
    <CoreTextField
      {...(mask ? inputProps : fieldProps)}
      type={type}
      variant='outlined'
      inputProps={{
        className: 'browser-default'
      }}
      InputProps={{
        classes: {
          root: styles.field,
          input: styles.input,
          focused: styles.focused
        }
      }}
      InputLabelProps={{
        classes: {
          root: styles.label,
          focused: styles.focusedLabel
        }
      }}
      classes={{
        root: styles.root
      }}
      className={[styles.fieldContainer, invalid ? styles.dirty : undefined].join(' ')}
      onChange={mask ? undefined : onChangeFinal}
    />
  )

  return (
    <div className={styles.container}>
      {mask && (
        <InputMask
          onChange={onChangeFinal}
          onFocus={onFocus}
          onBlur={onBlur}
          value={String(value)}
          mask={mask}
        >
          {() => input}
        </InputMask>
      )}
      {!mask && input}

      {invalid && <div className={styles.error}>{props.meta?.error}</div>}
    </div>
  )
}
