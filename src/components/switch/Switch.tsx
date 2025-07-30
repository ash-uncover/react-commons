import React, { FormEvent, useId } from 'react'
//
import { ClassBuilder } from '../ComponentUtil'
// CSS
import './Switch.css'

// #region Declaration
export interface SwitchProperties {
  className?: string
  style?: React.CSSProperties

  checked: boolean
  label: string
  onChange: (event: { value: boolean }) => void
}
// #endregion

// #region Component
export const Switch = ({
  className,
  style,

  checked,
  label,
  onChange,
}: SwitchProperties) => {

  // #region Hooks
  const id = useId()
  // #endregion

  // #region Events
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Boolean(event.currentTarget.checked)
    onChange({ value })
  }
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-switch', className])
  return (
    <div
      className={classes.className}
      style={style}
    >
      <input
        id={id}
        className='ap-switch__input'
        type='checkbox'
        style={{
          display: 'none'
        }}
        name={label}
        checked={checked}
        onChange={handleChange}
      />
      <label
        htmlFor={id}
        className='ap-switch__label'
      >
        <div
          className='ap-switch__control'
        />
        {label}
      </label>
    </div>
  )
  // #endregion
}
// #endregion
