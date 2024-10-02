import type {HTMLAttributes, PropsWithChildren} from 'react'
import classes from './styles/dialog.module.css'
import {DIALOG_CLASSES} from './constants'
import {classNames} from '#utils'

export default function DialogFooter({
  className,
  children,
  ...dialogFooterAttrs
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <footer
      {...dialogFooterAttrs}
      className={classNames(classes.dialogHeader, DIALOG_CLASSES.FOOTER, className)}
    >
      {children}
    </footer>
  )
}
