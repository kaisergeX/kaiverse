'use client'

import {useCallback, useEffect, useMemo, useRef, type RefObject} from 'react'
import {isDOMAvailable} from '#utils'
import {useDebouncedState} from '../useDebouncedState'
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect'
import {getDeceleratedPosition, getImposedLimitPosition, getNearestScale} from './useDrag.utils'
import type {DraggableOptions, DragPosition, SetPosition, UseDragFlags} from './useDrag.types'

let initTransition: string | null = null

const TRANSFORM_DURATION = 500 // ms
const TRANSFORM_TIMING_FN = 'cubic-bezier(0.32, 0.72, 0, 1)'

export const useDrag = <T extends HTMLElement = HTMLElement>(
  useDragOptions: DraggableOptions<T> = {},
): {
  /**
   * Target element ref.
   * @returns a RefObject of `null` if `options.targetRef` is provided or the target element is not found.
   */
  target: RefObject<T>
  /** Position state {x, y} */
  position: DragPosition
  /** Function to set a new position value. */
  setPosition: SetPosition
} => {
  const {
    targetRef: customTargetRef,
    onStart,
    onMove,
    onEnd,
    limit,
    stepSize: unprocessedStep = 0,
    ...primitiveFlags
  } = useDragOptions

  // Only process primitive options
  const opts = useMemo<UseDragFlags>(() => {
    const processingOptions: UseDragFlags = {
      // the default options
      touch: true,
      mouse: true,
      direction: 'both',
      decelerationEffect: false,
      manualStylingOnMove: false,
      returnedPositionDebounceTime: 0,
      addBrowserHintStyles: true,
      ignorePointerCancel: false,
      disabled: false,

      // customize/override the default options
      ...primitiveFlags,
    }

    if (processingOptions.disabled) {
      processingOptions.mouse = false
      processingOptions.touch = false
    }

    return processingOptions
  }, [primitiveFlags])

  const stepSize = useMemo<DragPosition>(
    () =>
      typeof unprocessedStep === 'object'
        ? unprocessedStep
        : {x: unprocessedStep, y: unprocessedStep},
    [unprocessedStep],
  )

  const targetRef = useRef<T>(null)
  const target = customTargetRef || targetRef
  const startXY = useRef<DragPosition>({x: 0, y: 0})
  const prevPosition = useRef<DragPosition>({x: 0, y: 0})
  const dragging = useRef(false)
  const [position, setPosition] = useDebouncedState<DragPosition>(
    {x: 0, y: 0},
    opts.returnedPositionDebounceTime ?? 0,
  )
  const isSupportTranslate = isDOMAvailable ? CSS.supports('translate', '0') : false

  const defaultTransition = `${
    isSupportTranslate ? 'translate' : 'transform'
  } ${TRANSFORM_DURATION}ms ${TRANSFORM_TIMING_FN}`

  const setTransform = useCallback<SetPosition>(
    (newPosition, options) => {
      if (!target.current) {
        return
      }

      if (!options?.skipCalulateStep && (stepSize.x || stepSize.y)) {
        newPosition = {
          x: getNearestScale(position.x, stepSize.x),
          y: getNearestScale(position.y, stepSize.y),
        }
      }

      prevPosition.current = newPosition
      if (options?.shouldUpdatePositionState) {
        if (position.x !== newPosition.x || position.y !== newPosition.y) {
          setPosition(newPosition)
        }

        return
      }

      const targetStyle = target.current.style
      if (!options?.transition) {
        targetStyle.removeProperty('transition')
      } else {
        targetStyle.setProperty(
          'transition',
          options.transition === true ? defaultTransition : options.transition,
        )
      }

      if (isSupportTranslate) {
        targetStyle.setProperty('translate', `${newPosition.x}px ${newPosition.y}px`)
      } else {
        targetStyle.setProperty(
          'transform',
          `translate3d(${newPosition.x}px, ${newPosition.y}px, 0)`,
        )
      }
    },
    [
      defaultTransition,
      isSupportTranslate,
      stepSize.x,
      stepSize.y,
      position.x,
      position.y,
      setPosition,
      target,
    ],
  )

  const skipPointerEvent = useCallback<(e: PointerEvent) => boolean>(
    (event) => {
      if (opts.disabled) {
        return true
      }

      switch (event.pointerType) {
        case 'mouse': {
          if (!opts.mouse) {
            return true
          }

          // onpointermove event - the event.button will have value -1 (unchanged) https://w3c.github.io/pointerevents/#the-button-property
          if (event.type === 'pointermove') {
            return event.button !== -1
          }

          return event.button !== 0 // only handle main button event (usually left-click)
        }

        case 'touch':
        case 'pen':
          return !opts.touch

        // skip undetected pointer type
        default:
          return true
      }
    },

    [opts.disabled, opts.mouse, opts.touch],
  )

  const handlePointerStart = useCallback(
    (e: PointerEvent) => {
      if (skipPointerEvent(e)) {
        return
      }

      const currentTarget = e.currentTarget as HTMLElement
      if (currentTarget) {
        // Ensure we maintain correct pointer capture even when going outside of the target element
        currentTarget.setPointerCapture(e.pointerId)
      }

      target.current?.style?.removeProperty('transition')
      const {x: prevX, y: prevY} = prevPosition.current
      dragging.current = true

      const startPosition: DragPosition = {
        x: e.clientX - prevX,
        y: e.clientY - prevY,
      }
      startXY.current = startPosition
      onStart?.(target, startPosition, setTransform)
    },
    [onStart, setTransform, skipPointerEvent, target],
  )

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      if (!dragging.current) {
        return
      }

      if (skipPointerEvent(e)) {
        return
      }

      const {x: startX, y: startY} = startXY.current
      const {x: prevX, y: prevY} = prevPosition.current
      let x = opts.direction === 'vertical' ? 0 : e.clientX - startX,
        y = opts.direction === 'horizontal' ? 0 : e.clientY - startY

      if (x === prevX && y === prevY) {
        return
      }

      if (opts.decelerationEffect) {
        const deceleratedPosition = getDeceleratedPosition({x, y}, limit)
        x = deceleratedPosition.x
        y = deceleratedPosition.y
      } else {
        const {limittedPosition} = getImposedLimitPosition({x, y}, opts.direction, limit)
        x = limittedPosition.x
        y = limittedPosition.y
      }

      if (stepSize.x || stepSize.y) {
        x = getNearestScale(x, stepSize.x)
        y = getNearestScale(y, stepSize.y)
      }

      const newPosition: DragPosition = {x, y}
      onMove?.(target, newPosition)
      setTransform(newPosition, {
        skipCalulateStep: true,
        shouldUpdatePositionState: opts.manualStylingOnMove,
      })
    },
    [
      onMove,
      opts.decelerationEffect,
      opts.direction,
      limit,
      opts.manualStylingOnMove,
      stepSize.x,
      stepSize.y,
      setTransform,
      skipPointerEvent,
      target,
    ],
  )

  const handlePointerEnd = useCallback(
    (e: PointerEvent) => {
      // only trigger this function if the target element is being dragged.
      if (!dragging.current) {
        return
      }

      if (skipPointerEvent(e)) {
        return
      }

      const currentTarget = e.currentTarget as HTMLElement
      if (currentTarget && currentTarget.hasPointerCapture(e.pointerId)) {
        currentTarget.releasePointerCapture(e.pointerId)
      }

      if (opts.decelerationEffect && limit) {
        // When decelerationEffect enabled, dragging over the limit is allowed.
        const {limittedPosition, isLimitExceeded} = getImposedLimitPosition(
          prevPosition.current,
          opts.direction,
          limit,
        )

        if (isLimitExceeded) {
          // After releasing the pointer, the target element will move back to the nearest limit position.
          setTransform(limittedPosition, {
            skipCalulateStep: true,
            transition: true,
          })
        }
      } else {
        target.current?.style?.setProperty('transition', initTransition)
      }

      dragging.current = false
      onEnd?.(target, prevPosition.current, setTransform)
    },
    [onEnd, opts.decelerationEffect, opts.direction, limit, setTransform, skipPointerEvent, target],
  )

  useEffect(() => {
    if (!isDOMAvailable) {
      return
    }

    const node = target.current
    if (!node) {
      return
    }

    node.addEventListener('pointerdown', handlePointerStart)
    node.addEventListener('pointermove', handlePointerMove)
    node.addEventListener('pointerup', handlePointerEnd)
    if (!opts.ignorePointerCancel) {
      node.addEventListener('pointercancel', handlePointerEnd)
    }

    return () => {
      node.removeEventListener('pointerdown', handlePointerStart)
      node.removeEventListener('pointermove', handlePointerMove)
      node.removeEventListener('pointerup', handlePointerEnd)
      if (!opts.ignorePointerCancel) {
        node.removeEventListener('pointercancel', handlePointerEnd)
      }
    }
  }, [handlePointerEnd, handlePointerMove, handlePointerStart, opts.ignorePointerCancel, target])

  useIsomorphicLayoutEffect(() => {
    if (!isDOMAvailable || !target.current) {
      return
    }

    initTransition = target.current.style.getPropertyValue('transition') || null
    if (!opts.addBrowserHintStyles) {
      return
    }

    target.current.style.setProperty('will-change', 'transform')
    target.current.style.setProperty('touch-action', 'none')
  }, [target, opts.addBrowserHintStyles])

  return {
    target,
    position,
    setPosition: setTransform,
  }
}
