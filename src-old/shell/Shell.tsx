import React, { ReactNode } from 'react'

import { ClassBuilder } from '../../src/components/ComponentUtil'

import './Shell.css'

// ---------------------------------------------------
// Create Component Shell
// ---------------------------------------------------

interface ShellProperties {
  className?: string
  style?: React.CSSProperties

  children: ReactNode
}
export const Shell = ({
  className,
  style,

  children
}: ShellProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['ap-shell', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
}