import React, {
  ReactNode,
} from 'react'

import {
  useLocation
} from 'react-router-dom'

import {
  faHome,
  faQuestionCircle,
  faUserCircle
} from '@fortawesome/free-solid-svg-icons'

import {
  ShellNavbar,
  ShellMenuItem,
  ShellMenu
} from '../..'

import './Shell.css'

// ---------------------------------------------------
// Create Component Shell
// ---------------------------------------------------

interface ShellProperties {
  children: ReactNode
}
export const Shell = ({
  children
}: ShellProperties) => {

  // Hooks //

  const location = useLocation()

  // Rendering //

  return (
    <div className='ap-shell'>
    </div>
  )
}