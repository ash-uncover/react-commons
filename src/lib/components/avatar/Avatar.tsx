import React from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import {
  AvatarSize,
  AvatarSizes,
  useClasses,
  useClasseName
} from '../..'
// CSS
import './Avatar.css'

// #region Declaration
interface AvatarProperties {
  className?: string
  style?: React.CSSProperties

  icon?: IconProp
  image?: string
  initials?: string
  size?: AvatarSize
  title?: string
  onClick?: (event: React.FormEvent<HTMLDivElement>) => void
}
// #endregion

// #region Component
export const Avatar = ({
  className,
  style,

  icon,
  image,
  initials,
  size = AvatarSizes.S,
  title,
  onClick
}: AvatarProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-avatar'])
  useClasseName(classBuilder, className)
  React.useEffect(() => {
      classBuilder.add(`ap-avatar--${size.toLowerCase()}`)
      return () => {
        classBuilder.remove(`ap-avatar--${size.toLowerCase()}`)
      }
    }, [size])
  React.useEffect(() => {
    if (onClick) {
      classBuilder.add(`ap-avatar--interactive`)
    }
    return () => {
      classBuilder.remove(`ap-avatar--interactive`)
    }
  }, [onClick])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  let content: React.ReactNode = <span />
  if (image) {
    classBuilder.add(`ap-avatar--image`)
    content = (
      <img
        className='ap-avatar__content'
        src={image}
      />
    )
  } else if (icon) {
    classBuilder.add(`ap-avatar--icon`)
    content = (
      <FontAwesomeIcon
        className='ap-avatar__content'
        icon={icon}
      />
    )
  } else if (initials) {
    classBuilder.add(`ap-avatar--initials`)
    content = (
      <span className='ap-avatar__content'>
        {initials.substring(0, 2).toUpperCase()}
      </span>
    )
  } else {
    // Default to user icon
    classBuilder.add(`ap-avatar--icon`)
    content = (
      <FontAwesomeIcon
        className='ap-avatar__content'
        icon={faUser}
      />
    )
  }

  return (
    <div
      className={classes}
      style={style}
      title={title}
      onClick={onClick}
    >
      {content}
    </div>
  )
  // #endregion
}
// #endregion
