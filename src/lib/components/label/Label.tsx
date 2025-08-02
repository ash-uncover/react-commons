import React, { ReactNode } from 'react'
//
import { 
  useClasses 
} from '../..'
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

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-label', className])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
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