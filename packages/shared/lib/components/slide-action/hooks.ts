import {useEffect, useMemo, useState} from 'react'
import type {SlideDraggerParams, SlideDraggerProps} from './slide-action.types'
import {useDrag} from '#hooks'

export const useSlideActionDragger = ({
  slideRef,
  onDrag,
  onDragEnd,
  disableDrag = false,
}: SlideDraggerProps) => {
  const [draggerWidth, setDraggerWidth] = useState(0)

  const slideDraggerInfo = useMemo<SlideDraggerParams>(() => {
    if (typeof window === 'undefined' || !slideRef.current) {
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

  const {target: slideDraggerRef, setPosition: setDraggerPosition} = useDrag<HTMLButtonElement>({
    direction: 'horizontal',
    limit: {x: {min: 0, max: slideDraggerInfo.maxSlideDistance}},
    onMove: (...params) => onDrag?.(slideDraggerInfo, ...params),
    onEnd: (...params) => onDragEnd?.(slideDraggerInfo, ...params),
    disabled: disableDrag,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !slideDraggerRef.current) {
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
