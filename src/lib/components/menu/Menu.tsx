import React from 'react'
// Local Stuff
import {
  ICONS,
  MenuNavigationList,
  useClasses
} from '../..'
import { findItemDefinition, flattenMenu, getParent, IMenu, IMenuItemDef } from './MenuUtil'
import { MenuNavigationItemProperties } from './MenuNavigationItem'
// CSS
import './Menu.css'

// #region Declaration
export interface MenuProperties {
  className?: string
  collapsed?: boolean
  menu: IMenu
  onMenuToggle?: () => void
}
// #endregion

// #region Component
export const Menu = ({
  className,
  collapsed,
  menu,
  onMenuToggle
}: MenuProperties) => {

  // #region > Hooks
  const [itemsDef, setItemsDef] = React.useState<IMenuItemDef[]>([])
  React.useEffect(() => {
    if (menu) {
      const itemsDef = flattenMenu(menu)
      setItemsDef(itemsDef)
    } else {
      setItemsDef([])
    }
  }, [menu])

  const [itemSelection, setItemSelection] = React.useState<IMenuItemDef | null>(null)
  React.useEffect(() => {
    if (itemsDef.length) {
      setItemSelection(itemsDef[0])
    }
  }, [itemsDef])

  const [itemSelected, setItemSelected] = React.useState<IMenuItemDef | null>(null)
  React.useEffect(() => {
    if (itemSelection) {
      if (itemSelection.component) {
        setItemSelected(itemSelection)
      } else if (itemSelection.items?.length) {
        setItemSelected(itemSelection.items[0])
      }
    } else {
      setItemSelected(null)
    }
  }, [itemSelection])

  const [itemNavigation, setItemNavigation] = React.useState<IMenuItemDef | null>(null)
  React.useEffect(() => {
    if (itemSelection) {
      const parent = getParent(itemSelection)
      if (itemSelection.items?.length) {
        setItemNavigation(itemSelection)
      } else if (parent) {
        setItemNavigation(parent)
      }
    } else {
      setItemNavigation(null)
    }
  }, [itemSelection])

  const [itemComponent, setItemComponent] = React.useState<IMenuItemDef | null>(null)
  React.useEffect(() => {
    if (itemSelection) {
      if (itemSelection.component) {
        setItemComponent(itemSelection)
      } else if (itemSelection.items) {
        setItemComponent(findItemDefinition(itemsDef, itemSelection.items[0]))
      }
    } else {
      setItemComponent(null)
    }
  }, [itemSelection])

  const { classBuilder, classes } = useClasses(['ap-menu', className])
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
  function selectItem(itemDef: IMenuItemDef) {
    // Resolve Selection
    if (itemSelection?.items?.length) {
    }
    // Resolve Navigation
    // Resolve Component
    if (itemDef.component) {
      setItemComponent(itemDef)
    } else if (itemSelection?.items) {
      setItemComponent(findItemDefinition(itemsDef, itemSelection.items[0]))
    }
  }
  // #endregion

  // #region > Render
  function buildMenuNavigationItem(itemDef: IMenuItemDef | null): MenuNavigationItemProperties[] {
    if (itemDef?.items) {
      const items = itemDef.items.map(i => ({
        name: i.name,
        icon: i.icon,
        description: i.description,
        selected: itemSelected === i,
        onClick: () => setItemSelection(i)
      }))
      const parent = getParent(itemDef)
      if (parent && itemNavigation) {
        items.push({
          name: 'back',
          description: 'back',
          icon: ICONS.FAS_RIGHT_FROM_BRACKET,
          selected: false,
          onClick: () => setItemSelection(getParent(itemNavigation))
        })
      }
      return items
    }
    return []
  }

  return (
    <div className={classes}>

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
