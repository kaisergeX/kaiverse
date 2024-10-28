import {lazy} from 'react'

export const demoModules = {
  'utils/safeAnyToNumber': lazy(() => import('./utils/safeAnyToNumber')),
  'utils/dom-styles': lazy(() => import('./utils/dom-styles')),

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

  'slide-action/basic': lazy(() => import('./slide-action/basic')),
  'slide-action/interactive': lazy(() => import('./slide-action/interactive')),
  'slide-action/reset-via-ref': lazy(() => import('./slide-action/reset-via-ref')),
  'slide-action/custom-effect': lazy(() => import('./slide-action/custom-effect')),
  'slide-action/custom-icon': lazy(() => import('./slide-action/custom-icon')),
  'slide-action/colorful': lazy(() => import('./slide-action/colorful')),
  'slide-action/compact': lazy(() => import('./slide-action/compact')),
  'slide-action/allowSwipeAfterEnd': lazy(() => import('./slide-action/allowSwipeAfterEnd')),
  'slide-action/styling': lazy(() => import('./slide-action/styling')),

  'useDrag/basic': lazy(() => import('./useDrag/basic')),
  'useDrag/direction': lazy(() => import('./useDrag/direction')),
  'useDrag/step': lazy(() => import('./useDrag/step')),
  'useDrag/fixed-limit': lazy(() => import('./useDrag/fixed-limit')),
  'useDrag/relative-limit': lazy(() => import('./useDrag/relative-limit')),
  'useDrag/deceleration-effect': lazy(() => import('./useDrag/deceleration-effect')),

  'useSpeechToText/usage': lazy(() => import('./useSpeechToText/usage')),
} as const
