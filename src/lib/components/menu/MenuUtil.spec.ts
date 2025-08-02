import { IMenu, IMenuItem, IMenuItemDef, buildMenuItemDef, flattenMenu, flattenMenuItem } from './MenuUtil'

describe('MenuUtil', () => {

  /* TEST CASES */

  // #region flattenMenu
  describe('flattenMenu', () => {

    test('empty menu', () => {
      // Declaration
      const menu: IMenu = { items: [] }
      // Execution
      const result = flattenMenu(menu)
      // Assertions
      expect(result).toEqual([])
    })
  })
  // #endregion

  // #region flattenMenuItem
  describe('flattenMenuItem', () => {

    test('empty menu item', () => {
      // Declaration
      const menuItem: IMenuItem = {}
      // Execution
      const result = flattenMenuItem([], menuItem)
      // Assertions
      expect(result).toEqual([{ parents: [], item: menuItem }])
    })

    test('one level menu', () => {
      // Declaration
      const menuItem1: IMenuItem = {
        name: 'item1'
      }
      const menuItem2: IMenuItem = {
        name: 'item2'
      }
      const menuItem: IMenuItem = {
        name: 'item',
        items: [menuItem1, menuItem2]
      }
      // Execution
      const result = flattenMenuItem([], menuItem)
      // Assertions
      const parent = {
        parents: [],
        item: menuItem
      }
      const parent1 = {
        parents: [parent],
        item: menuItem1
      }
      const parent2 = {
        parents: [parent],
        item: menuItem2
      }
      expect(result).toEqual([
        parent,
        parent1,
        parent2
      ])
    })

    test('two level menu', () => {
      // Declaration
      const menuItem2: IMenuItem = {
        name: 'item2'
      }
      const menuItem1: IMenuItem = {
        name: 'item1',
        items: [menuItem2]
      }
      const menuItem: IMenuItem = {
        name: 'item',
        items: [menuItem1]
      }
      // Execution
      const result = flattenMenuItem([], menuItem)
      // Assertions
      const parent = {
        parents: [],
        item: menuItem
      }
      const parent1 = {
        parents: [parent],
        item: menuItem1
      }
      const parent2 = {
        parents: [parent, parent1],
        item: menuItem2
      }
      expect(result).toEqual([
        parent,
        parent1,
        parent2
      ])
    })
  })
  // #endregion

  // #region buildMenuItemDef
  describe('buildMenuItemDef', () => {

    test('when sent a menu item', () => {
      // Declaration
      const parents: IMenuItemDef[] = []
      const menuItem: IMenuItem = {
        name: 'name',
        icon: ['fas', 'vial'],
        description: 'description',
        items: []
      }
      // Execution
      const result = buildMenuItemDef(parents, menuItem)
      // Assertions
      expect(result.parents).toBe(parents)
      expect(result.name).toBe(menuItem.name)
      expect(result.description).toBe(menuItem.description)
      expect(result.icon).toBe(menuItem.icon)
      expect(result.items).toEqual([])
    })
  })
  // #endregion
})