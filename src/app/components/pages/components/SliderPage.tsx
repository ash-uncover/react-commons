import React from 'react'
import {
  Label,
  Panel,
  Slider,
} from '../../../../lib'

export const SliderPage = () => {
  const [value, setValue] = React.useState(50)
  const [stepped, setStepped] = React.useState(0)

  return (
    <>
      <Panel title='Basic slider'>
        <Slider min={0} max={100} value={value} onChange={e => setValue(e.value)} />
        <Label text={`Value: ${value}`} />
      </Panel>
      <Panel title='With step'>
        <Slider min={0} max={100} step={10} value={stepped} onChange={e => setStepped(e.value)} />
        <Label text={`Value: ${stepped}`} />
      </Panel>
      <Panel title='Disabled'>
        <Slider min={0} max={100} value={50} disabled onChange={() => {}} />
      </Panel>
    </>
  )
}
