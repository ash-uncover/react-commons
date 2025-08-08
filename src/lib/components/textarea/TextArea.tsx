import React, { useRef, useState } from 'react'
//
import { 
  useClasseName,
  useClasses 
} from '../..'
// CSS
import './TextArea.css'

// #region Declaration
interface TextAreaProperties {
  className?: string
  style?: React.CSSProperties

  autoFocus?: boolean
  disabled?: boolean
  name?: string
  placeholder?: string
  required?: boolean
  rows?: number
  value?: string

  onChange: (event: { value: string }) => void
}
// #endregion

// #region Component
export const TextArea = ({
  className,
  style,

  autoFocus,
  disabled,
  name,
  placeholder,
  required,
  rows,
  value,

  onChange,
}: TextAreaProperties) => {

  // #region > Hooks
  const textarea = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const { classBuilder, classes } = useClasses(['ap-text-area'])
  useClasseName(classBuilder, className)
  // #endregion

  // #region >  Events
  function handleFocus() {
    setFocused(true)
    if (textarea.current) {
      console.log('focus')
      textarea.current.focus()
    }
  }
  function handleBlur() {
    setFocused(false)
  }
  function handleTextAreaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange({
      value: event.target.value
    })
  }
  // #endregion

  // #region > Render
  return (
    <div
      className={classes}
      style={style}
      tabIndex={focused ? -1 : 0}
      onFocus={handleFocus}
    >
      <textarea
        ref={textarea}
        className='ap-text-area__textarea'
        style={style}

        autoFocus={autoFocus}
        disabled={disabled}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        tabIndex={-1}
        value={value}

        onBlur={handleBlur}
        onChange={handleTextAreaChange}
      />
    </div>
  )
  // #endregion
}
// #endregion
