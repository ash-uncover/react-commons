import React from 'react'
import { getParent, IMenuItemDef } from './MenuUtil'

// #region Context
interface MenuContextProperties {
  items: IMenuItemDef[]
  itemSelection: IMenuItemDef | null
  itemSelected: IMenuItemDef | null
  itemNavigation: IMenuItemDef | null
  itemComponent: IMenuItemDef | null
}
function buildContext(menuItems: IMenuItemDef[] = [], menuItemSelection?: IMenuItemDef) {
  let items = menuItems || []
  let itemSelection = menuItemSelection || null
  let itemSelected = null
  let itemNavigation = null
  let itemComponent = null
  if (items?.length) {
    itemSelection = itemSelection || items[0]
    if (itemSelection) {
      if (itemSelection.component) {
        itemSelected = itemSelection
        itemComponent = itemSelection
      } else if (itemSelection.items?.length) {
        itemSelected = itemSelection.items[0]
        itemComponent = itemSelection.items[0]
      } else {
        throw Error('Must have either a component or items')
      }
      const parent = getParent(itemSelection)
      if (itemSelection.items?.length) {
        itemNavigation = itemSelection
      } else if (parent) {
        itemNavigation = parent
      }
    }
  }
  return {
    items,
    itemSelection,
    itemSelected,
    itemNavigation,
    itemComponent,
  }
}
const MenuContext = React.createContext<MenuContextProperties>(buildContext([]))
export const MenuDispatchContext = React.createContext<React.Dispatch<any>>(() => { })
// #endregion

// #region Provider
interface MenuProviderProperties extends React.PropsWithChildren {
  items: IMenuItemDef[]
}

export const MenuProvider = ({
  items,

  children
}: MenuProviderProperties) => {

  // #region > Hooks
  const [context, dispatch] = React.useReducer(
    menuReducer,
    buildContext(items)
  )
  // #endregion

  // #region > Render
  return (
    <MenuContext.Provider value={context}>
      <MenuDispatchContext.Provider value={dispatch}>
        {children}
      </MenuDispatchContext.Provider>
    </MenuContext.Provider>
  )
  // #endregion
}
// #endregion

export const useMenuItemSelected = () => {
  const menuContext = React.useContext(MenuContext)
  return menuContext.itemSelected
}
export const useMenuItemComponent = () => {
  const menuContext = React.useContext(MenuContext)
  return menuContext.itemComponent
}
export const useMenuItemNavigation = () => {
  const menuContext = React.useContext(MenuContext)
  return menuContext.itemNavigation
}

const SELECT_ITEM = 'SELECT_ITEM'
export const useSelectItem = () => {
  const dispatch = React.useContext(MenuDispatchContext);
  return (itemSelection: IMenuItemDef) => {
    dispatch({
      type: SELECT_ITEM,
      itemSelection
    })
  }
}

const GO_BACK = 'GO_BACK'
export const useGoBack = () => {
  const dispatch = React.useContext(MenuDispatchContext);
  const itemNavigation = useMenuItemNavigation()
  return () => {
    if (itemNavigation) {
      const parent = getParent(itemNavigation)
      dispatch({
        type: GO_BACK,
        itemSelection: parent
      })
    }
  }
}

function menuReducer(context: MenuContextProperties, action: any): MenuContextProperties {
  switch (action.type) {
    case GO_BACK:
    case SELECT_ITEM: {
      return buildContext(context.items, action.itemSelection)
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
