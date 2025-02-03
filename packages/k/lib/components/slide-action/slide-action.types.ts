import type {DragHookOptions} from '#hooks'
import type {NullableRefObject} from '#types'
import type {CSSProperties, HTMLAttributes, ReactElement} from 'react'

type SlideActionStylingSelectors = 'dragger' | 'label' | 'progress'

type Props = {
  /** Applies className to related element. */
  classNames?: Partial<Record<SlideActionStylingSelectors, string>>
  /**
   * Applies inline styles to related element.
   *
   * It is NOT recommended to use this prop, as the `classNames` prop is more flexible and has better performance.
   */
  styles?: Partial<Record<SlideActionStylingSelectors, CSSProperties>>
  icon?: ReactElement
  label?: string
  /**
   * Component theme color, value for `--k-slide-action-theme` CSS variable.
   *
   * @example
   * ```tsx
   * <SlideAction color='--your-custom-color'>...</SlideAction>
   * // or
   * <SlideAction color='var(--your-custom-color)'>...</SlideAction>
   * // or
   * <SlideAction color='#0123af'>...</SlideAction>
   * ```
   */
  color?: string
  /**
   * Trigger when component's status changes
   * @type {SlideActionOnChange}
   */
  onChange?: (isSuccess: boolean) => void
  /**
   * Trigger when users swiped all the way to the end. It will be considered as a successful or confirmatory action.
   *
   * Call the `reset()` function to reset the component status.
   * @type {SlideActionOnSwipeEnd}
   */
  onSwipeEnd?: (reset: () => void) => void
  /**
   * ⚠️ Avoid enabling this flag as much as possible.
   *
   * If you wanna reset this component, please use the `reset()` function that shipped with `onSwipeEnd` instead.
   * ___
   * ⚠️ **Accessibility considerations** (Act unintentionally)
   *
   * Since an action is a successful action when they dragged/swiped this component all the way to the end.
   * If users tap & release without dragging, this component will assume that it is another successful or confirmatory action. As a result, onSwipeEnd will be re-triggered.
   *
   * @default false
   */
  allowSwipeAfterEnd?: boolean
  compact?: boolean

  /** @default 'default' */
  labelType?: 'default' | 'slide'

  /** @default 'slide' */
  slideType?: 'slide' | 'static'
}

/**
 * Trigger when users swiped all the way to the end. It will be considered as a successful or confirmatory action.
 *
 * Call the `reset()` function to reset the component status.
 */
export type SlideActionOnSwipeEnd = NonNullable<Props['onSwipeEnd']>
export type SlideActionOnChange = NonNullable<Props['onChange']>

type SlideActionAttrs<T> = Omit<T, keyof Props>

export type SlideActionProps = Props & SlideActionAttrs<HTMLAttributes<HTMLDivElement>>

export type SlideActionRef = SlideActionAttrs<HTMLDivElement> &
  Readonly<{
    /**
     * Reset the component status.
     *
     * As a result, the `onChange` callback will be fired (with `isSuccess` is `false`).
     */
    resetState: () => void
  }>

export type SlideDraggerParams = {
  draggerWidth: number
  maxSlideDistance: number
}

export type SlideDraggerProps = {
  slideRef: NullableRefObject<HTMLDivElement>
  onDrag?: (
    slideDraggerInfo: SlideDraggerParams,
    ...params: Parameters<NonNullable<DragHookOptions['onMove']>>
  ) => void
  onDragEnd?: (
    slideDraggerInfo: SlideDraggerParams,
    ...params: Parameters<NonNullable<DragHookOptions['onEnd']>>
  ) => void
  disableDrag?: boolean
}
