import { resolveApp, getParent, findNodeDef } from './AppUtils'
import { AppNode } from './AppNode'
import { AppNodeDef } from './AppNodeDef'

describe('AppUtils', () => {

  // #region resolveApp
  describe('resolveApp', () => {

    test('root only — no children', () => {
      // Declaration
      const root: AppNode = { name: 'Root', path: '/' }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Root')
      expect(result[0].path).toBe('/')
      expect(result[0].parents).toEqual([])
      expect(result[0].items).toEqual([])
    })

    test('root only — optional fields are passed through when provided', () => {
      // Declaration
      const MockComponent = () => null
      const root: AppNode = {
        name: 'Root',
        path: '/',
        description: 'Root description',
        icon: ['fas', 'vial'],
        component: MockComponent,
        confirmBack: true,
      }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result[0].description).toBe('Root description')
      expect(result[0].icon).toEqual(['fas', 'vial'])
      expect(result[0].component).toBe(MockComponent)
      expect(result[0].confirmBack).toBe(true)
    })

    test('root only — optional fields are undefined when absent', () => {
      // Declaration
      const root: AppNode = { name: 'Root', path: '/' }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result[0].description).toBeUndefined()
      expect(result[0].icon).toBeUndefined()
      expect(result[0].component).toBeUndefined()
      expect(result[0].confirmBack).toBeUndefined()
    })

    test('root with children — absolute paths prefixed with /', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [
          { name: 'A', path: 'a' },
          { name: 'B', path: 'b' },
        ],
      }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result).toHaveLength(3)
      expect(result[1].path).toBe('/a')
      expect(result[2].path).toBe('/b')
    })

    test('root with children — children reference root as parent', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [{ name: 'A', path: 'a' }],
      }
      // Execution
      const result = resolveApp(root)
      const rootDef = result[0]
      const aDef = result[1]
      // Assertions
      expect(aDef.parents).toHaveLength(1)
      expect(aDef.parents[0]).toBe(rootDef)
    })

    test('root with children — root items array holds resolved child references', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [{ name: 'A', path: 'a' }],
      }
      // Execution
      const result = resolveApp(root)
      const rootDef = result[0]
      const aDef = result[1]
      // Assertions
      expect(rootDef.items).toHaveLength(1)
      expect(rootDef.items[0]).toBe(aDef)
    })

    test('three levels deep — paths joined correctly beyond root', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [{
          name: 'Section',
          path: 'section',
          items: [{ name: 'Page', path: 'page' }],
        }],
      }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result).toHaveLength(3)
      expect(result[0].path).toBe('/')
      expect(result[1].path).toBe('/section')
      expect(result[2].path).toBe('/section/page')
    })

    test('three levels deep — grandchild carries full ancestor chain', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [{
          name: 'Section',
          path: 'section',
          items: [{ name: 'Page', path: 'page' }],
        }],
      }
      // Execution
      const result = resolveApp(root)
      const rootDef = result[0]
      const sectionDef = result[1]
      const pageDef = result[2]
      // Assertions
      expect(pageDef.parents).toHaveLength(2)
      expect(pageDef.parents[0]).toBe(rootDef)
      expect(pageDef.parents[1]).toBe(sectionDef)
    })

    test('flat list is ordered depth-first', () => {
      // Declaration
      const root: AppNode = {
        name: 'Root',
        path: '/',
        items: [
          {
            name: 'A', path: 'a',
            items: [{ name: 'A1', path: 'a1' }],
          },
          { name: 'B', path: 'b' },
        ],
      }
      // Execution
      const result = resolveApp(root)
      // Assertions
      expect(result.map(n => n.path)).toEqual(['/', '/a', '/a/a1', '/b'])
    })

  })
  // #endregion

  // #region getParent
  describe('getParent', () => {

    test('returns null when node has no parents', () => {
      // Declaration
      const nodeDef: AppNodeDef = { name: 'Root', path: '/', parents: [], items: [] }
      // Execution
      const result = getParent(nodeDef)
      // Assertions
      expect(result).toBeNull()
    })

    test('returns the immediate parent when parents exist', () => {
      // Declaration
      const rootDef: AppNodeDef = { name: 'Root', path: '/', parents: [], items: [] }
      const sectionDef: AppNodeDef = { name: 'Section', path: '/section', parents: [rootDef], items: [] }
      const pageDef: AppNodeDef = { name: 'Page', path: '/section/page', parents: [rootDef, sectionDef], items: [] }
      // Execution
      const result = getParent(pageDef)
      // Assertions
      expect(result).toBe(sectionDef)
    })

  })
  // #endregion

  // #region findNodeDef
  describe('findNodeDef', () => {

    test('returns the matching node', () => {
      // Declaration
      const rootDef: AppNodeDef = { name: 'Root', path: '/', parents: [], items: [] }
      const homeDef: AppNodeDef = { name: 'Home', path: '/home', parents: [rootDef], items: [] }
      // Execution
      const result = findNodeDef([rootDef, homeDef], '/home')
      // Assertions
      expect(result).toBe(homeDef)
    })

    test('returns null when no node matches the path', () => {
      // Declaration
      const rootDef: AppNodeDef = { name: 'Root', path: '/', parents: [], items: [] }
      // Execution
      const result = findNodeDef([rootDef], '/nonexistent')
      // Assertions
      expect(result).toBeNull()
    })

  })
  // #endregion

})
