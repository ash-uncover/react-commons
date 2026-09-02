import {
  flattenMenu,
  flattenMenuItem,
  buildMenuItemDef,
  getParent,
  findItemDefinition,
  equals,
  IMenu,
  IMenuItem,
  IMenuItemDef,
} from './MenuUtil'

describe('MenuUtil — additional coverage', () => {

  // #region getParent
  describe('getParent', () => {

    test('returns null for an item with no parents', () => {
      // Declaration
      const item: IMenuItemDef = { parents: [] }
      // Execution
      const result = getParent(item)
      // Assertions
      expect(result).toBeNull()
    })

    test('returns the last parent when parents are present', () => {
      // Declaration
      const root: IMenuItemDef = { parents: [], name: 'root' }
      const child: IMenuItemDef = { parents: [root], name: 'child' }
      // Execution
      const result = getParent(child)
      // Assertions
      expect(result).toBe(root)
    })

  })
  // #endregion

  // #region findItemDefinition
  describe('findItemDefinition', () => {

    test('returns matching item definition', () => {
      // Declaration
      const item: IMenuItem = { name: 'foo' }
      const def: IMenuItemDef = { parents: [], name: 'foo' }
      // Execution
      const result = findItemDefinition([def], item)
      // Assertions
      expect(result).toBe(def)
    })

    test('returns null when no match found', () => {
      // Declaration
      const item: IMenuItem = { name: 'missing' }
      const def: IMenuItemDef = { parents: [], name: 'other' }
      // Execution
      const result = findItemDefinition([def], item)
      // Assertions
      expect(result).toBeNull()
    })

  })
  // #endregion

  // #region equals
  describe('equals', () => {

    test('returns true for identical name/description/icon/component', () => {
      // Declaration
      const item: IMenuItem = { name: 'x', description: 'd' }
      const def: IMenuItemDef = { parents: [], name: 'x', description: 'd' }
      // Execution
      // Assertions
      expect(equals(def, item)).toBe(true)
    })

    test('returns false when names differ', () => {
      // Declaration
      const item: IMenuItem = { name: 'a' }
      const def: IMenuItemDef = { parents: [], name: 'b' }
      // Execution
      // Assertions
      expect(equals(def, item)).toBe(false)
    })

  })
  // #endregion

  // #region flattenMenu with items
  describe('flattenMenu with items', () => {

    test('flattens a menu with one item', () => {
      // Declaration
      const item: IMenuItem = { name: 'root' }
      const menu: IMenu = { items: [item] }
      // Execution
      const result = flattenMenu(menu)
      // Assertions — flattenMenu calls flattenMenuItem on the menu itself (wrapping items)
      // The "menu" object acts as an IMenuItem, so result contains the wrapper + the root
      expect(result.length).toBe(2)
      expect(result[1].name).toBe('root')
    })

    test('the first result item has a reference to child def in its items array', () => {
      // Declaration
      const child: IMenuItem = { name: 'child' }
      const root: IMenuItem = { name: 'root', items: [child] }
      const menu: IMenu = { items: [root] }
      // Execution
      const result = flattenMenu(menu)
      // Assertions — result[0] is the menu wrapper, result[1] is root, result[2] is child
      expect(result.length).toBe(3)
      const rootDef = result[1]
      expect(rootDef.name).toBe('root')
      expect(rootDef.items).toHaveLength(1)
      expect(rootDef.items![0].name).toBe('child')
    })

  })
  // #endregion

  // #region buildMenuItemDef with confirmBack
  describe('buildMenuItemDef with confirmBack', () => {

    test('copies confirmBack from item', () => {
      // Declaration
      const item: IMenuItem = { name: 'item', confirmBack: true }
      // Execution
      const result = buildMenuItemDef([], item)
      // Assertions
      expect(result.confirmBack).toBe(true)
    })

  })
  // #endregion

})
