import React from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './PanelFooter.css'

// #region Declaration
interface PanelFooterProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const PanelFooter = ({
  className,
  style,

  children,
}: PanelFooterProperties) => {

  // #region > Hooks
  // #endregion

  // #region > Events
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-panel-footer', className])

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
