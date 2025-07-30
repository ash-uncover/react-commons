import React, { ReactNode } from 'react'

import {
  ClassBuilder,
  ShellElement,
} from '../..'

import './ShellArea.css'

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellAreaProperties {
  className?: string
  style?: React.CSSProperties

  children: ReactNode
}
export const ShellArea = ({
  className,
  style,

  children
}: ShellAreaProperties) => {

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-area', className])

  return (
    <ShellElement
      className={classes.className}
      style={style}
    >
      {children}
    </ShellElement>
  )
}