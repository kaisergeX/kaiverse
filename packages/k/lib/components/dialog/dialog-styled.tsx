'use client'

import {useDOMRef} from '#hooks'
import {classNames, refFactory, updateElementStyles} from '#utils'
import {useEffect} from 'react'
import {withStyles} from '../hoc/internals'
import {
  DialogBase,
  DialogCloseButtonBase,
  DialogContentBase,
  DialogFooterBase,
  DialogHeaderBase,
  DialogTitleBase,
} from './dialog-base'
import {useBackdropStyling} from './hooks'
import {DIALOG_CLASSES, DIALOG_CSS_VARIABLES, DIALOG_DISPLAY_NAME} from './internals/constants'
import classes from './styles/dialog.module.css'
import type {DialogProps} from './types'

const DialogRoot = refFactory<HTMLDialogElement, DialogProps>(
  ({variant = 'default', position = 'right', backdropProps, offset = 0, ...props}, ref) => {
    const dialogRef = useDOMRef(ref)

    useBackdropStyling(dialogRef, backdropProps)

    useEffect(() => {
      updateElementStyles(dialogRef.current, {
        [DIALOG_CSS_VARIABLES.OFFSET]: typeof offset === 'number' ? `${offset}px` : offset,
      })
    }, [dialogRef, offset])

    return (
      <DialogBase
        {...props}
        ref={ref}
        className={classNames(
          DIALOG_CLASSES.ROOT,
          classes.dialog,
          `${DIALOG_CLASSES.ROOT}--${variant}`,
          classes[variant],
          variant === 'drawer' ? `${DIALOG_CLASSES.ROOT}--${position}` : '',
          variant === 'drawer' ? classes[position] : '',
          props.className,
        )}
        data-offset={offset || undefined}
      />
    )
  },
)

export const DialogHeader = withStyles(
  DialogHeaderBase,
  DIALOG_CLASSES.HEADER,
  classes.dialogHeader,
)
export const DialogTitle = withStyles(DialogTitleBase, DIALOG_CLASSES.TITLE, classes.dialogTitle)
export const DialogCloseButton = withStyles(
  DialogCloseButtonBase,
  DIALOG_CLASSES.CLOSE_BTN,
  classes.closeBtn,
)
export const DialogContent = withStyles(
  DialogContentBase,
  DIALOG_CLASSES.CONTENT,
  classes.dialogContent,
)
export const DialogFooter = withStyles(
  DialogFooterBase,
  DIALOG_CLASSES.FOOTER,
  classes.dialogFooter,
)

DialogRoot.displayName = DIALOG_DISPLAY_NAME.ROOT
DialogHeader.displayName = DIALOG_DISPLAY_NAME.HEADER
DialogTitle.displayName = DIALOG_DISPLAY_NAME.TITLE
DialogCloseButton.displayName = DIALOG_DISPLAY_NAME.CLOSE_BTN
DialogContent.displayName = DIALOG_DISPLAY_NAME.CONTENT
DialogFooter.displayName = DIALOG_DISPLAY_NAME.FOOTER

/**
 * Display overlay area on top of a page, represents a modal or non-modal dialog box.
 * Build on top of the native HTML [`<dialog/>`](https://developer.mozilla.org/docs/Web/HTML/Element/dialog) element.
 */
export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Title: DialogTitle,
  CloseButton: DialogCloseButton,
  Content: DialogContent,
  Footer: DialogFooter,
})
