import React from 'react'

import { PropsSvg } from './types'

import LogoTractian from '@/images/logo-tractian.svg'

export const Logo: React.FC<PropsSvg> = ({ className }) => (
  <LogoTractian className={className} />
)
