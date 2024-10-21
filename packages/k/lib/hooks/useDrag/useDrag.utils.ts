import {clamp} from '#utils'
import type {DraggableOptions, DragPosition} from './useDrag.types'

export const getNearestScale = (value: number, stepSize: number) => {
  if (stepSize === 0 || stepSize === 1) {
    return value
  }

  const prevStep = Math.floor(value / stepSize) * stepSize
  const nextStep = Math.ceil(value / stepSize) * stepSize
  return value - prevStep > nextStep - value ? nextStep : prevStep
}

export const getImposedLimitPosition = (
  {x, y}: DragPosition,
  direction: DraggableOptions['direction'] = 'both',
  limit?: DraggableOptions['limit'],
): {limittedPosition: DragPosition; isLimitExceeded: boolean} => {
  const limittedPosition: DragPosition = {
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
  {x, y}: DragPosition,
  limit?: DraggableOptions['limit'],
): DragPosition => {
  const result: DragPosition = {x, y}
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
