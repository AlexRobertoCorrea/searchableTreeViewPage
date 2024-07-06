import { MouseEventHandler } from 'react'

export interface PropsDashboardButtons {
  updateSensor: MouseEventHandler<HTMLButtonElement>
  energySelected: boolean
  vibrationSelected: boolean
}
