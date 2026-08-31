import React from 'react'
import { Route, Routes } from 'react-router'
//
import {
  AppMenu,
  AppNode,
  ICONS,
  Shell,
  ShellContainer,
  ShellPage,
  resolveApp,
} from '../../lib'
// CSS
import './App.css'

// #region Lazy pages
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
const FormSample = React.lazy(() => import('./pages/samples/FormSample').then(m => ({ default: m.FormSample })))
const DashboardSample = React.lazy(() => import('./pages/samples/DashboardSample').then(m => ({ default: m.DashboardSample })))
// #endregion

// #region App structure
const APP_STRUCTURE: AppNode = {
  name: 'React Commons',
  path: '/',
  items: [{
    name: 'Components',
    path: 'components',
    icon: ICONS.FAS_DESKTOP,
    items: [
      { name: 'Avatar',         path: 'avatar',          icon: ICONS.FAS_USER,     component: AvatarPage as React.ComponentType },
      { name: 'Button',         path: 'button',          icon: ICONS.FAS_GAMEPAD,  component: ButtonPage as React.ComponentType },
      { name: 'Form group',     path: 'form-group',      icon: ICONS.FAS_WRENCH,   component: FormGroupPage as React.ComponentType },
      { name: 'Image uploader', path: 'image-uploader',  icon: ICONS.FAS_DOWNLOAD, component: ImageUploaderPage as React.ComponentType },
      { name: 'Input',          path: 'input',           icon: ICONS.FAS_WRENCH,   component: InputPage as React.ComponentType },
      { name: 'Label',          path: 'label',           icon: ICONS.FAS_WRENCH,   component: LabelPage as React.ComponentType },
      { name: 'Panel',          path: 'panel',           icon: ICONS.FAS_DESKTOP,  component: PanelPage as React.ComponentType },
      { name: 'Select',         path: 'select',          icon: ICONS.FAS_SLIDERS,  component: SelectPage as React.ComponentType },
      { name: 'Slider',         path: 'slider',          icon: ICONS.FAS_SLIDERS,  component: SliderPage as React.ComponentType },
      { name: 'Switch',         path: 'switch',          icon: ICONS.FAS_GEAR,     component: SwitchPage as React.ComponentType },
      { name: 'Text area',      path: 'text-area',       icon: ICONS.FAS_WRENCH,   component: TextAreaPage as React.ComponentType },
      { name: 'Title',          path: 'title',           icon: ICONS.FAS_WRENCH,   component: TitlePage as React.ComponentType },
    ],
  }, {
    name: 'Samples',
    path: 'samples',
    icon: ICONS.FAS_GIFTS,
    items: [
      { name: 'Form',      path: 'form',      icon: ICONS.FAS_WRENCH,  component: FormSample as React.ComponentType },
      { name: 'Dashboard', path: 'dashboard', icon: ICONS.FAS_DESKTOP, component: DashboardSample as React.ComponentType },
    ],
  }],
}

const APP_NODES = resolveApp(APP_STRUCTURE)
// #endregion

// #region Declaration
export interface AppProperties extends React.PropsWithChildren {}
// #endregion

// #region Component
export const App = ({}: AppProperties) => {
  return (
    <Shell>
      <ShellContainer className='app' level={10}>
        <nav className='app__nav'>
          <AppMenu node={APP_STRUCTURE} />
        </nav>
        <ShellPage className='app__content'>
          <React.Suspense fallback={null}>
            <Routes>
              <Route path='/' element={null} />
              {APP_NODES
                .filter(def => def.component)
                .map(def => (
                  <Route
                    key={def.path}
                    path={def.path}
                    element={React.createElement(def.component!)}
                  />
                ))
              }
            </Routes>
          </React.Suspense>
        </ShellPage>
      </ShellContainer>
    </Shell>
  )
}
// #endregion
