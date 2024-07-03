import React from 'react'
import Image from 'next/image'

import { PropsImage } from './types'

const CustomImage: React.FC<PropsImage> = ({ src, alt, width, height }) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading='lazy'
  />
)

export default CustomImage
