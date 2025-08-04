import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
import {
  Button,
  ICONS,
  useClasses
} from '../..'
// CSS
import './Select.css'

// #region Declaration
export interface SelectProperties {
  className?: string
  style?: React.CSSProperties

  disabled?: boolean
  value: string
  values: SelectValue[]

  onChange: (event: { value: string }) => void
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

  // #region > Hooks
  const [valueSelected, setValueSelected] = React.useState<string | null>(value)
  React.useEffect(() => {
    const newValue = values.find(v => v.id === value)
    if (newValue) {
      setValueSelected(newValue.text)
    } else {
      setValueSelected(null)
    }
  }, [value, values])
  const { classBuilder, classes } = useClasses(['ap-select', className])
  React.useEffect(() => {
    if (disabled) {
      classBuilder.add(`ap-select--disabled`)
    }
    return () => {
      classBuilder.remove(`ap-select--disabled`)
    }
  }, [disabled])
  // #endregion

  // #region > Events
  function handleValuePrevious() {
    if (value && values?.length) {
      const currentValueIndex: number = values.findIndex(v => v.id === value)
      const newValueIndex = (currentValueIndex + values.length - 1) % values.length
      const newValue = values[newValueIndex]
      onChange({ value: newValue.id })
    }
  }
  function handleValueNext() {
    if (value && values?.length) {
      const currentValueIndex: number = values.findIndex(v => v.id === value)
      const newValueIndex = (currentValueIndex + values.length + 1) % values.length
      const newValue = values[newValueIndex]
      onChange({ value: newValue.id })
    }
  }
  // #endregion

  // #region > Render
  return (
    <div
      className={classes}
      style={style}
    >
      <Button
        disabled={disabled}
        onClick={handleValuePrevious}
      >
        <FontAwesomeIcon icon={ICONS.FAS_CHEVRON_LEFT} />
      </Button>

      <div className='ap-select__value'>
        {valueSelected}
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
