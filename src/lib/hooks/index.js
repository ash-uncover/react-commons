import {
  useEffect as useEffectBase,
  useRef as useRefBase,
  useState as useStateBase
} from 'react'

import {
  useHistory as useHistoryBase,
  useLocation as useLocationBase,
  useParams as useParamsBase,
  useRouteMatch as useRouteMatchBase
} from 'react-router-dom'

export const useEffect = useEffectBase
export const useRef = useRefBase
export const useState = useStateBase

export const useHistory = useHistoryBase
export const useLocation = useLocationBase
export const useParams = useParamsBase
export const useRouteMatch = useRouteMatchBase
