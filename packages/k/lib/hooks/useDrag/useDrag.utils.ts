import {clamp} from '#utils'
import {useEffect, useState} from 'react'
import type {DragHookOptions, DragHookPosition} from './useDrag.types'
import type {NullableRefObject} from '#types'

export const getNearestScale = (value: number, stepSize: number) => {
  if (stepSize === 0 || stepSize === 1) {
    return value
  }

  const prevStep = Math.floor(value / stepSize) * stepSize
  const nextStep = Math.ceil(value / stepSize) * stepSize
  return value - prevStep > nextStep - value ? nextStep : prevStep
}

export const getImposedLimitPosition = (
  {x, y}: DragHookPosition,
  direction: DragHookOptions['direction'] = 'both',
  limit?: DragHookOptions['limit'],
): {limittedPosition: DragHookPosition; isLimitExceeded: boolean} => {
  const limittedPosition: DragHookPosition = {
    x:
      direction === 'vertical'
        ? 0
        : clamp(x, [
            limit?.x?.min ?? Number.NEGATIVE_INFINITY,
            limit?.x?.max ?? Number.POSITIVE_INFINITY,
          ]),
    y:
      direction === 'horizontal'
        ? 0
        : clamp(y, [
            limit?.y?.min ?? Number.NEGATIVE_INFINITY,
            limit?.y?.max ?? Number.POSITIVE_INFINITY,
          ]),
  }

  return {
    limittedPosition,
    isLimitExceeded: limittedPosition.x !== x || limittedPosition.y !== y,
  }
}

const getDecelerationFactor = (originVelocity: number): number =>
  8 * (Math.log(Math.abs(originVelocity) + 1) - 2)

/**
 * Decelerate after the origin velocity is over the limit.
 * @example getDeceleratedVelocity(10, 100) // 11
 *
 */
const getDeceleratedVelocity = (origin: number, limit: number): number => {
  const decelerationFactor = getDecelerationFactor(origin - limit)

  if (limit > 0) {
    return Math.min(limit + Math.max(decelerationFactor, 0), origin)
  }

  return Math.max(limit + Math.min(decelerationFactor * -1, 0), origin)
}

export const getDeceleratedPosition = (
  {x, y}: DragHookPosition,
  limit?: DragHookOptions['limit'],
): DragHookPosition => {
  const result: DragHookPosition = {x, y}
  const limitMinX = limit?.x?.min
  const limitMaxX = limit?.x?.max
  const limitMinY = limit?.y?.min
  const limitMaxY = limit?.y?.max

  if (limitMinY !== undefined && y < limitMinY) {
    result.y = getDeceleratedVelocity(y, limitMinY)
  }

  if (limitMaxY !== undefined && y > limitMaxY) {
    result.y = getDeceleratedVelocity(y, limitMaxY)
  }

  if (limitMinX !== undefined && x < limitMinX) {
    result.x = getDeceleratedVelocity(x, limitMinX)
  }

  if (limitMaxX !== undefined && x > limitMaxX) {
    result.x = getDeceleratedVelocity(x, limitMaxX)
  }

  return result
}

export const useRelativeLimit = <T extends HTMLElement = HTMLElement>(
  dragElementRef: NullableRefObject<T>,
  relativeLimit: DragHookOptions<T>['relativeLimit'],
): DragHookOptions<T>['limit'] => {
  const [limit, setLimit] = useState<DragHookOptions<T>['limit']>()

  useEffect(() => {
    const target = dragElementRef.current
    const parent = target?.parentElement
    if (!relativeLimit || !target || !parent) {
      return
    }

    let draggableX = parent.offsetWidth,
      draggableY = parent.offsetHeight

    if (relativeLimit === 'client-size' || relativeLimit === 'client-no-padding') {
      draggableX = parent.clientWidth
      draggableY = parent.clientHeight

      // draggableX, draggableY could be 0 on some cases (eg: parent is an inline element and relativeLimit is 'client-*').
      // In 'client-*' mode, parent should not be an inline element,
      if (draggableX === 0 && draggableY === 0) {
        return
      }
    }

    const targetRect = target.getBoundingClientRect()
    const parentRect = parent.getBoundingClientRect()

    /**
     * sure we can use `target.offsetTop` instead, but in order to get the correct offset,
     * user will be forced to make the parent element becomes positioned (`relative`, `absolute`, or `fixed`).
     */
    const targetOffsetTop = targetRect.top - parentRect.top
    const targetOffsetLeft = targetRect.left - parentRect.left

    let minX = -targetOffsetLeft,
      minY = -targetOffsetTop,
      maxX = draggableX - target.offsetWidth - targetOffsetLeft,
      maxY = draggableY - target.offsetHeight - targetOffsetTop

    const parentComputedStyle = window.getComputedStyle(parent)
    if (relativeLimit === 'client-size' || relativeLimit === 'client-no-padding') {
      const parentBorder = {
        top: parseFloat(parentComputedStyle.borderTopWidth),
        right: parseFloat(parentComputedStyle.borderRightWidth),
        bottom: parseFloat(parentComputedStyle.borderBottomWidth),
        left: parseFloat(parentComputedStyle.borderLeftWidth),
      }

      minX += parentBorder.left
      minY += parentBorder.top
      maxX += parentBorder.right
      maxY += parentBorder.bottom
    }

    if (relativeLimit !== 'client-no-padding' && relativeLimit !== 'offset-no-padding') {
      const parentPadding = {
        top: parseFloat(parentComputedStyle.paddingTop),
        right: parseFloat(parentComputedStyle.paddingRight),
        bottom: parseFloat(parentComputedStyle.paddingBottom),
        left: parseFloat(parentComputedStyle.paddingLeft),
      }
      minX += parentPadding.left
      minY += parentPadding.top
      maxX -= parentPadding.right
      maxY -= parentPadding.bottom
    }

    setLimit({
      x: {min: minX, max: maxX},
      y: {min: minY, max: maxY},
    })
  }, [dragElementRef, relativeLimit])

  return limit
}
