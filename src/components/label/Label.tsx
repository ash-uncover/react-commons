import React, { ReactNode } from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './Label.css'

// #region Declaration
interface LabelProperties {
  className?: string
  style?: React.CSSProperties

  text?: string

  children?: ReactNode
}
// #endregion

// #region Component
export const Label = ({
  className,
  style,

  text,

  children,
}: LabelProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-label', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children || text}
    </div>
  )
  // #endregion
}
// #endregion