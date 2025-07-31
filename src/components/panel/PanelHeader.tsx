import React from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './PanelHeader.css'

// #region Declaration
interface PanelHeaderProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const PanelHeader = ({
  className,
  style,

  children,
}: PanelHeaderProperties) => {

  // #region > Hooks
  // #endregion

  // #region > Events
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-panel-header', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
  // #endregion
}
// #endregion
