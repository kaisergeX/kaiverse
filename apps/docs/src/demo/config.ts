import {lazy} from 'react'

export const demoModules = {
  'dialog/basic': lazy(() => import('./dialog/basic')),
  'dialog/controlled-by-form': lazy(() => import('./dialog/controlled-by-form')),
  'dialog/without-compound': lazy(() => import('./dialog/without-compound')),
  'dialog/drawer': lazy(() => import('./dialog/drawer')),
  'dialog/non-modal': lazy(() => import('./dialog/non-modal')),
  'dialog/offset': lazy(() => import('./dialog/offset')),
  'dialog/backdrop-styling': lazy(() => import('./dialog/backdrop-styling')),

  'terminal/usage': lazy(() => import('./terminal/usage')),
  'terminal/helpers': lazy(() => import('./terminal/helpers')),
  'terminal/greetings': lazy(() => import('./terminal/greetings')),
  'terminal/theme': lazy(() => import('./terminal/theme')),
  'terminal/styling': lazy(() => import('./terminal/styling')),
} as const
