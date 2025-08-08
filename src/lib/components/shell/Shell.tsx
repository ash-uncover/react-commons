import React from 'react'
//
import {
  ShellContainer,
  useClasseName,
  useClasses
} from '../..'
// CSS
import './Shell.css'

// #region Declaration
export interface ShellProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
}
// #endregion

// #region Component
export const Shell = ({
  className,
  style,

  children
}: ShellProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-shell'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region > Render
  return (
    <ShellContainer
      className={classes}
      level={0}
      style={style}
    >
      {children}
    </ShellContainer>
  )
  // #endregion
}
// #endregion
