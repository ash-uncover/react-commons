import React from 'react'
import {
  Panel,
  Switch,
} from '../../../../lib'

export const SwitchPage = () => {
  const [a, setA] = React.useState(false)
  const [b, setB] = React.useState(true)

  return (
    <>
      <Panel title='Switch'>
        <Switch checked={a} label='Notifications' onChange={e => setA(e.value)} />
        <Switch checked={b} label='Dark mode' onChange={e => setB(e.value)} />
      </Panel>
    </>
  )
}
