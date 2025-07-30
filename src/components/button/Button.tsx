import React, { ReactNode } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

import { ClassBuilder } from '../ComponentUtil'
import { ButtonSemantic, ButtonSemantics } from './ButtonSemantic'

import './Button.css'

export interface ButtonProperties {
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

  children?: ReactNode
}

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

  // Hooks //

  // Events //

  // Rendering //

  const classes = new ClassBuilder(['ap-button', className])

  classes.add(`ap-button--${semantic.toLowerCase()}`)

  if (!children && !text && ((!icon && iconEnd) || (icon && !iconEnd))) {
    classes.add('ap-button--icon-only')
  }

  return (
    <button
      className={classes.className}
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
}
