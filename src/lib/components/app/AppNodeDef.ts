import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface AppNodeDef {
  name: string
  path: string        // full absolute path assembled from ancestor segments
  description?: string
  icon?: IconProp
  component?: React.ComponentType
  confirmBack?: boolean
  parents: AppNodeDef[]
  items: AppNodeDef[]
}
