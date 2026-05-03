import {DISPLAY_NAME_PREFIX} from '../../constants'

export const DIALOG_CLASSES = Object.freeze({
  ROOT: 'k-dialog',
  HEADER: 'k-dialog-header',
  TITLE: 'k-dialog-title',
  CLOSE_BTN: 'k-dialog-btn-close',
  CONTENT: 'k-dialog-content',
  FOOTER: 'k-dialog-footer',
})

export const DIALOG_CSS_VARIABLES = Object.freeze({
  BACKDROP_BG: '--k-dialog-backdrop-bg',
  BACKDROP_BLUR: '--k-dialog-backdrop-blur',
  BACKDROP_OPACITY: '--k-dialog-backdrop-opacity',
  BACKDROP_TRANSITION: '--k-dialog-backdrop-transition',
  OFFSET: '--k-dialog-offset',
})

export const DIALOG_BASE_DISPLAY_NAME = Object.freeze({
  ROOT: `${DISPLAY_NAME_PREFIX}/DialogBase`,
  HEADER: `${DISPLAY_NAME_PREFIX}/DialogHeaderBase`,
  TITLE: `${DISPLAY_NAME_PREFIX}/DialogTitleBase`,
  CLOSE_BTN: `${DISPLAY_NAME_PREFIX}/DialogCloseButtonBase`,
  CONTENT: `${DISPLAY_NAME_PREFIX}/DialogContentBase`,
  FOOTER: `${DISPLAY_NAME_PREFIX}/DialogFooterBase`,
})

export const DIALOG_DISPLAY_NAME = Object.freeze({
  ROOT: `${DISPLAY_NAME_PREFIX}/Dialog`,
  HEADER: `${DISPLAY_NAME_PREFIX}/DialogHeader`,
  TITLE: `${DISPLAY_NAME_PREFIX}/DialogTitle`,
  CLOSE_BTN: `${DISPLAY_NAME_PREFIX}/DialogCloseButton`,
  CONTENT: `${DISPLAY_NAME_PREFIX}/DialogContent`,
  FOOTER: `${DISPLAY_NAME_PREFIX}/DialogFooter`,
})
