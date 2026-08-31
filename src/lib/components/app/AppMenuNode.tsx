import React from 'react'
import { useLocation, useNavigate } from 'react-router'
//
import { AppMenuItem } from './AppMenuItem'
import { AppNodeDef } from './AppNodeDef'

// #region Declaration
export interface AppMenuNodeProperties {
  def: AppNodeDef
}
// #endregion

// #region Component
export const AppMenuNode = ({
  def,
}: AppMenuNodeProperties) => {

  // #region > Hooks
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const depth = Math.max(def.parents.length - 1, 0)
  const isActive = pathname === def.path
  const isActiveAncestor = pathname.startsWith(def.path === '/' ? def.path : `${def.path}/`)
  // #endregion

  // #region > Events
  const handleClick = () => {
    if (def.component || def.items.length === 0) {
      navigate(def.path)
    } else {
      navigate(def.items[0].path)
    }
  }
  // #endregion

  // #region > Render
  if (def.items.length > 0) {
    return (
      <div className='ap-app-menu__group'>
        <AppMenuItem
          group
          active={isActive || isActiveAncestor}
          depth={depth}
          description={def.description}
          icon={def.icon}
          name={def.name}
          onClick={handleClick}
        />
        <div className='ap-app-menu__group-items'>
          {def.items.map(child => <AppMenuNode key={child.path} def={child} />)}
        </div>
      </div>
    )
  }

  return (
    <AppMenuItem
      active={isActive}
      depth={depth}
      description={def.description}
      icon={def.icon}
      name={def.name}
      onClick={handleClick}
    />
  )
  // #endregion
}
// #endregion
