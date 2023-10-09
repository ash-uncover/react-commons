import React from 'react'

import {
  buildClassName
} from 'lib/ComponentUtils'

export const buildOptions = (options) => options.map((option, index) => {
  if (typeof option === 'string') {
    return (
      <option key={`option-${index}`} value={option}>
        {option}
      </option>
    )
  }
  return (
    <option key={option.id} value={option.id}>
      {option.text}
    </option>
  )
})

const Select = ({
  className,
  options,
  value,
  onChange
}) => {
  const realClassName = buildClassName(
    'select',
    className
  )
  return (
    <select
      className={realClassName}
      value={value}
      onChange={onChange}
    >
      {buildOptions(options)}
    </select>
  )
}

export default Select
