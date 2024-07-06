import { ChangeEventHandler } from 'react'

export interface PropsInput {
  onChange: ChangeEventHandler<HTMLInputElement>
  placeholder: string
  positionIcon: string
}
