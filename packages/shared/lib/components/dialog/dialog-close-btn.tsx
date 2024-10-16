'use client'

import {classNames} from '#utils'
import type {ButtonHTMLAttributes} from 'react'
import {DIALOG_CLASSES, DIALOG_DISPLAY_NAME} from './constants'
import {useDialogContext} from './hooks'
import classes from './styles/dialog.module.css'

type DialogHeaderProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

/** Close button for the Dialog component. Only render if the Dialog's `onClose` prop is provided. */
export function DialogCloseButton({className, ...closeButtonAttrs}: DialogHeaderProps) {
  const {onClose} = useDialogContext()

  if (!onClose) {
    return null
  }

  return (
    <button
      type="button"
      {...closeButtonAttrs}
      className={classNames(DIALOG_CLASSES.CLOSE_BTN, classes.closeBtn, className)}
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
}

DialogCloseButton.displayName = DIALOG_DISPLAY_NAME.CLOSE_BTN
