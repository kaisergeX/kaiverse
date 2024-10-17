'use client'

import {classNames} from '#utils'
import type {HTMLAttributes, PropsWithChildren} from 'react'
import {DIALOG_CLASSES, DIALOG_DISPLAY_NAME} from './constants'
import classes from './styles/dialog.module.css'

export function DialogFooter({
  className,
  children,
  ...dialogFooterAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <footer
      {...dialogFooterAttrs}
      className={classNames(DIALOG_CLASSES.HEADER, classes.dialogFooter, className)}
    >
      {children}
    </footer>
  )
}

DialogFooter.displayName = DIALOG_DISPLAY_NAME.FOOTER
