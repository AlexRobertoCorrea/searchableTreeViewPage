import React from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'
import { PropsButton } from './types'

const Button: React.FC<PropsButton> = ({
  children,
  className,
  onClick,
  id,
}) => {
  const btnClass = classNames(className, styles['button'])

  return (
    <button className={btnClass} onClick={onClick} id={id} data-testid="button">
      {children}
    </button>
  )
}

export default Button
