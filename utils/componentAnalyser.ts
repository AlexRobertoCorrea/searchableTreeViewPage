const isLocation = (leaf) => typeof leaf.sensorType === 'undefined'

const isAssets = (leaf) => leaf.sensorType === null

const isComponent = (leaf) => !leaf.children && leaf.sensorType

const isOperatingStatus = (leaf) => leaf.status === 'operating'

const isAlertStatus = (leaf) => leaf.status === 'alert'

const isVibration = (leaf) => leaf.sensorType === 'vibration'

const isEnergy = (leaf) => leaf.sensorType === 'energy'

const isComponentSelected = (leaf, component) => leaf?.id === component?.id

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
