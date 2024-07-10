import { UNITS } from '@/constants/units'
import { TypeUnitEnum } from '@/enums/unit.enum'

const getChildren = (id: any, list: any) => {
  const children = list.filter(
    (dataList: any) => dataList.parentId === id || dataList.locationId === id
  )

  if (!children.length) {
    return null
  }

  return children.map((node: any) => {
    node.children = getChildren(node.id, list)

    return node
  })
}

const getChildrenAssets = (nodes: any, list: any) => {
  if (!nodes) {
    return null
  }

  return nodes.map((node: any) => {
    if (Array.isArray(node?.children)) {
      node.children = getChildrenAssets(node.children, list)

      return node
    }

    node.children = getChildren(node.id, list)

    return node
  })
}

const getTreeViewData = (locations: any, assets: any) => {
  const roots = locations.filter((location: any) => !location.parentId)

  const locationsData = roots.map((root: any) => {
    root.children = getChildren(root.id, locations)

    return root
  })

  return locationsData.map((locationData: any) => {
    locationData.children = getChildrenAssets(locationData.children, assets)

    return locationData
  })
}

const filterByQuery = (arr: any, query: any) => {
  return query
    ? arr.reduce((acc: any, item: any) => {
        if (item.children?.length) {
          const filtered = filterByQuery(item.children, query)

          if (filtered.length) {
            return [...acc, { ...item, children: filtered }]
          }
        }

        const { ...itemWithoutChildren } = item

        return item.name?.toLowerCase().includes(query.toLowerCase())
          ? [...acc, itemWithoutChildren]
          : acc
      }, [])
    : arr
}

const filterBySensor = (
  arr: any,
  vibrationSelected: any,
  energySelected: any
) => {
  if (vibrationSelected === energySelected) {
    return arr
  }

  return arr.reduce((acc: any, item: any) => {
    if (item.children?.length) {
      const filtered = filterBySensor(
        item.children,
        vibrationSelected,
        energySelected
      )

      if (filtered.length) {
        return [...acc, { ...item, children: filtered }]
      }
    }

    const { ...itemWithoutChildren } = item

    return (vibrationSelected && item.sensorType === 'vibration') ||
      (energySelected && item.sensorType === 'energy')
      ? [...acc, itemWithoutChildren]
      : acc
  }, [])
}

const getUnitName = (unit: TypeUnitEnum) => {
  if (unit === UNITS.APEX) {
    return 'Apex Unit'
  } else if (unit === UNITS.TOBIAS) {
    return 'Tobias Unit'
  } else {
    return 'Jaguar Unit'
  }
}

export {
  getChildren,
  getChildrenAssets,
  getTreeViewData,
  filterByQuery,
  filterBySensor,
  getUnitName,
}
