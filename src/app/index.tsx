import React from 'react'
import { createRoot } from 'react-dom/client'

// icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// Import components
import { App } from './components/App'

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <App />
)
