import React, { useState, useEffect } from 'react'

import Input from '@/components/atoms/Input/Input'
import DashboardButtons from '@/components/molecules/DashboardButtons/DashboardButtons'
import TreeView from '@/components/organisms/TreeView/TreeView'
import ComponentDetail from '@/components/organisms/ComponentDetail/ComponentDetail'
import useMediaQuery from '@/hooks/useMediaQuery'
import useAssetsTreeViewDataService from '@/hooks/useAssetsTreeViewData'
import { VIEWPORTS } from '@/constants/breakpoints'
import { SENSOR_TYPES } from '@/constants/units'
import { POSITION_ICON } from '@/components/atoms/Input/Input'
import { filterByQuery, filterBySensor, getUnitName } from '@/utils/dashboard'
import { PropsDashboard } from './types'

import styles from './Dashboard.module.scss'

const Dashboard: React.FC<PropsDashboard> = ({ unit }) => {
  const viewport = useMediaQuery()
  const assetsTreeViewData = useAssetsTreeViewDataService(unit)
  const [isMobile, setIsMobile] = useState(true)
  const [isTablet, setIsTablet] = useState(false)
  const [component, setComponent] = useState({})
  const [treeViewData, setTreeViewData] = useState([])
  const [energySelected, setEnergySelected] = useState(false)
  const [vibrationSelected, setVibrationSelected] = useState(false)
  const isLoading = Boolean(!assetsTreeViewData.length)

  const onQueryChange = (event) => {
    setTreeViewData(filterByQuery(assetsTreeViewData, event.target.value))
  }

  const updateSensor = (event) => {
    if (event.currentTarget.id === SENSOR_TYPES.energy) {
      setEnergySelected(!energySelected)
    } else {
      setVibrationSelected(!vibrationSelected)
    }
  }

  useEffect(() => {
    setTreeViewData(assetsTreeViewData)
  }, [assetsTreeViewData])

  useEffect(() => {
    setIsMobile(viewport === VIEWPORTS.MOBILE)
    setIsTablet(viewport === VIEWPORTS.TABLET)
  }, [viewport])

  useEffect(() => {
    setTreeViewData(
      filterBySensor(assetsTreeViewData, vibrationSelected, energySelected)
    )
  }, [vibrationSelected, energySelected])

  return (
    <>
      {isLoading && !isMobile && (
        <h1 className={styles['dashboard__loading']}>
          {'Carregando dados. Esse processo pode demorar um pouco...'}
        </h1>
      )}
      {!isLoading && isMobile && unit && (
        <div className={styles['dashboard']}>
          <div className={styles['dashboard__search-container']}>
            <Input
              placeholder="Buscar Ativo ou Local"
              onChange={onQueryChange}
              positionIcon={POSITION_ICON.LEFT}
            />
            <DashboardButtons
              updateSensor={updateSensor}
              energySelected={energySelected}
              vibrationSelected={vibrationSelected}
            />
          </div>
          <div className={styles['dashboard__border']} />
          <TreeView
            treeViewData={treeViewData}
            setComponent={setComponent}
            component={component}
          />
        </div>
      )}
      {!isLoading && !isMobile && (
        <div className={styles['dashboard']}>
          <div className={styles['dashboard__search-container']}>
            <div className={styles['dashboard__title-container']}>
              <h1 className={styles['dashboard__title']}>{'Ativos'}</h1>
              <span className={styles['dashboard__unit-name']}>{'/'}</span>
              <p className={styles['dashboard__unit-name']}>
                {getUnitName(unit)}
              </p>
            </div>
            <DashboardButtons
              updateSensor={updateSensor}
              energySelected={energySelected}
              vibrationSelected={vibrationSelected}
            />
          </div>
          <div className={styles['dashboard__result']}>
            <div className={styles['dashboard__result-tree-view']}>
              <Input
                placeholder="Buscar Ativo ou Local"
                onChange={onQueryChange}
                positionIcon={POSITION_ICON.RIGHT}
              />
              <TreeView
                treeViewData={treeViewData}
                setComponent={setComponent}
                component={component}
              />
            </div>
            { !isTablet && <ComponentDetail component={component} />}            
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
