import {
  forwardRef,
  useCallback,
  useEffect,
  type MouseEventHandler,
  type ReactEventHandler,
} from 'react'
import {useDOMRef} from '#hooks'
import {classNames} from '#utils'
import {useBackDropStyling} from './useBackDropStyling'
import DialogHeader from './dialog-header'
import DialogFooter from './dialog-footer'
import type {DialogProps} from './types'
import {dialogPickChild} from './utils'
import {DIALOG_CLASSES} from './constants'
import classes from './styles/dialog.module.css'

const Dialog = forwardRef<HTMLDialogElement, DialogProps>((props, ref) => {
  const {
    variant = 'default',
    position = 'right',
    dialogMode = 'modal',
    open = false,

    preventFocus = false,
    preventClose = false,

    className,
    classNames: stylingClassNames,
    styles,
    backdropProps,

    onClose,
    onMouseDown,
    children,
    ...htmlDialogAttributes
  } = props
  const dialogRef = useDOMRef(ref)

  const handleCloseDialog = useCallback(
    (dialogReturnValue?: string) => {
      if (typeof document === 'undefined' || !dialogRef.current) {
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

  const {matchedNode: DialogHeaderElement, rest: OtherElementsExceptHeader} = dialogPickChild(
    children,
    DialogHeader,
    {className: stylingClassNames?.header, style: styles?.header, onClose},
  )

  const {matchedNode: DialogFooterElement, rest: OtherElements} = dialogPickChild(
    OtherElementsExceptHeader,
    DialogFooter,
    {className: stylingClassNames?.footer, style: styles?.footer},
  )

  useBackDropStyling(dialogRef, backdropProps)

  useEffect(() => {
    if (typeof document === 'undefined' || !dialogRef.current) {
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
      onClose={onClose}
    >
      {DialogHeaderElement}

      {OtherElements?.length ? (
        <article
          className={classNames(
            DIALOG_CLASSES.CONTENT,
            classes.dialogContent,
            stylingClassNames?.content ?? '',
          )}
          style={styles?.content}
        >
          {OtherElements}
        </article>
      ) : null}

      {DialogFooterElement}
    </dialog>
  )
})

Dialog.displayName = 'Dialog'

export default Dialog as typeof Dialog & {
  Header: typeof DialogHeader
  Footer: typeof DialogFooter
}
