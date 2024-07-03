'use client'

import React, { useEffect, MouseEvent } from 'react'
import classNames from 'classnames'

import Button from '@/components/atoms/Button/Button'
import { Icons } from '@/components/atoms/Icons/Icons'
import useMediaQuery from '@/hooks/useMediaQuery'
import { VIEWPORTS } from '@/constants/breakpoints'
import { UNITS } from '@/constants/units'
import { PropsHeader } from './types'

import styles from './Header.module.scss'

const Header: React.FC<PropsHeader> = ({ unit, setUnit }) => {
  const viewport = useMediaQuery()

  useEffect(() => {
    const isMobile = viewport === VIEWPORTS.MOBILE

    if (!isMobile) {
      setUnit(UNITS.APEX)
    } else {
      setUnit(null)
    }
  }, [viewport])

  const updateUnit = (event: MouseEvent<HTMLButtonElement>) => {
    setUnit(event.currentTarget.id)
  }

  return (
    <header className={styles['header']}>
      <div className={styles['header__logo-container']}>
        <Icons.logo className={styles['header__logo']} />
      </div>
      <div className={styles['header__buttons-container']}>
        <Button
          className={classNames(styles['header__button'],
             { [styles['header__button--clicked']]: unit === UNITS.APEX })}
          onClick={updateUnit}
          id={UNITS.APEX}
        >
          <Icons.goldIcon />
          <span className={styles['header__label-button']}>{'Apex Unit'}</span>
        </Button>
        <Button
          className={classNames(styles['header__button'],
             { [styles['header__button--clicked']]: unit === UNITS.TOBIAS })}
          onClick={updateUnit}
          id={UNITS.TOBIAS}
        >
          <Icons.goldIcon />
          <span className={styles['header__label-button']}>{'Tobias Unit'}</span>
        </Button>
        <Button
          className={classNames(styles['header__button'],
             { [styles['header__button--clicked']]: unit === UNITS.JAGUAR })}
          onClick={updateUnit}
          id={UNITS.JAGUAR}
        >
          <Icons.goldIcon />
          <span className={styles['header__label-button']}>{'Jaguar Unit'}</span>
        </Button>
      </div>
    </header>
  )
}

export default Header