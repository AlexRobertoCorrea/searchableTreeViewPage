import React, { useState, useEffect } from 'react'

import Input from '@/components/atoms/Input/Input'
import DashboardButtons from '@/components/molecules/DashboardButtons/DashboardButtons'
import TreeView from '@/components/organisms/TreeView/TreeView'
import ComponentDetail from '@/components/organisms/ComponentDetail/ComponentDetail'
import useMediaQuery from '@/hooks/useMediaQuery'
import { VIEWPORTS } from '@/constants/breakpoints'
import { SENSOR_TYPES } from '@/constants/units'
import { POSITION_ICON } from '@/components/atoms/Input/Input'
import { getTreeViewData, filterBy, getUnitName } from '@/utils/dashboard'
import { getCompanies, getLocations, getAssets } from '@/services/assets'
import { PropsDashboard } from './types'

import styles from './Dashboard.module.scss'

const Dashboard: React.FC<PropsDashboard> = ({ unit }) => {
  const viewport = useMediaQuery()
  const [isMobile, setIsMobile] = useState(true)
  const [component, setComponent] = useState({})
  const [treeViewData, setTreeViewData] = useState([])
  const [energySelected, setEnergySelected] = useState(false)
  const [vibrationSelected, setVibrationSelected] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onQueryChange = (event) => {
    setTreeViewData(filterBy(treeViewData, event.target.value))
  }

  const updateSensor = (event) => {
    if (event.currentTarget.id === SENSOR_TYPES.energy) {
      setEnergySelected(!energySelected)
    } else {
      setVibrationSelected(!vibrationSelected)
    }
  }

  useEffect(() => {
    setIsMobile(viewport === VIEWPORTS.MOBILE)

    const fetchData = async () => {
      setIsLoading(true)

      const companies = await getCompanies()

      const companyData = companies.find(
        (company) => company.name.toLowerCase() === unit?.toLowerCase()
      )

      if (companyData) {
        const locations = await getLocations(companyData.id)
        const assets = await getAssets(companyData.id)

        setTreeViewData(getTreeViewData(locations, assets))

        setIsLoading(false)
      }
    }

    fetchData()

    // const mock = [
    //   {
    //     "id": "65674204664c41001e91ecb4",
    //     "name": "PRODUCTION AREA - RAW MATERIAL",
    //     "parentId": null,
    //     children: [{
    //       "id": "656a07b3f2d4a1001e2144bf",
    //       "name": "CHARCOAL STORAGE SECTOR",
    //       "parentId": "65674204664c41001e91ecb4",
    //       children: [{
    //         "id": "656734821f4664001f296973",
    //         "name": "Fan - External",
    //         "parentId": null,
    //         "sensorId": "MTC052",
    //         "sensorType": null,
    //         "status": "operating",
    //         "gatewayId": "QHI640",
    //         "locationId": null,
    //         children: [{
    //           "id": "656a07cdc50ec9001e84167b",
    //           "name": "MOTOR RT COAL AF01",
    //           "parentId": "656a07c3f2d4a1001e2144c5",
    //           "sensorId": "FIJ309",
    //           "sensorType": "energy",
    //           "status": "operating",
    //           "gatewayId": "FRH546",
    //           children: null
    //         }]
    //       }]
    //     }]
    //   },
    //   {
    //     "id": "65674204664c41001e91ecb4",
    //     "name": "PRODUCTION AREA - RAW MATERIAL",
    //     "parentId": null,
    //     children: [{
    //       "id": "656a07b3f2d4a1001e2144bf",
    //       "name": "CHARCOAL STORAGE SECTOR",
    //       "parentId": "65674204664c41001e91ecb4",
    //       children: [{
    //         "id": "656734821f4664001f296973",
    //         "name": "Fan - External",
    //         "parentId": null,
    //         "sensorId": "MTC052",
    //         "sensorType": "energy",
    //         "status": "operating",
    //         "gatewayId": "QHI640",
    //         "locationId": null,
    //         children: [{
    //           "id": "656a07cdc50ec9001e84167b",
    //           "name": "MOTOR RT COAL AF01",
    //           "parentId": "656a07c3f2d4a1001e2144c5",
    //           "sensorId": "FIJ309",
    //           "sensorType": "vibration",
    //           "status": "alert",
    //           "gatewayId": "FRH546",
    //           children: null
    //         }]
    //       }]
    //     }]
    //   },
    // ]

    // setTreeViewData(mock)
  }, [viewport])

  return (
    <>
      {isLoading && (
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
            <ComponentDetail component={component} />
          </div>
        </div>
      )}
    </>
  )
}

export default Dashboard
