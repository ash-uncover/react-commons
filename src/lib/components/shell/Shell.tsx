import React from 'react'
//
import {
  ShellContainer,
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
  const { classes } = useClasses(['ap-shell', className])
  // #endregion

  // #region > Render
  return (
    <ShellContainer
      className={classes}
      root={true}
      style={style}
    >
      {children}
    </ShellContainer>
  )
  // #endregion
}
// #endregion
