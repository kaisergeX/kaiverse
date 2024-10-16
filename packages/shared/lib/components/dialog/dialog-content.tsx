'use client'

import {classNames} from '#utils'
import type {HTMLAttributes, PropsWithChildren} from 'react'
import {DIALOG_CLASSES, DIALOG_DISPLAY_NAME} from './constants'
import classes from './styles/dialog.module.css'

export function DialogContent({
  className,
  children,
  ...dialogContentAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <article
      {...dialogContentAttrs}
      className={classNames(DIALOG_CLASSES.CONTENT, classes.dialogContent, className)}
    >
      {children}
    </article>
  )
}

DialogContent.displayName = DIALOG_DISPLAY_NAME.CONTENT
