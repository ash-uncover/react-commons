import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
//
import { Icon, Label, useClasseName, useClasses } from '../..'
// CSS
import './AppMenuItem.css'

// #region Declaration
export interface AppMenuItemProperties {
  className?: string
  style?: React.CSSProperties

  active?: boolean
  depth?: number
  description?: string
  group?: boolean
  icon?: IconProp
  name?: string

  onClick: () => void
}
// #endregion

// #region Component
export const AppMenuItem = ({
  className,

  active,
  depth = 0,
  description,
  group,
  icon,
  name,

  onClick,
}: AppMenuItemProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-app-menu-item'])
  useClasseName(classBuilder, className)
  React.useEffect(() => {
    if (active) {
      classBuilder.add('ap-app-menu-item--active')
    }
    return () => { classBuilder.remove('ap-app-menu-item--active') }
  }, [active])
  React.useEffect(() => {
    if (group) {
      classBuilder.add('ap-app-menu-item--group')
    }
    return () => { classBuilder.remove('ap-app-menu-item--group') }
  }, [group])
  // #endregion

  // #region > Render
  return (
    <div
      className={classes}
      title={description}
      style={{ paddingLeft: `calc(var(--ap-padding-l) * ${depth + 1})` }}
      onClick={onClick}
    >
      {icon ? <Icon className='ap-app-menu-item__icon' icon={icon} /> : null}
      <Label className='ap-app-menu-item__label' text={name} />
    </div>
  )
  // #endregion
}
// #endregion
