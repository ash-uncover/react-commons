import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import {
  ShellContainer,
  useClasses
} from '../..'
// CSS
import './MenuNavigationItem.css'

// #region Declaration
export interface MenuNavigationItemProperties {
  className?: string
  style?: React.CSSProperties

  container?: boolean
  description?: string
  icon?: IconProp
  name?: string
  selected?: boolean
  onClick: () => void
}
// #endregion

// #region Component
export const MenuNavigationItem = ({
  className,

  container,
  description,
  icon,
  name,
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
  React.useEffect(() => {
    if (!container) {
      classBuilder.add(`ap-menu-navigation-item--container`)
    }
    return () => {
      classBuilder.remove(`ap-menu-navigation-item--container`)
    }
  }, [container])
  // #endregion

  // #region > Events
  function handleClick() {
    onClick()
  }
  // #endregion

  // #region > Render
  if (container) {
    return (
      <li
        className={classes}
        title={description}
        onClick={handleClick}
      >
        <ShellContainer
          className='ap-menu-navigation-item--container'
        >
          <div
            className='ap-menu-navigation-item__content'
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
          </div>
        </ShellContainer>
      </li>
    )
  }
  return (
    <li
      className={classes}
      title={description}
      onClick={handleClick}
    >
      <div
        className='ap-menu-navigation-item__content'
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
      </div>
    </li>
  )
  // #endregion
}
// #endregion
