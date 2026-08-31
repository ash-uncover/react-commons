import React from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import { useClasseName, useClasses } from '../..'

// #region Declaration
export interface IconProperties {
  className?: string
  style?: React.CSSProperties

  icon: IconProp
}
// #endregion

// #region Component
export const Icon = ({
  className,
  style,

  icon,
}: IconProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-icon'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region > Render
  return (
    <FontAwesomeIcon
      className={classes}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style={style as any}
      icon={icon}
    />
  )
  // #endregion
}
// #endregion
