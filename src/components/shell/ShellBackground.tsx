import React, { ReactNode } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './ShellBackground.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellBackgroundProperties {
  className?: string
  style?: React.CSSProperties

  children: ReactNode
}
export const ShellBackground = ({
  className,
  style,

  children
}: ShellBackgroundProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-background', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}