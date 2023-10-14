import React, { ReactNode } from 'react'

import { ClassBuilder } from '../ComponentUtil'

import './ShellElement.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellElementProperties {
  className?: string
  style?: React.CSSProperties

  children: ReactNode
}
export const ShellElement = ({
  className,
  style,

  children
}: ShellElementProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-element', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}