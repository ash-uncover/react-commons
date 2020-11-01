import React from 'react'
import ReactDOM from 'react-dom'

import {
  BrowserRouter as Router
} from 'react-router-dom'

import Root from 'demo/Root'

ReactDOM.render(
  <Router hashType='noslash'>
    <Root />
  </Router>,
  document.getElementById('react-root')
)
