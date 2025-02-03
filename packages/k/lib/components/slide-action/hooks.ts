import {useCallback, useEffect, useMemo, useState} from 'react'
import type {SlideDraggerParams, SlideDraggerProps} from './slide-action.types'
import {useDrag, type DragHookOptions} from '#hooks'
import {isDOMAvailable} from '#utils'

export const useSlideActionDragger = ({
  slideRef,
  onDrag,
  onDragEnd,
  disableDrag = false,
}: SlideDraggerProps) => {
  const [draggerWidth, setDraggerWidth] = useState(0)

  const slideDraggerInfo = useMemo<SlideDraggerParams>(() => {
    if (!isDOMAvailable || !slideRef.current) {
      return {draggerWidth, maxSlideDistance: 0}
    }

    const computedStyle = window.getComputedStyle(slideRef.current)
    const slideContainerPaddingX =
      parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

    return {
      draggerWidth,
      maxSlideDistance: slideRef.current.offsetWidth - slideContainerPaddingX - draggerWidth,
    }
  }, [draggerWidth, slideRef])

  const dragLimit = useMemo(
    () => ({x: {min: 0, max: slideDraggerInfo.maxSlideDistance}}),
    [slideDraggerInfo.maxSlideDistance],
  )

  const processedOnDrag = useCallback<NonNullable<DragHookOptions['onMove']>>(
    (...params) => onDrag?.(slideDraggerInfo, ...params),
    [onDrag, slideDraggerInfo],
  )

  const processedOnDragEnd = useCallback<NonNullable<DragHookOptions['onEnd']>>(
    (...params) => onDragEnd?.(slideDraggerInfo, ...params),
    [onDragEnd, slideDraggerInfo],
  )

  const {targetRef: slideDraggerRef, setPosition: setDraggerPosition} = useDrag<HTMLButtonElement>({
    direction: 'horizontal',
    limit: dragLimit,
    onMove: processedOnDrag,
    onEnd: processedOnDragEnd,
    disabled: disableDrag,
  })

  useEffect(() => {
    if (!isDOMAvailable || !slideDraggerRef.current) {
      return
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const target = entries[0]?.target
      if (!(target instanceof HTMLButtonElement)) {
        return
      }

      setDraggerWidth(target.offsetWidth)
    })

    resizeObserver.observe(slideDraggerRef.current)
    return () => resizeObserver.disconnect()
  }, [slideDraggerRef])

  return {slideDraggerRef, setDraggerPosition}
}
