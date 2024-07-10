const isLocation = (leaf: any) => typeof leaf.sensorType === 'undefined'

const isAssets = (leaf: any) => leaf.sensorType === null

const isComponent = (leaf: any) => !leaf.children && leaf.sensorType

const isOperatingStatus = (leaf: any) => leaf.status === 'operating'

const isAlertStatus = (leaf: any) => leaf.status === 'alert'

const isVibration = (leaf: any) => leaf.sensorType === 'vibration'

const isEnergy = (leaf: any) => leaf.sensorType === 'energy'

const isComponentSelected = (leaf: any, component: any) =>
  leaf?.id === component?.id

export {
  isLocation,
  isAssets,
  isComponent,
  isOperatingStatus,
  isAlertStatus,
  isVibration,
  isEnergy,
  isComponentSelected,
}
