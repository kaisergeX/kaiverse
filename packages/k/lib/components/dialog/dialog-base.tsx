'use client'

import {useDOMRef} from '#hooks'
import {isDOMAvailable, refFactory} from '#utils'
import {
  useCallback,
  useEffect,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEventHandler,
  type PropsWithChildren,
  type ReactEventHandler,
} from 'react'
import {useDialogContext} from './hooks'
import {DIALOG_BASE_DISPLAY_NAME} from './internals/constants'
import {DialogContext} from './internals/context'
import type {DialogBaseProps} from './types'

export const DialogRootBase = refFactory<HTMLDialogElement, DialogBaseProps>((props, ref) => {
  const {
    dialogMode = 'modal',
    open = false,

    preventFocus = false,
    preventClose = false,

    onMouseDown,
    children,
    ...htmlDialogAttributes
  } = props

  const dialogRef = useDOMRef(ref)

  const handleCloseDialog = useCallback(
    (dialogReturnValue?: string) => {
      if (!isDOMAvailable || !dialogRef.current) {
        return
      }

      dialogRef.current.close(dialogReturnValue)
    },
    [dialogRef],
  )

  const handleMouseDown = useCallback<MouseEventHandler<HTMLDialogElement>>(
    (e) => {
      if (!dialogRef.current) {
        return
      }

      onMouseDown?.(e)
      if (!(e.target instanceof HTMLDialogElement) || preventClose) {
        return
      }

      // Close the dialog if the user click to the dialog elements itself (eg: the backdrop)
      if (e.target.nodeName === 'DIALOG') {
        handleCloseDialog('dismiss')
      }
    },
    [dialogRef, onMouseDown, preventClose, handleCloseDialog],
  )

  const handleCancelDialog = useCallback<ReactEventHandler<HTMLDialogElement>>(
    (e) => preventClose && e.preventDefault(),
    [preventClose],
  )

  useEffect(() => {
    if (!isDOMAvailable || !dialogRef.current) {
      return
    }

    const DialogElement = dialogRef.current
    if (open) {
      if (preventFocus) {
        DialogElement.setAttribute('inert', '')
      }

      DialogElement[dialogMode === 'modal' ? 'showModal' : 'show']()
      DialogElement.removeAttribute('inert')
      return
    }

    handleCloseDialog()
  }, [open, dialogRef, preventFocus, handleCloseDialog, dialogMode])

  return (
    <dialog
      {...htmlDialogAttributes}
      ref={dialogRef}
      onMouseDown={handleMouseDown}
      onCancel={handleCancelDialog}
    >
      <DialogContext.Provider value={{onClose: htmlDialogAttributes.onClose}}>
        {children}
      </DialogContext.Provider>
    </dialog>
  )
})

export function DialogHeaderBase({
  children,
  ...dialogHeaderProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <header {...dialogHeaderProps}>{children}</header>
}

export function DialogTitleBase({
  children,
  ...dialogTitleProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <h2 {...dialogTitleProps}>{children}</h2>
}

type DialogCloseButtonBaseProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'children'
>

/** Close button for the Dialog component. Only render if the Dialog's `onClose` prop is provided. */
export function DialogCloseButtonBase(props: DialogCloseButtonBaseProps) {
  const {onClose} = useDialogContext()

  if (!onClose) {
    return null
  }

  return (
    <button type="button" {...props} onClick={onClose}>
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

export function DialogContentBase({
  children,
  ...dialogContentProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <article {...dialogContentProps}>{children}</article>
}

export function DialogFooterBase({
  children,
  ...dialogFooterProps
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return <footer {...dialogFooterProps}>{children}</footer>
}

DialogRootBase.displayName = DIALOG_BASE_DISPLAY_NAME.ROOT
DialogHeaderBase.displayName = DIALOG_BASE_DISPLAY_NAME.HEADER
DialogTitleBase.displayName = DIALOG_BASE_DISPLAY_NAME.TITLE
DialogCloseButtonBase.displayName = DIALOG_BASE_DISPLAY_NAME.CLOSE_BTN
DialogContentBase.displayName = DIALOG_BASE_DISPLAY_NAME.CONTENT
DialogFooterBase.displayName = DIALOG_BASE_DISPLAY_NAME.FOOTER

/**
 * Display overlay area on top of a page, represents a modal or non-modal dialog box.
 * Build on top of the native HTML [`<dialog/>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element.
 * ___
 * The `DialogBase` component and its compound components provide the core structure and behavior of the dialog,
 * while the styled `Dialog` component offers a more polished and customizable version.
 * You can use `DialogBase` if you need more control over the styling and structure.
 */
export const DialogBase = Object.assign(DialogRootBase, {
  Header: DialogHeaderBase,
  Title: DialogTitleBase,
  CloseButton: DialogCloseButtonBase,
  Content: DialogContentBase,
  Footer: DialogFooterBase,
})
