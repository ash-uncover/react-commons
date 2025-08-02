import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
//
import {
  ButtonSemantic,
  ButtonSemantics,
  useClasses
} from '../..'
// CSS
import './Button.css'

// #region Declaration
export interface ButtonProperties extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties

  disabled?: boolean
  icon?: IconProp
  iconEnd?: IconProp
  semantic?: ButtonSemantic
  text?: string
  title?: string
  type?: 'button' | 'submit'
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
}
// #endregion

// #region Component
export const Button = ({
  className,
  style,

  disabled,
  icon,
  iconEnd,
  semantic = ButtonSemantics.DEFAULT,
  text,
  title,
  type,
  onClick,

  children,
}: ButtonProperties) => {

  // #region > Hooks
  const { classBuilder, classes } = useClasses(['ap-button', className])
  React.useEffect(() => {
    classBuilder.add(`ap-button--${semantic.toLowerCase()}`)
    return () => {
      classBuilder.remove(`ap-button--${semantic.toLowerCase()}`)
    }
  }, [semantic])
  React.useEffect(() => {
    if (!children && !text && ((!icon && iconEnd) || (icon && !iconEnd))) {
      classBuilder.add('ap-button--icon-only')
    }
    return () => {
      classBuilder.remove('ap-button--icon-only')
    }
  }, [children, text, icon, iconEnd])
  // #endregion

  // #region > Events
  // #endregion

  // #region > Render
  return (
    <button
      className={classes}
      disabled={disabled}
      style={style}
      title={title}
      type={type}
      onClick={onClick}
    >
      {icon ? (
        <FontAwesomeIcon
          className='ap-button__icon-start'
          icon={icon}
        />
      ) : null}
      {text}
      {children}
      {iconEnd ? (
        <FontAwesomeIcon
          className='ap-button__icon-end'
          icon={iconEnd}
        />
      ) : null}
    </button>
  )
  // #endregion
}
// #endregion
