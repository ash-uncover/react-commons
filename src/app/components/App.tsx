import React from 'react'
//
import {
  ICONS,
  Menu,
  Shell,
} from '../../lib'
// CSS
import './App.css'

const AvatarPage = React.lazy(() => import('./pages/components/AvatarPage').then(m => ({ default: m.AvatarPage })))
const ButtonPage = React.lazy(() => import('./pages/components/ButtonPage').then(m => ({ default: m.ButtonPage })))
const FormGroupPage = React.lazy(() => import('./pages/components/FormGroupPage').then(m => ({ default: m.FormGroupPage })))
const ImageUploaderPage = React.lazy(() => import('./pages/components/ImageUploaderPage').then(m => ({ default: m.ImageUploaderPage })))
const InputPage = React.lazy(() => import('./pages/components/InputPage').then(m => ({ default: m.InputPage })))
const LabelPage = React.lazy(() => import('./pages/components/LabelPage').then(m => ({ default: m.LabelPage })))
const PanelPage = React.lazy(() => import('./pages/components/PanelPage').then(m => ({ default: m.PanelPage })))
const SelectPage = React.lazy(() => import('./pages/components/SelectPage').then(m => ({ default: m.SelectPage })))
const SliderPage = React.lazy(() => import('./pages/components/SliderPage').then(m => ({ default: m.SliderPage })))
const SwitchPage = React.lazy(() => import('./pages/components/SwitchPage').then(m => ({ default: m.SwitchPage })))
const TextAreaPage = React.lazy(() => import('./pages/components/TextAreaPage').then(m => ({ default: m.TextAreaPage })))
const TitlePage = React.lazy(() => import('./pages/components/TitlePage').then(m => ({ default: m.TitlePage })))
const DashboardSample = React.lazy(() => import('./pages/samples/DashboardSample').then(m => ({ default: m.DashboardSample })))
const FormSample = React.lazy(() => import('./pages/samples/FormSample').then(m => ({ default: m.FormSample })))

// #region Declaration
export interface AppProperties extends React.PropsWithChildren {
}
// #endregion

// #region Component
export const App = ({
}: AppProperties) => {

  // #region > Render
  return (
    <React.Suspense fallback={null}>
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
    </React.Suspense>
  )
  // #endregion
}
// #endregion
