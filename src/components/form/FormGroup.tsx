import React, { CSSProperties, ReactNode } from 'react'
//
import { ClassBuilder } from '../..'
import { FormGroupDirection, FormGroupDirections } from './FormGroupDirection'
// CSS
import './FormGroup.css'

// #region Declaration
interface FormGroupProperties {
  className?: string
  style?: CSSProperties

  direction?: FormGroupDirection

  children: ReactNode
}
// #endregion

// #region
export const FormGroup = ({
  className,
  style,

  direction = FormGroupDirections.VERTICAL,

  children,
}: FormGroupProperties) => {

  // #region Hooks
  // #endregion
  
  // #region Events
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-form-group', className])
  classes.add(`ap-form-group--${direction.toLowerCase()}`)

  return (
    <div
      className={classes.className}
      style={style}
    >
      {children}
    </div>
  )
  // #endregion
}
// #endregion