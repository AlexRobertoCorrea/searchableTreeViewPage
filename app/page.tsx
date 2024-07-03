'use client'

import React, { useState } from 'react'

import Header from '@/components/organisms/Header/Header'
import { TypeUnitEnum } from '@/enums/unit.enum'

export default function Page() {
  const [unit, setUnit] = useState<TypeUnitEnum>(null)

  return (
    <Header unit={unit} setUnit={setUnit} />
  )
}