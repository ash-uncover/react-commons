import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import {
  useClasses
} from '../..'
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
  const { classBuilder, classes } = useClasses(['ap-menu-navigation-item', className])
  React.useEffect(() => {
    if (selected) {
      classBuilder.add(`ap-menu-navigation-item--selected`)
    }
    return () => {
      classBuilder.remove(`ap-menu-navigation-item--selected`)
    }
  }, [selected])
  // #endregion

  // #region > Events
  function handleClick() {
    onClick()
  }
  // #endregion

  // #region > Render
  return (
    <li
      className={classes}
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
