import React, { ReactNode } from 'react'
//
import {
  useClasseName,
  useClasses
} from '../..'
// CSS
import './Label.css'

// #region Declaration
interface LabelProperties {
  className?: string
  preferSpan?: boolean
  style?: React.CSSProperties

  text?: string

  children?: ReactNode
}
// #endregion

// #region Component
export const Label = ({
  className,
  preferSpan,
  style,

  text,

  children,
}: LabelProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-label'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  if (preferSpan) {
    return (
      <span
        className={classes}
        style={style}
      >
        {children || text}
      </span>
    )
  }
  return (
    <div
      className={classes}
      style={style}
    >
      {children || text}
    </div>
  )
  // #endregion
}
// #endregion