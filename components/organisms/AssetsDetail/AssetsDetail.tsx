import React from 'react'

import { PropsAssetsDetail } from './types'

const AssetsDetail: React.FC<PropsAssetsDetail> = ({ component }) => (
  <div>{JSON.stringify(component)}</div>
)

export default AssetsDetail
