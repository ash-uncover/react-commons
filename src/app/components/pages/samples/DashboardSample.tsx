import React from 'react'
import {
  Avatar,
  AvatarSizes,
  Button,
  ButtonSemantics,
  ICONS,
  Panel,
  Select,
  Slider,
  Switch,
  Title,
  TitleLevels,
} from '../../../../lib'

const PERIODS = [
  { id: 'day', text: 'Today' },
  { id: 'week', text: 'This week' },
  { id: 'month', text: 'This month' },
]

export const DashboardSample = () => {
  const [period, setPeriod] = React.useState('week')
  const [threshold, setThreshold] = React.useState(70)
  const [alerts, setAlerts] = React.useState(true)

  return (
    <>
      <Panel title='Overview' expandable>
        <Title level={TitleLevels.H3} text='Welcome back' />
        <Select value={period} values={PERIODS} onChange={e => setPeriod(e.value)} />
      </Panel>
      <Panel title='Team' expandable>
        <Avatar size={AvatarSizes.M} initials='AL' title='Alice L.' />
        <Avatar size={AvatarSizes.M} initials='BM' title='Bob M.' />
        <Avatar size={AvatarSizes.M} icon={ICONS.FAS_USER} title='Unknown' />
        <Button semantic={ButtonSemantics.TRANSPARENT} icon={ICONS.FAS_USERS}>Manage team</Button>
      </Panel>
      <Panel title='Settings' expandable expanded={false}>
        <Slider min={0} max={100} step={5} value={threshold} onChange={e => setThreshold(e.value)} />
        <Switch checked={alerts} label='Enable alerts' onChange={e => setAlerts(e.value)} />
        <Button semantic={ButtonSemantics.PRINCIPAL} icon={ICONS.FAS_GEAR}>Save settings</Button>
      </Panel>
    </>
  )
}
