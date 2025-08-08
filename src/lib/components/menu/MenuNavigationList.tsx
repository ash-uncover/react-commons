import React from 'react'
//
import { 
  MenuNavigationItem,
  useClasseName,
  useClasses 
} from '../..'
import { MenuNavigationItemProperties } from './MenuNavigationItem'
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
  
  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-menu-navigation-list'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <ul
      className={classes}
    >
      {items.map(item => <MenuNavigationItem key={item.name} {...item} />)}
    </ul>
  )
  // #endregion
}
// #endregion
