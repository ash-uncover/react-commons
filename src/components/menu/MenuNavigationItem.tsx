import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './MenuNavigationItem.css'

// #region Declaration
export interface MenuNavigationItemProperties {
  className?: string
  name?: string
  description?: string
  icon?: IconProp
  selected?: boolean
  onClick: () => void
}
// #endregion

// #region Component
export const MenuNavigationItem = ({
  className,
  name,
  description,
  icon,
  selected,
  onClick
}: MenuNavigationItemProperties) => {

  // #region Hooks
  // #endregion

  // #region > Events
  function handleClick() {
    onClick()
  }
  // #endregion

  // #region > Render
  const classes = new ClassBuilder(['ap-menu-navigation-item', className])
  if (selected) classes.add('ap-menu-navigation-item--selected')
  return (
    <li
      className={classes.className}
      title={description}
      onClick={handleClick}
    >
      {icon
        ? <FontAwesomeIcon
          className='ap-menu-navigation-item__icon'
          icon={icon}
        />
        : null}
      <div className='ap-menu-navigation-item__text'>
        {name}
      </div>
    </li>
  )
  // #endregion
}
// #endregion
