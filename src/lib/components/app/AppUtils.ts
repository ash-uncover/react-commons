import { AppNode } from './AppNode'
import { AppNodeDef } from './AppNodeDef'

export function resolveApp(root: AppNode): AppNodeDef[] {
  return resolveNode([], root, null)
}

function resolveNode(parents: AppNodeDef[], node: AppNode, parentPath: string | null): AppNodeDef[] {
  const path = parentPath === null
    ? node.path
    : parentPath === '/'
      ? `/${node.path}`
      : `${parentPath}/${node.path}`

  const nodeDef: AppNodeDef = {
    name: node.name,
    path,
    description: node.description,
    icon: node.icon,
    component: node.component,
    confirmBack: node.confirmBack,
    parents,
    items: [],
  }

  const result: AppNodeDef[] = [nodeDef]
  const children = node.items || []
  children.forEach(child => {
    result.push(...resolveNode([...parents, nodeDef], child, path))
  })
  nodeDef.items = children.map(child => findNodeDef(result, buildPath(path, child.path))!)

  return result
}

function buildPath(parentPath: string, segment: string): string {
  return parentPath === '/' ? `/${segment}` : `${parentPath}/${segment}`
}

export function getParent(nodeDef: AppNodeDef): AppNodeDef | null {
  const parents = nodeDef.parents
  return parents.length ? parents[parents.length - 1] : null
}

export function findNodeDef(nodeDefs: AppNodeDef[], path: string): AppNodeDef | null {
  return nodeDefs.find(def => def.path === path) || null
}
