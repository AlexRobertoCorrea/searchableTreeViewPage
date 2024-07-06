import { UNITS } from '@/constants/units'

const getChildren = (id, list) => {
  const children = list.filter(
    (dataList) => dataList.parentId === id || dataList.locationId === id
  )

  if (!children.length) {
    return null
  }

  return children.map((node) => {
    node.children = getChildren(node.id, list)

    return node
  })
}

const getChildrenAssets = (nodes, list) => {
  if (!nodes) {
    return null
  }

  return nodes.map((node) => {
    if (Array.isArray(node?.children)) {
      node.children = getChildrenAssets(node.children, list)

      return node
    }

    node.children = getChildren(node.id, list)

    return node
  })
}

const getTreeViewData = (locations, assets) => {
  const roots = locations.filter((location) => !location.parentId)

  const locationsData = roots.map((root) => {
    root.children = getChildren(root.id, locations)

    return root
  })

  return locationsData.map((locationData) => {
    locationData.children = getChildrenAssets(locationData.children, assets)

    return locationData
  })
}

const filterBy = (arr, query) => {
  return query
    ? arr.reduce((acc, item) => {
        if (item.children?.length) {
          const filtered = filterBy(item.children, query)

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

const getUnitName = (unit: string) => {
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
  filterBy,
  getUnitName,
}
