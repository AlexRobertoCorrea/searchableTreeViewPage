import { Dispatch, SetStateAction } from 'react'

import { PropsComponent } from '@/interfaces/component'

export interface PropsTreeView {
  treeViewData: any
  setComponent: Dispatch<SetStateAction<object>>
  component: PropsComponent
}
