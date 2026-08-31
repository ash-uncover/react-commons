import React from 'react'
//
import { useClasseName, useClasses } from '../..'
import { AppNode } from './AppNode'
import { AppMenuNode } from './AppMenuNode'
import { resolveApp } from './AppUtils'
// CSS
import './AppMenu.css'

// #region Declaration
export interface AppMenuProperties {
  className?: string
  style?: React.CSSProperties

  node: AppNode
}
// #endregion

// #region Component
export const AppMenu = ({
  className,
  style,

  node,
}: AppMenuProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-app-menu'])
  useClasseName(classBuilder, className)

  const nodeDefs = React.useMemo(() => resolveApp(node), [node])
  const rootDef = nodeDefs[0]
  // #endregion

  // #region > Render
  if (!rootDef) {
    return null
  }

  return (
    <div className={classes} style={style}>
      {rootDef.items.map(child => <AppMenuNode key={child.path} def={child} />)}
    </div>
  )
  // #endregion
}
// #endregion
