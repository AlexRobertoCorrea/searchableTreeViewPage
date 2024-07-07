import { useEffect, useState } from 'react'

import { TypeUnitEnum } from '@/enums/unit.enum'
import { getCompanies, getLocations, getAssets } from '@/services/assets'
import { getTreeViewData } from '@/utils/dashboard'

const useAssetsTreeViewDataService = (unit: TypeUnitEnum) => {
  const [assetsTreeViewData, useAssetsTreeViewData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getCompanies()

      const companyData = companies.find(
        (company) => company.name.toLowerCase() === unit?.toLowerCase()
      )

      if (companyData) {
        const locations = await getLocations(companyData.id)
        const assets = await getAssets(companyData.id)

        useAssetsTreeViewData(getTreeViewData(locations, assets))
      }
    }

    if (!assetsTreeViewData.length) {
      fetchData()
    }

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

    // useAssetsTreeViewData(mock)
  }, [unit])

  return assetsTreeViewData
}

export default useAssetsTreeViewDataService
