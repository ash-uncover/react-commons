import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
//
import {
  ClassBuilder,
  Button,
  ButtonSemantics,
  Title,
  TitleLevel,
  TitleLevels,
} from '../..'
// CSS
import './Panel.css'

// #region Declaration
interface PanelProperties {
  className?: string
  style?: React.CSSProperties

  expandable?: boolean
  expanded?: boolean
  title: string
  titleLevel?: TitleLevel

  children?: React.ReactNode
}
// #endregion

// #region Component
export const Panel = ({
  className,
  style,

  expandable = false,
  expanded = true,
  title,
  titleLevel = TitleLevels.H4,

  children,
}: PanelProperties) => {

  // #region > Hooks
  const content = React.useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = React.useState(expanded && children);
  const [baseHeight, setBaseHeight] = React.useState(0);
  const [baseOverflow, setBaseOverflow] = React.useState('');
  // #endregion

  // #region > Events
  function handleExpandClick() {
    if (content.current) {
      if (isExpanded) {
        const height = content.current.getBoundingClientRect().height
        const overflow = content.current.style.overflow
        content.current.style.height = `${height}px`
        setTimeout(() => {
          if (content.current) {
            content.current.style.height = '0'
          }
        }, 0)
        setBaseHeight(height)
        setBaseOverflow(overflow)
        setIsExpanded(false)
      } else {
        content.current.style.height = `${baseHeight}px`
        content.current.style.overflow = baseOverflow
        setIsExpanded(true)
      }
    }
  }
  // #endregion

  // #region > Render
  const classes = new ClassBuilder(['ap-panel', className])

  if (children && (!expandable || isExpanded)) {
    classes.add('ap-panel--expanded')
  } else {
    classes.add('ap-panel--collapsed')
  }

  return (
    <div
      className={classes.className}
      style={style}
    >
      <div className='ap-panel__header'>
        {expandable ? (
          <Button
            semantic={ButtonSemantics.TRANSPARENT}
            onClick={handleExpandClick}
          >
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          </Button>
        ) : null}
        <Title
          className='ap-panel__header__title'
          level={titleLevel}
        >
          {title}
        </Title>
      </div>

      {children
        ? (

          <div
            ref={content}
            className='ap-panel__content'
          >
            {children}
          </div>
        )
        : null
      }
    </div>
  )
  // #endregion
}
// #endregion
