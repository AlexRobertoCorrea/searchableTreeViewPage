'use client'

import React, { useEffect, useState, MouseEvent } from 'react'
import classNames from 'classnames'

import Button from '@/components/atoms/Button/Button'
import { Icons } from '@/components/atoms/Icons/Icons'
import useMediaQuery from '@/hooks/useMediaQuery'
import { VIEWPORTS } from '@/constants/breakpoints'
import { UNITS } from '@/constants/units'
import { PropsHeader } from './types'
import { TypeUnitEnum } from '@/enums/unit.enum'

import styles from './Header.module.scss'

const Header: React.FC<PropsHeader> = ({ unit, setUnit }) => {
  const viewport = useMediaQuery()
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const isMobileScreen = viewport === VIEWPORTS.MOBILE
    setIsMobile(isMobileScreen)

    if (!isMobileScreen) {
      setUnit(UNITS.APEX as TypeUnitEnum)
    } else {
      setUnit(null)
    }
  }, [viewport])

  const updateUnit = (event: MouseEvent<HTMLButtonElement>) => {
    setUnit(event?.currentTarget?.id as TypeUnitEnum)
  }

  const resetUnit = () => {
    setUnit(null)
  }

  return (
    <header className={styles['header']}>
      {(!isMobile || (isMobile && !unit)) && (
        <>
          <div className={styles['header__logo-container']}>
            <Icons.logo className={styles['header__logo']} />
          </div>
          <div className={styles['header__buttons-container']}>
            <Button
              className={classNames(styles['header__button'], {
                [styles['header__button--clicked']]: unit === UNITS.APEX,
              })}
              onClick={updateUnit}
              id={UNITS.APEX}
            >
              <Icons.goldIcon />
              <span className={styles['header__label-button']}>
                {'Apex Unit'}
              </span>
            </Button>
            <Button
              className={classNames(styles['header__button'], {
                [styles['header__button--clicked']]: unit === UNITS.TOBIAS,
              })}
              onClick={updateUnit}
              id={UNITS.TOBIAS}
            >
              <Icons.goldIcon />
              <span className={styles['header__label-button']}>
                {'Tobias Unit'}
              </span>
            </Button>
            <Button
              className={classNames(styles['header__button'], {
                [styles['header__button--clicked']]: unit === UNITS.JAGUAR,
              })}
              onClick={updateUnit}
              id={UNITS.JAGUAR}
            >
              <Icons.goldIcon />
              <span className={styles['header__label-button']}>
                {'Jaguar Unit'}
              </span>
            </Button>
          </div>
        </>
      )}
      {isMobile && unit && (
        <div className={styles['header__assets-container']}>
          <Button
            className={styles['header__assets-button']}
            onClick={resetUnit}
          >
            <div className={styles['header__assets-arrow']}>{'<'}</div>
          </Button>
          <h3 className={styles['header__assets-title']}>{'Assets'}</h3>
        </div>
      )}
    </header>
  )
}

export default Header
