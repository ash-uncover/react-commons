import React from 'react'
//
import {
  ICONS,
  Menu,
  Shell,
} from '../../lib'
import { AvatarPage } from './pages/components/AvatarPage'
import { ButtonPage } from './pages/components/ButtonPage'
import { FormGroupPage } from './pages/components/FormGroupPage'
import { ImageUploaderPage } from './pages/components/ImageUploaderPage'
import { InputPage } from './pages/components/InputPage'
import { LabelPage } from './pages/components/LabelPage'
import { PanelPage } from './pages/components/PanelPage'
import { SelectPage } from './pages/components/SelectPage'
import { SliderPage } from './pages/components/SliderPage'
import { SwitchPage } from './pages/components/SwitchPage'
import { TextAreaPage } from './pages/components/TextAreaPage'
import { TitlePage } from './pages/components/TitlePage'
import { DashboardSample } from './pages/samples/DashboardSample'
import { FormSample } from './pages/samples/FormSample'
// CSS
import './App.css'

// #region Declaration
export interface AppProperties extends React.PropsWithChildren {
}
// #endregion

// #region Component
export const App = ({
}: AppProperties) => {

  // #region > Render
  return (
    <Shell>
      <Menu
        container={true}
        containerLevel={10}
        menu={{
          items: [{
            name: 'Components',
            icon: ICONS.FAS_DESKTOP,
            items: [{
              name: 'Avatar',
              icon: ICONS.FAS_USER,
              component: <AvatarPage />
            }, {
              name: 'Button',
              icon: ICONS.FAS_GAMEPAD,
              component: <ButtonPage />
            }, {
              name: 'Form group',
              icon: ICONS.FAS_WRENCH,
              component: <FormGroupPage />
            }, {
              name: 'Image uploader',
              icon: ICONS.FAS_DOWNLOAD,
              component: <ImageUploaderPage />
            }, {
              name: 'Input',
              icon: ICONS.FAS_WRENCH,
              component: <InputPage />
            }, {
              name: 'Label',
              icon: ICONS.FAS_WRENCH,
              component: <LabelPage />
            }, {
              name: 'Panel',
              icon: ICONS.FAS_DESKTOP,
              component: <PanelPage />
            }, {
              name: 'Select',
              icon: ICONS.FAS_SLIDERS,
              component: <SelectPage />
            }, {
              name: 'Slider',
              icon: ICONS.FAS_SLIDERS,
              component: <SliderPage />
            }, {
              name: 'Switch',
              icon: ICONS.FAS_GEAR,
              component: <SwitchPage />
            }, {
              name: 'Text area',
              icon: ICONS.FAS_WRENCH,
              component: <TextAreaPage />
            }, {
              name: 'Title',
              icon: ICONS.FAS_WRENCH,
              component: <TitlePage />
            }]
          }, {
            name: 'Samples',
            icon: ICONS.FAS_GIFTS,
            items: [{
              name: 'Form',
              icon: ICONS.FAS_WRENCH,
              component: <FormSample />
            }, {
              name: 'Dashboard',
              icon: ICONS.FAS_DESKTOP,
              component: <DashboardSample />
            }]
          }]
        }}
      />
    </Shell>
  )
  // #endregion
}
// #endregion
