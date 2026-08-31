import React from 'react'
import {
  Avatar,
  AvatarSizes,
  ICONS,
  Panel,
} from '../../../../lib'

export const AvatarPage = () => {
  return (
    <>
      <Panel title='Sizes'>
        <Avatar size={AvatarSizes.XS} initials='XS' />
        <Avatar size={AvatarSizes.S} initials='S' />
        <Avatar size={AvatarSizes.M} initials='M' />
        <Avatar size={AvatarSizes.L} initials='L' />
        <Avatar size={AvatarSizes.XL} initials='XL' />
      </Panel>
      <Panel title='With icon'>
        <Avatar size={AvatarSizes.M} icon={ICONS.FAS_USER} />
        <Avatar size={AvatarSizes.M} icon={ICONS.FAS_USERS} />
      </Panel>
      <Panel title='Clickable'>
        <Avatar size={AvatarSizes.M} initials='AB' title='Alice B.' onClick={() => alert('clicked')} />
      </Panel>
    </>
  )
}
