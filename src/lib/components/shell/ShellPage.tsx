import React from 'react'
//
import {
  ShellContainer,
  useClasses
} from '../..'
// CSS
import './ShellPage.css'

// #region Declaration
export interface ShellPageProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties

  level?: number
}
// #endregion

// #region Component
export const ShellPage = ({
  className,
  style,

  level,
  
  children
}: ShellPageProperties) => {

  // #region > Hooks
  const { classes } = useClasses(['ap-shell-page', className])
  // #endregion

  // #region > Render
  return (
    <ShellContainer
      className={classes}
      style={style}
      level={level}
    >
      {children}
    </ShellContainer>
  )
  // #endregion
}
// #endregion
