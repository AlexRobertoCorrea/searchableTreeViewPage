import { Dispatch, SetStateAction } from 'react'
import { TypeUnitEnum } from '@/enums/unit.enum'

export interface PropsHeader {
  unit: TypeUnitEnum
  setUnit: Dispatch<SetStateAction<TypeUnitEnum>>
}
