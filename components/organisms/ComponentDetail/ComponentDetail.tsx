import React from 'react'
import classNames from 'classnames'

import { Icons } from '@/components/atoms/Icons/Icons'
import { PropsComponentDetail } from './types'
import {
  isOperatingStatus,
  isAlertStatus,
  isVibration,
} from '@/utils/componentAnalyser'

import styles from './ComponentDetail.module.scss'

const ComponentDetail: React.FC<PropsComponentDetail> = ({ component }) => {
  if (!Object.keys(component).length) {
    return null
  }

  return (
    <div className={styles['component-detail']}>
      <div className={styles['component-detail__title-block']}>
        <h3 className={styles['component-detail__title']}>{component.name}</h3>
        {
          <span
            className={classNames({
              [styles['component-detail__status-icon--operating']]:
                isOperatingStatus(component),
              [styles['component-detail__status-icon--alert']]:
                isAlertStatus(component),
            })}
          >
            {isVibration(component) ? (
              <Icons.treeViewVibrationIcon />
            ) : (
              <Icons.treeViewEnergyIcon />
            )}
          </span>
        }
      </div>
      <div className={styles['component-detail__asset-block']}>
        <div className={styles['component-detail__upload-image']}>
          <Icons.assetDetailIcon />
          <p className={styles['component-detail__upload-image-text']}>
            {'Adicionar imagem do Ativo'}
          </p>
        </div>
        <div className={styles['component-detail__description-container']}>
          <h5 className={styles['component-detail__title']}>
            {'Tipo de Equipamento'}
          </h5>
          <p className={styles['component-detail__description']}>
            {'Motor Elétrico (Trifásico)'}
          </p>
          <div className={styles['component-detail__border']} />
          <h5 className={styles['component-detail__title']}>
            {'Responsáveis'}
          </h5>
          {isVibration(component) ? (
            <div className={styles['component-detail__description-block']}>
              <div className={styles['component-detail__description-ellipse']}>
                M
              </div>
              <p className={styles['component-detail__description']}>
                {'Mecânica'}
              </p>
            </div>
          ) : (
            <div className={styles['component-detail__description-block']}>
              <div className={styles['component-detail__description-ellipse']}>
                E
              </div>
              <p className={styles['component-detail__description']}>
                {'Elétrica'}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className={styles['component-detail__sensor-receiver']}>
        <div className={styles['component-detail__border']} />
        <div className={styles['component-detail__sensor-receiver-container']}>
          <div className={styles['component-detail__sensor-receiver-detail']}>
            <h5 className={styles['component-detail__title']}>{'Sensor'}</h5>
            <span className={styles['component-detail__sensor-receiver-data']}>
              <Icons.sensorIcon />
              <p className={styles['component-detail__description']}>
                {component.sensorId}
              </p>
            </span>
          </div>
          <div className={styles['component-detail__sensor-receiver-detail']}>
            <h5 className={styles['component-detail__title']}>{'Receptor'}</h5>
            <span className={styles['component-detail__sensor-receiver-data']}>
              <Icons.receiverIcon />
              <p className={styles['component-detail__description']}>
                {component.gatewayId}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComponentDetail
