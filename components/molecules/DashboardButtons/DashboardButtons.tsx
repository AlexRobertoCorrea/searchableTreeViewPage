import React from 'react'
import classNames from 'classnames'

import Button from '@/components/atoms/Button/Button'
import { Icons } from '@/components/atoms/Icons/Icons'
import { SENSOR_TYPES } from '@/constants/units'
import { PropsDashboardButtons } from './types'
import styles from './DashboardButtons.module.scss'

const DashboardButtons: React.FC<PropsDashboardButtons> = ({
  updateSensor,
  energySelected,
  vibrationSelected,
}) => {
  return (
    <div className={styles['dashboard-buttons']}>
      <Button
        className={classNames(styles['dashboard-buttons__button'], {
          [styles['dashboard-buttons__button--clicked']]: energySelected,
        })}
        id={SENSOR_TYPES.energy}
        onClick={updateSensor}
      >
        <Icons.energyIcon />
        <span>{'Sensor de Energia'}</span>
      </Button>
      <Button
        className={classNames(styles['dashboard-buttons__button'], {
          [styles['dashboard-buttons__button--clicked']]: vibrationSelected,
        })}
        id={SENSOR_TYPES.vibration}
        onClick={updateSensor}
      >
        <Icons.vibrationIcon />
        <span>{'Crítico'}</span>
      </Button>
    </div>
  )
}

export default DashboardButtons
