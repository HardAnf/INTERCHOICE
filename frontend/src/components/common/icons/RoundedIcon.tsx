import * as React from 'react'
import styles from './styles.styl'

export enum IconType {
  EDIT = 'edit.png',
  DELETE = 'delete.png'
}

export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
  type: IconType
}

export const RoundedIcon: React.FC<IconProps> = props => {
  return (
    <div className={styles.roundedIcon} {...props}>
      <img className={styles.img} src={`/icons/${props.type}`} />
    </div>
  )
}
