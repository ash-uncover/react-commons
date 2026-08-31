import React from 'react'
import {
  Button,
  ButtonSemantics,
  ICONS,
  Panel,
} from '../../../../lib'

export const ButtonPage = () => {
  return (
    <>
      <Panel title='Semantics'>
        <Button semantic={ButtonSemantics.DEFAULT}>Default</Button>
        <Button semantic={ButtonSemantics.PRINCIPAL}>Principal</Button>
        <Button semantic={ButtonSemantics.POSITIVE}>Positive</Button>
        <Button semantic={ButtonSemantics.NEGATIVE}>Negative</Button>
        <Button semantic={ButtonSemantics.WARNING}>Warning</Button>
        <Button semantic={ButtonSemantics.ATTENTION}>Attention</Button>
        <Button semantic={ButtonSemantics.TRANSPARENT}>Transparent</Button>
      </Panel>
      <Panel title='With icon'>
        <Button icon={ICONS.FAS_GEAR} semantic={ButtonSemantics.DEFAULT}>Settings</Button>
        <Button icon={ICONS.FAS_DOWNLOAD} semantic={ButtonSemantics.PRINCIPAL}>Download</Button>
        <Button icon={ICONS.FAS_USER} semantic={ButtonSemantics.POSITIVE}>Profile</Button>
      </Panel>
      <Panel title='Disabled'>
        <Button disabled semantic={ButtonSemantics.DEFAULT}>Default</Button>
        <Button disabled semantic={ButtonSemantics.PRINCIPAL}>Principal</Button>
        <Button disabled semantic={ButtonSemantics.POSITIVE}>Positive</Button>
      </Panel>
    </>
  )
}
