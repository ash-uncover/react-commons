import React from 'react'

import {
  useTranslation
} from 'lib/hooks'

import {
  Switch,
  Route
} from 'react-router-dom'

const Root = () => {
  const { t } = useTranslation()
  return (
    <Switch>
      <Route path='/test' exact>
        Test
      </Route>
      <Route path='/'>
        {t('title')}
      </Route>
    </Switch>
  )
}

export default Root
