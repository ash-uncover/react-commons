import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import { Button } from '../button/Button'
import { ClassBuilder } from '../ComponentUtil'
import { ICONS } from '../icon/IconUtils'
// CSS
import './Select.css'

// #region Declaration
export interface SelectProperties {
  className?: string
  style?: React.CSSProperties

  disabled?: boolean
  value: string
  values: SelectValue[]

  onChange: (value: string) => void
}
export interface SelectValue {
  id: string
  text: string
}
// #endregion

// #region Component
export const Select = ({
  className,
  style,

  disabled,
  value,
  values,

  onChange,
}: SelectProperties) => {

  // #region Hooks
  // #endregion

  // #region Events
  function handleValuePrevious() {
    const currentValueIndex: number = values.findIndex(v => v.id === value)
    const newValueIndex = (currentValueIndex + values.length - 1) % values.length
    const newValue = values[newValueIndex]
    onChange(newValue.id)
  }
  function handleValueNext() {
    const currentValueIndex: number = values.findIndex(v => v.id === value)
    const newValueIndex = (currentValueIndex + values.length + 1) % values.length
    const newValue = values[newValueIndex]
    onChange(newValue.id)
  }
  // #endregion

  // #region Render
  const classes = new ClassBuilder(['ap-select', className])
  if (disabled) classes.add('ap-select--disabled')

  return (
    <div 
      className={classes.className}
      style={style}
    >

      <Button
        disabled={disabled}
        onClick={handleValuePrevious}
      >
        <FontAwesomeIcon icon={ICONS.FAS_CHEVRON_LEFT} />
      </Button>

      <div className='ap-select__value'>
        {values.find(v => v.id === value)!.text}
      </div>

      <Button
        disabled={disabled}
        onClick={handleValueNext}
      >
        <FontAwesomeIcon icon={ICONS.FAS_CHEVRON_RIGHT} />
      </Button>

    </div>
  )
  // #endregion
}
// #endregion
