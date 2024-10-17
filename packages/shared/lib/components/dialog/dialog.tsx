'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  type MouseEventHandler,
  type ReactEventHandler,
} from 'react'
import {useDOMRef} from '#hooks'
import {classNames, isDOMAvailable, updateElementStyles} from '#utils'
import {DialogHeader} from './dialog-header'
import {DialogTitle} from './dialog-title'
import {DialogCloseButton} from './dialog-close-btn'
import {DialogContent} from './dialog-content'
import {DialogFooter} from './dialog-footer'
import type {DialogProps} from './types'
import {DialogContext} from './context'
import {DIALOG_CLASSES, DIALOG_CSS_VARIABLES, DIALOG_DISPLAY_NAME} from './constants'
import {useBackdropStyling} from './hooks'
import classes from './styles/dialog.module.css'

const DialogRoot = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const {
    variant = 'default',
    position = 'right',
    dialogMode = 'modal',
    open = false,

    preventFocus = false,
    preventClose = false,

    className,
    backdropProps,
    offset = 0,

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

  useBackdropStyling(dialogRef, backdropProps)

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

  useEffect(() => {
    updateElementStyles(dialogRef.current, {
      [DIALOG_CSS_VARIABLES.OFFSET]: typeof offset === 'number' ? `${offset}px` : offset,
    })
  }, [dialogRef, offset])

  return (
    <dialog
      {...htmlDialogAttributes}
      ref={dialogRef}
      className={classNames(
        DIALOG_CLASSES.ROOT,
        classes.dialog,
        `${DIALOG_CLASSES.ROOT}--${dialogMode}`,
        classes[dialogMode],
        `${DIALOG_CLASSES.ROOT}--${variant}`,
        classes[variant],
        variant === 'drawer' ? `${DIALOG_CLASSES.ROOT}--${position} ${classes[position]}` : '',
        className,
      )}
      onMouseDown={handleMouseDown}
      onCancel={handleCancelDialog}
      data-offset={offset || undefined}
    >
      <DialogContext.Provider value={{onClose: htmlDialogAttributes.onClose}}>
        {children}
      </DialogContext.Provider>
    </dialog>
  )
})

DialogRoot.displayName = DIALOG_DISPLAY_NAME.ROOT

export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Title: DialogTitle,
  CloseButton: DialogCloseButton,
  Content: DialogContent,
  Footer: DialogFooter,
})
