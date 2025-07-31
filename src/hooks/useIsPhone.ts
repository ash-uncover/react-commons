import { useMediaQuery } from 'react-responsive'

import { ResponsiveBreakpoints } from '../lib/ResponsiveBreakpoint'

export const useIsPhone = () => {
  const isSmallWidth = useMediaQuery({ query: `(max-width: ${ResponsiveBreakpoints.S}px)` })
  const isSmallHeight = useMediaQuery({ query: `(max-height: ${ResponsiveBreakpoints.S}px)` })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })

  return (isPortrait && isSmallWidth)
    || (!isPortrait && isSmallHeight)
}