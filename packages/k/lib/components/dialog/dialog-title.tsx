'use client'

import type {HTMLAttributes, PropsWithChildren} from 'react'
import {classNames} from '#utils'
import {DIALOG_CLASSES, DIALOG_DISPLAY_NAME} from './constants'
import classes from './styles/dialog.module.css'

export function DialogTitle({
  className,
  children,
  ...dialogTitleAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <h2
      {...dialogTitleAttrs}
      className={classNames(DIALOG_CLASSES.TITLE, classes.dialogTitle, className)}
    >
      {children}
    </h2>
  )
}

DialogTitle.displayName = DIALOG_DISPLAY_NAME.TITLE
