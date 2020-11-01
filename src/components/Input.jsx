import React, {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  buildClassName
} from 'lib/ComponentUtils'

import './Input.scss'

const getShowButton = (visible, show, onClick) => {
  if (visible) {
    return (
      <button
        className='form-input-show'
        tabIndex={-1}
        type='button'
        onClick={onClick}
      >
        <i className={`fas fa-eye${show ? '' : '-slash'}`} />
      </button>
    )
  }
}

const Input = ({
  className,
  placeholder,
  name,
  type,
  disabled,
  required,
  value,
  onChange
}) => {
  const [edit, setEdit] = useState(false)
  const [focus, setFocus] = useState(false)
  const [autofocus, setAutofocus] = useState(false)
  const [inputType, setInputType] = useState(type)

  const isEditing = edit || Boolean(value)
  const realClassName = buildClassName(
    'input',
    className,
    isEditing ? 'active' : null,
    focus ? 'focus' : false
  )
  const input = useRef(null)

  const onEdit = () => {
    setEdit(true)
    setAutofocus(true)
  }
  const onFocus = () => {
    setFocus(true)
  }
  const onBlur = () => {
    setEdit(Boolean(value))
    setAutofocus(false)
    setFocus(false)
  }
  const onShowToggle = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }
  useEffect(() => {
    if (autofocus && input !== null) {
      input.current.focus()
    }
  })

  return (
    <div
      className={realClassName}
    >
      <div
        className='input-control'
      >
        <input
          ref={input}
          placeholder={placeholder}
          name={name}
          type={inputType}
          disabled={disabled}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {getShowButton(
          Boolean(value) && type === 'password',
          type !== inputType,
          onShowToggle
        )}
      </div>
      <div
        className='input-mask'
      >
        <button
          type='button'
          onClick={onEdit}
          onFocus={onEdit}
        >
          {placeholder}
        </button>
      </div>
    </div>
  )
}

export default Input
