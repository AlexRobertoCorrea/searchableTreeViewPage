import { ReactNode, MouseEventHandler } from 'react'

export interface PropsButton {
  children: ReactNode,
  className?: string,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  id?: string,
}