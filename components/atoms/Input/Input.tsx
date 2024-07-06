import React from 'react'

import { Icons } from '@/components/atoms/Icons/Icons'
import styles from './Input.module.scss'
import { PropsInput } from './types'

export const POSITION_ICON = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

const Button: React.FC<PropsInput> = ({
  onChange,
  placeholder,
  positionIcon = POSITION_ICON.LEFT,
}) => {
  return (
    <div className={styles['input-wrapper']}>
      {positionIcon === POSITION_ICON.LEFT && <Icons.searchIcon />}
      <input
        className={styles['input-wrapper__input']}
        placeholder={placeholder}
        onChange={onChange}
      />
      {positionIcon === POSITION_ICON.RIGHT && <Icons.searchIcon />}
    </div>
  )
}

export default Button
