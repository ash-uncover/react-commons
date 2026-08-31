import React from 'react'
import {
  ICONS,
  Input,
  Panel,
} from '../../../../lib'

export const InputPage = () => {
  const [text, setText] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [number, setNumber] = React.useState('')

  return (
    <>
      <Panel title='Text'>
        <Input value={text} placeholder='Enter text' onChange={e => setText(e.value)} />
        <Input value={text} placeholder='With clear icon' showClearIcon onChange={e => setText(e.value)} />
        <Input value={text} placeholder='With icon' icon={ICONS.FAS_USER} onChange={e => setText(e.value)} />
        <Input value={text} placeholder='Disabled' disabled onChange={e => setText(e.value)} />
      </Panel>
      <Panel title='Password'>
        <Input value={password} type='password' placeholder='Enter password' showPasswordIcon onChange={e => setPassword(e.value)} />
      </Panel>
      <Panel title='Number'>
        <Input value={number} type='number' placeholder='Enter number' onChange={e => setNumber(e.value)} />
      </Panel>
    </>
  )
}
