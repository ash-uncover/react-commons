import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface AppNode {
  name: string
  path: string
  description?: string
  icon?: IconProp
  component?: React.ComponentType
  confirmBack?: boolean
  items?: AppNode[]
}
