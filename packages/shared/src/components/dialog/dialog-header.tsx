import {classNames} from '#utils'
import type {HTMLAttributes, MouseEventHandler, PropsWithChildren} from 'react'
import classes from './styles/dialog.module.css'
import {DIALOG_CLASSES} from './constants'

type DialogHeaderProps = PropsWithChildren<{
  hideCloseButton?: boolean
  onClose?: MouseEventHandler<HTMLButtonElement>
}> &
  HTMLAttributes<HTMLElement>

export default function DialogHeader({
  className,
  onClose,
  hideCloseButton = false,
  children,
  ...dialogHeaderAttrs
}: DialogHeaderProps) {
  return (
    <header {...dialogHeaderAttrs} className={classNames(classes.dialogHeader, className)}>
      {children}
      {hideCloseButton || (
        <button className={DIALOG_CLASSES.HEADER_BTN_CLOSE} type="button" onClick={onClose}>
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
      )}
    </header>
  )
}
