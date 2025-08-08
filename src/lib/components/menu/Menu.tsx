import React from 'react'
// Local Stuff
import {
  ICONS,
  MenuNavigationList,
  ShellContainer,
  ShellPage,
  useClasseName,
  useClasses
} from '../..'
import { flattenMenu, getParent, IMenu, IMenuItemDef } from './MenuUtil'
import { MenuNavigationItemProperties } from './MenuNavigationItem'
import { MenuProvider, useGoBack, useMenuItemComponent, useMenuItemNavigation, useMenuItemSelected, useSelectItem } from './MenuProvider'
// CSS
import './Menu.css'

// #region Declaration
export interface MenuProperties {
  className?: string
  style?: React.CSSProperties

  collapsed?: boolean
  container?: boolean
  containerLevel?: number
  menu: IMenu
  onMenuToggle?: () => void
}
// #endregion

// #region Component
export const Menu = ({
  className,
  style,

  collapsed,
  container,
  containerLevel,
  menu,
  onMenuToggle
}: MenuProperties) => {

  // #region > Hooks
  const [menuDef, setMenuDef] = React.useState<IMenuItemDef[]>([])
  React.useEffect(() => {
    if (menu) {
      const menuDef = flattenMenu(menu)
      setMenuDef(menuDef)
    } else {
      setMenuDef([])
    }
  }, [menu])

  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  if (menuDef?.length) {
    return (
      <MenuProvider
        items={menuDef}
      >
        <MenuInner
          className={className}
          style={style}
          collapsed={collapsed}
          container={container}
          containerLevel={containerLevel}
          onMenuToggle={onMenuToggle}
        />
      </MenuProvider>
    )
  }
  // #endregion
}
// #endregion

// #region Declaration
export interface MenuInnerProperties {
  className?: string
  style?: React.CSSProperties

  collapsed?: boolean
  container?: boolean
  containerLevel?: number
  onMenuToggle?: () => void
}
// #endregion

// #region Component
export const MenuInner = ({
  className,
  style,

  collapsed,
  container,
  containerLevel,
  onMenuToggle
}: MenuInnerProperties) => {

  // #region > Hooks
  const itemSelected = useMenuItemSelected()
  const itemNavigation = useMenuItemNavigation()
  const itemComponent = useMenuItemComponent()
  const selectItem = useSelectItem()
  const goBack = useGoBack()

  const { classBuilder, classes } = useClasses(['ap-menu'])
  useClasseName(classBuilder, className)
  React.useEffect(() => {
    if (collapsed) {
      classBuilder.add(`ap-menu--collapsed`)
    }
    return () => {
      classBuilder.remove(`ap-menu--collapsed`)
    }
  }, [collapsed])
  // #endregion

  // #region > Events
  function handleItemClick(itemDef: IMenuItemDef) {
    selectItem(itemDef)
  }
  function handleBackClick() {
    goBack()
  }
  // #endregion

  // #region > Render
  function buildMenuNavigationItem(itemDef: IMenuItemDef | null): MenuNavigationItemProperties[] {
    if (itemDef?.items) {
      const items = itemDef.items.map(i => ({
        container,
        description: i.description,
        icon: i.icon,
        name: i.name,
        selected: itemSelected === i,
        onClick: () => handleItemClick(i)
      }))
      const parent = getParent(itemDef)
      if (parent && itemNavigation) {
        items.push({
          container,
          name: 'back',
          description: 'back',
          icon: ICONS.FAS_RIGHT_FROM_BRACKET,
          selected: false,
          onClick: handleBackClick
        })
      }
      return items
    }
    return []
  }

  if (container) {
    return (
      <ShellContainer
        className={classes}
        style={style}
        level={containerLevel}
      >

        <ShellPage className='ap-menu__content'>
          {itemComponent ? itemComponent.component : null}
        </ShellPage>

        <nav className='ap-menu__navigation'>
          <MenuNavigationList
            items={buildMenuNavigationItem(itemNavigation)}
          />
        </nav>

      </ShellContainer>
    )
  }
  return (
    <div
      className={classes}
      style={style}
    >

      <div className='ap-menu__content'>
        {itemComponent ? itemComponent.component : null}
      </div>

      <nav className='ap-menu__navigation'>
        <MenuNavigationList
          items={buildMenuNavigationItem(itemNavigation)}
        />
      </nav>

    </div>
  )
  // #endregion
}
// #endregion
