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
  }, [unit])

  return assetsTreeViewData
}

export default useAssetsTreeViewDataService
