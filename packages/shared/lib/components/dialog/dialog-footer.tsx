import type {HTMLAttributes, PropsWithChildren} from 'react'
import {classNames} from '#utils'
import {DIALOG_CLASSES} from './constants'
import classes from './styles/dialog.module.css'

export default function DialogFooter({
  className,
  children,
  ...dialogFooterAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <footer
      {...dialogFooterAttrs}
      className={classNames(DIALOG_CLASSES.FOOTER, classes.dialogHeader, className)}
    >
      {children}
    </footer>
  )
}
