import classNames from 'classnames'
import * as React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styles from './styles.styl'

interface ComponentPropsType {
  link: string
}

export const MenuItem: React.FC<ComponentPropsType> = props => {
  const location = useLocation().pathname
  return (
    <li className='menu-item nav-item'>
      <NavLink
        className={classNames(styles.navLink, location == props.link ? styles.active : '')}
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  )
}
