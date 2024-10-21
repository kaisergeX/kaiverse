'use client'

import {classNames} from '#utils'
import type {HTMLAttributes, PropsWithChildren} from 'react'
import {DIALOG_CLASSES, DIALOG_DISPLAY_NAME} from './constants'
import classes from './styles/dialog.module.css'

export function DialogHeader({
  className,
  children,
  ...dialogHeaderAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <header
      {...dialogHeaderAttrs}
      className={classNames(DIALOG_CLASSES.HEADER, classes.dialogHeader, className)}
    >
      {children}
    </header>
  )
}

DialogHeader.displayName = DIALOG_DISPLAY_NAME.HEADER
