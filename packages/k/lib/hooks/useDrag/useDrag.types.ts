import type {RefObject} from 'react'

export type UseDragPosition = {x: number; y: number}
export type UseDragRelativeLimit =
  | 'client-size'
  | 'client-no-padding'
  | 'offset-size'
  | 'offset-no-padding'

export type UseDragSetPosition = (
  position: UseDragPosition,
  options?: {
    /**
     * CSS transition for the position change.
     *
     * Note that this hook will transform the target element by using CSS [translate](https://developer.mozilla.org/docs/Web/CSS/translate) if the browser supports it, otherwise `transform`.
     * ___
     * If `true`, the transition will be
     * `{property} 500ms cubic-bezier(0.32, 0.72, 0, 1)` - `transition-property` is [translate](https://developer.mozilla.org/docs/Web/CSS/translate) if the browser supports it, otherwise `transform`.
     * @default undefined // no transition
     */
    transition?: string | true
    /**
     * If `stepSize` > 0 and you wanna manually update the position, consider set this option to `true` to skip the default calculation.
     * @default false
     */
    skipCalulateStep?: boolean
    /**
     * By default, the hook will transform the target element for you.
     *
     * Enable this flag to allow updating the returned `position` state and manually handle the transform animation,
     * your component will rerender on every position value change.
     *
     * @default false
     */
    shouldUpdatePositionState?: boolean
  },
) => void

type UnCachedOptions<T extends HTMLElement = HTMLElement> = {
  /**
   * Ref to drag element
   * This hook will tracking the provided ref element
   * instead of its own target ref (and also won't return it anymore).
   * @default undefined
   */
  targetRef?: RefObject<T>
  /**
   * Limit dragging distance. Higher priority than `relativeLimit`.
   *
   * @default undefined // no limit
   */
  limit?: {
    x?: {max?: number; min?: number}
    y?: {max?: number; min?: number}
  }
  /**
   * Limit dragging distance relatively to the **direct** parent element. Will be ignored if `limit` is provided.
   *
   * `relativeLimit` does't observe the parent element's size changes, you will need to update the `limit` manually (eg: via {@link https://developer.mozilla.org/docs/Web/API/Resize_Observer_API Resize Observer API}).
   * ___
   * Limit the dragging distance by:
   * - `"client"`: [Recommended] parent element's client size (includes padding but excludes borders, margins). **DO NOT** use this option when parent is an inline element.
   * - `"client-no-padding"`: same as `"client"` but excludes padding.
   * - `"offset"`: parent element's offset size (including borders, padding).
   * - `"offset-no-padding"`: same as `"offset"` but excludes padding.
   *
   * @default undefined // no limit
   */
  relativeLimit?: UseDragRelativeLimit
  /**
   * Position step size
   * @default 0
   */
  stepSize?: number | UseDragPosition
  onStart?: (
    target: RefObject<T>,
    position: UseDragPosition,
    setPosition: UseDragSetPosition,
  ) => void
  /**
   * Callback function that triggers when users dragging the HTML element.
   *
   * Recommend passing a memorized function or a function from the parent of the component that contains draggable element.
   */
  onMove?: (target: RefObject<T>, position: UseDragPosition) => void
  onEnd?: (target: RefObject<T>, position: UseDragPosition, setPosition: UseDragSetPosition) => void
}

export type UseDragFlags = {
  /**
   * Listen touch events
   * ___
   * ***Note***: This hook will treat pointer events caused by a pen or stylus device (`pointerType === 'pen'`) same as touch events.
   *
   * @default true
   */
  touch?: boolean
  /**
   * Listen mouse's main button events (usually left-click)
   * @default true
   */
  mouse?: boolean
  /**
   * Dragging direction
   * @default 'both'
   */
  direction?: 'vertical' | 'horizontal' | 'both'
  /**
   * Allow dragging over the limit, and enable deceleration effect.
   *
   * After releasing (`pointercancel` or `pointerup` event),
   * the target element will move back to the nearest limit position.
   * ___
   * Only available when `limit` or `relativeLimit` is provided.
   * @default false
   */
  decelerationEffect?: boolean
  /**
   * Set to `true` to allow update position state onMove and manually handle styling such as CSS transform.
   * @default false
   */
  manualStylingOnMove?: boolean
  /**
   * Enable debouncing for the `setPosition` setter in millisecond (ms). Used for manually handling the moving transform animation (`manualStylingOnMove = true`)
   * by using returned position state instead of the `onMove` event.
   *
   * It doesn't affect the default `onMove` transform animation (`manualStylingOnMove = false`).
   * @default 0
   */
  returnedPositionDebounceTime?: number
  /**
   * By default, the hook will add `will-change: transform` and `touch-action: none` to the target element.
   * @default true
   */
  addBrowserHintStyles?: boolean
  /** @default false */
  ignorePointerCancel?: boolean
  /**
   * If `true`, the target element won't draggable anymore.
   * ___
   * Equivalent to `touch === false && mouse === false`
   * ___
   * @default false
   */
  disabled?: boolean
}

export type UseDragOptions<T extends HTMLElement = HTMLElement> = UseDragFlags & UnCachedOptions<T>
export type UseDragReturnsType<T extends HTMLElement = HTMLElement> = Readonly<{
  /**
   * Target element ref.
   * @returns a RefObject of `null` when `options.targetRef` is provided or the target element is not found.
   */
  targetRef: RefObject<T>
  /** Position state {x, y} */
  position: UseDragPosition
  /**
   * Update element position relative to the initial position.
   * By default, this won't rerender component and the hook will transform the target element for you.
   * ___
   * Enable {@link SetPosition `shouldUpdatePositionState`} option to allow updating the returned `position` state and then you can manually handle the transform animation.
   * Please note that, your component will rerender on `position` state changes.
   */
  setPosition: UseDragSetPosition
}>
