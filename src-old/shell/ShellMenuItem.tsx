import React from 'react'
import { NavLink } from 'react-router'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ClassBuilder } from '../../src/components/ComponentUtil'

import './ShellMenuItem.css'

// ---------------------------------------------------
// Constants
// ---------------------------------------------------

// ---------------------------------------------------
// Create Component
// ---------------------------------------------------

interface ShellMenuItemProperties {
  className?: string
  style?: React.CSSProperties

  expanded?: boolean
  icon?: IconProp
  selected?: boolean
  text: string
  to: string
}
export const ShellMenuItem = ({
  className,
  style,

  expanded,
  icon,
  selected,
  text,
  to,
}: ShellMenuItemProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-shell-menu-item', className])

  if (expanded) {
    classes.add('ap-shell-menu-item--expanded')
  } else {
    classes.add('ap-shell-menu-item--collapsed')
  }
  if (selected) {
    classes.add('ap-shell-menu-item--selected')
  }

  return (
    <NavLink
      className={classes.className}
      style={style}
      to={to}
    >
      <span className='ap-shell-menu-item__icon'>
        {icon ? (
          <FontAwesomeIcon
            icon={icon}
          />
        ) : null}
      </span>

      <span className='ap-shell-menu-item__text'>
        {text}
      </span>
    </NavLink>
  )
}
