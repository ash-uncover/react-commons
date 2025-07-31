import { ReactElement } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface IMenu {
  mode?: MenuMode
  component?: ReactElement
  items: IMenuItem[]
}

export interface IMenuItem {
  component?: ReactElement
  confirmBack?: boolean
  description?: string
  icon?: IconProp
  items?: IMenuItem[]
  name?: string
}

export type MenuMode =
  | 'RIGHT'
  | 'TOP'
  | 'BOTTOM'

export interface IMenuItemDef {
  parents: IMenuItemDef[]
  name?: string
  description?: string
  confirmBack?: boolean
  icon?: IconProp
  component?: ReactElement
  items?: IMenuItemDef[]
}

export function flattenMenu(menu: IMenu) {
  return flattenMenuItem([], menu)
}

export function flattenMenuItem(parents: IMenuItemDef[], menuItem: IMenuItem) {
  const itemDef = buildMenuItemDef(parents, menuItem)
  const result: IMenuItemDef[] = [itemDef]
  const items = menuItem.items || []
  items.forEach((itemChild: IMenuItem) => {
    result.push(...flattenMenuItem([...parents, itemDef], itemChild))
  })
  itemDef.items = (menuItem.items || []).map(i => findItemDefinition(result, i)!)
  return result
}

export function buildMenuItemDef(parents: IMenuItemDef[], item: IMenuItem): IMenuItemDef {
  return {
    parents,
    name: item.name,
    description: item.description,
    confirmBack: item.confirmBack,
    icon: item.icon,
    component: item.component,
    items: []
  }
}

export function getParent(item: IMenuItemDef) {
  if (item && item.parents.length) {
    const parent = item.parents[item.parents.length - 1]
    return parent
  }
  return null
}

export function findItemDefinition(itemDefinitions: IMenuItemDef[], item: IMenuItem) {
  return itemDefinitions.find(itemDef => equals(itemDef, item)) || null
}

export function equals(itemDefinition: IMenuItemDef, item: IMenuItem) {
  return (itemDefinition.name === item.name)
    && (itemDefinition.description === item.description)
    && (itemDefinition.icon === item.icon)
    && (itemDefinition.component === item.component)
}