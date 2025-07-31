import React from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
import { MenuNavigationItem, MenuNavigationItemProperties } from './MenuNavigationItem'
// CSS
import './MenuNavigationList.css'

// #region Declaration
export interface MenuNavigationListProperties {
  className?: string
  items: MenuNavigationItemProperties[]
}
// #endregion

// #region Component
export const MenuNavigationList = ({
  className,
  items
}: MenuNavigationListProperties) => {
  
  // #region Hooks
  // #endregion

  // #region Events
  // #endregion

  // #region > Render
  const classes = new ClassBuilder(['ap-menu-navigation-list', className])

  return (
    <ul
      className={classes.className}
    >
      {items.map(item => <MenuNavigationItem key={item.name} {...item} />)}
    </ul>
  )
  // #endregion
}
// #endregion
