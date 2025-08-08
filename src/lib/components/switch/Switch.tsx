import React, { FormEvent, useId } from 'react'
//
import { 
  useClasseName,
  useClasses 
} from '../..'
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
  const { classBuilder, classes } = useClasses(['ap-switch'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region Events
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const value = Boolean(event.currentTarget.checked)
    onChange({ value })
  }
  // #endregion

  // #region Render
  return (
    <div
      className={classes}
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
