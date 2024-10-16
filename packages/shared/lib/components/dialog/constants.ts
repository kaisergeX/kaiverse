import {DISPLAY_NAME_PREFIX} from '../constants'

export const DIALOG_CLASSES = {
  ROOT: 'k-dialog',
  HEADER: 'k-dialog-header',
  TITLE: 'k-dialog-title',
  CLOSE_BTN: 'k-dialog-btn-close',
  CONTENT: 'k-dialog-content',
} as const

export const DIALOG_CSS_VARIABLES = {
  BACKDROP_BG: '--k-dialog-backdrop-bg',
  BACKDROP_BLUR: '--k-dialog-backdrop-blur',
  BACKDROP_OPACITY: '--k-dialog-backdrop-opacity',
  BACKDROP_TRANSITION: '--k-dialog-backdrop-transition',
  OFFSET: '--k-dialog-offset',
} as const

export const DIALOG_DISPLAY_NAME = {
  ROOT: `${DISPLAY_NAME_PREFIX}/Dialog`,
  HEADER: `${DISPLAY_NAME_PREFIX}/DialogHeader`,
  TITLE: `${DISPLAY_NAME_PREFIX}/DialogTitle`,
  CLOSE_BTN: `${DISPLAY_NAME_PREFIX}/DialogCloseButton`,
  CONTENT: `${DISPLAY_NAME_PREFIX}/DialogContent`,
} as const
