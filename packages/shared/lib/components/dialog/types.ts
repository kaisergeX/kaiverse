import type {CSSProperties, DialogHTMLAttributes} from 'react'

export type DialogStylingSelectors = 'header' | 'content' | 'footer'

type DialogSharedProps = {
  classNames?: Partial<Record<DialogStylingSelectors, string>>
  /**
   * It is NOT recommended to use this prop, as the `classNames` prop is more flexible and has better performance.
   * ___
   * ***Note:** `styles[key]`'s value will be ignored if the related element's `style` property is provided.
   *
   * @example
   * ```tsx
   * <Dialog
   *    styles={{header: {backgroundColor: 'red'}}}
   * >
   *    <Dialog.Header style={{backgroundColor: 'blue'}}>Header</Dialog.Header>
   * </Dialog>
   * ```
   * In this case, `styles.header` will be ignored, the Dialog's header will have a blue background color.
   */
  styles?: Partial<Record<DialogStylingSelectors, CSSProperties>>
  backdropProps?: {
    /** @default rgba(0,0,0,0.4) */
    background?: string
    /** @default 0 */
    blur?: string | number
    /** @default 1 */
    opacity?: number
  }
  /**
   * @default "modal"
   * @description
   * `modal`
   *
   * Act as a normal dialog.
   * It will be rendered on the top-layer with a backdrop.
   *
   * Everything other than the dialog and
   * its contents will be ignored by the browsers and can't be interact with.
   * ___
   * `non-modal`
   *
   * It has no backdrop and also doesn't render on the top-layer.
   * It can not be closed by pressing the `ESC` key.
   *
   * The content below the non-modal dialog can be interacted.
   *
   * {@link https://developer.mozilla.org/docs/Web/HTML/Element/dialog#accessibility_considerations Read more}
   *
   */
  dialogMode?: 'non-modal' | 'modal'
  /**
   * If `true`, disable a default behavior of `<dialog>` element:
   *
   * Browser won't autofocus on the first nested focusable element anymore.
   * @default false
   */
  preventFocus?: boolean
  /**
   * If `true`, the dialog won't close when users press `Escape` key or click/tap on the backdrop.
   * @default false
   */
  preventClose?: boolean
  onClose?: () => void
}

type DialogDefaultProps = {
  /**
   * Display overlay area on top of a page (top-layer). Build on top of the native HTML `<dialog/>` element.
   *
   * Browsers released starting from 2022 are fully supported https://developer.mozilla.org/docs/Web/HTML/Element/dialog#browser_compatibility.
   */
  variant?: 'default'
  position?: never
}

type DrawerProps = {
  variant: 'drawer'
  /**
   * Position of the drawer. It only available when `variant` is set to `drawer`.
   * @default 'right'
   */
  position?: 'right' | 'bottom' | 'left' | 'top'
}

type CombinedVariantProps = DialogSharedProps & (DialogDefaultProps | DrawerProps)

export type DialogProps = CombinedVariantProps &
  Omit<
    DialogHTMLAttributes<HTMLDialogElement>,
    keyof CombinedVariantProps | 'tabIndex' | 'autoFocus'
  >
