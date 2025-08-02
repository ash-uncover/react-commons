import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
//
import {
  Button,
  ButtonSemantics,
  ShellContainer,
  Title,
  TitleLevel,
  TitleLevels,
  useClasses,
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
  const { classBuilder, classes } = useClasses(['ap-panel', className])
  React.useEffect(() => {
    if (children && (!expandable || isExpanded)) {
      classBuilder.add('ap-panel--expanded')
    } else {
      classBuilder.add('ap-panel--collapsed')
    }
    return () => {
      classBuilder.remove(`ap-panel--collapsed`)
      classBuilder.remove(`ap-panel--expanded`)
    }
  }, [children, expandable, isExpanded])
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
  return (
    <ShellContainer
      className={classes}
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
    </ShellContainer>
  )
  // #endregion
}
// #endregion
