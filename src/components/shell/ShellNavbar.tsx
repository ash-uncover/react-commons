import React, { ReactNode } from 'react'

import {
  ClassBuilder,
  Title,
  TitleLevels
} from '../..'

import './ShellNavbar.css'

// ---------------------------------------------------
// Create Component ShellNavbar
// ---------------------------------------------------

interface ShellNavbarProperties {
  className?: string
  style?: React.CSSProperties

  appLogo?: string
  appTitle: string

  children?: ReactNode
}
export const ShellNavbar = ({
  className,
  style,

  appLogo,
  appTitle,

  children,
}: ShellNavbarProperties) => {

  // Hooks //

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-navbar', className])

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div className='ap-shell-navbar--left'>
        {appLogo ? (
          <span>LOGO</span>
        ) : null}

        <Title
          className='ap-shell-navbar__title'
          level={TitleLevels.H3}
        >
          {appTitle}
        </Title>
      </div>

      <div className='ap-shell-navbar--right'>
        {children}
      </div>
    </div>
  )
}