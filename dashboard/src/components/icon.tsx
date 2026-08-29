'use client'

import { HugeiconsIcon } from '@hugeicons/react'
import type { ComponentProps } from 'react'

export function Icon({
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.75,
  ...rest
}: ComponentProps<typeof HugeiconsIcon>) {
  return <HugeiconsIcon size={size} color={color} strokeWidth={strokeWidth} {...rest} />
}
