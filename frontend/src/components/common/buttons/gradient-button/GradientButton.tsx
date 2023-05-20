import Button, { ButtonProps } from '@material-ui/core/Button'
import * as React from 'react'
import styles from './styles.styl'

export const GradientButton: React.FC<ButtonProps> = props => {
  return (
    <>
      <Button classes={{ root: styles.button }} {...props} />
    </>
  )
}
