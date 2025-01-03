'use client'

import {useCallback, useEffect, useImperativeHandle, useRef, useState} from 'react'
import SlideActionDefaultIcon from './slide-action-icon'
import {
  SLIDER_ACTION_CLASSES,
  SLIDER_ACTION_REDUCE_OPACITY,
  SLIDER_ACTION_THEME_VARIABLE,
} from './slide-action.const'
import type {SlideActionProps, SlideActionRef, SlideDraggerProps} from './slide-action.types'
import {useSlideActionDragger} from './hooks'
import {useLazyEffect} from '#hooks'
import {isDOMAvailable, classNames, refFactory} from '#utils'
import {DISPLAY_NAME_PREFIX} from '../constants'
import classes from './slide-action.module.css'

const isValidColorVariable = (color: string): boolean => {
  if (!isDOMAvailable) {
    return false
  }

  return !!window.getComputedStyle(document.documentElement).getPropertyValue(color).trim()
}

/**
 * A Slide action or Swiper component that requires user to swipe to confirm an action.
 *
 * Usually use for important actions, such as purchase order, turn off privacy setting, delete something, etc...
 */
export const SlideAction = refFactory<SlideActionRef, SlideActionProps>(
  (
    {
      className,
      classNames: stylingClassNames,
      styles,
      icon,
      color,
      label = 'Slide',
      labelType = 'default',
      slideType = 'slide',
      allowSwipeAfterEnd = false,
      compact = false,

      onChange,
      onSwipeEnd,
      children,
      ...htmlDivAttributes
    },
    ref,
  ) => {
    const slideRef = useRef<HTMLDivElement>(null)
    const slideBgRef = useRef<HTMLDivElement>(null)
    const slideLabelRef = useRef<HTMLDivElement>(null)
    const [disableDrag, setDisableDrag] = useState(false)
    const [slideStatus, setSlideStatus] = useState(false)

    const handleUpdateSlideBg = useCallback<(opacity: number, width: number) => void>(
      (opacity, width) => {
        if (!slideBgRef.current) {
          return
        }

        if (slideType === 'static') {
          slideBgRef.current.style.setProperty('opacity', opacity.toFixed(2))
          return
        }

        slideBgRef.current.style.setProperty('width', `${width}px`)
      },
      [slideType],
    )

    const handleOnDrag = useCallback<NonNullable<SlideDraggerProps['onDrag']>>(
      ({draggerWidth, maxSlideDistance}, _, {x}) => {
        if (!slideRef.current || !slideLabelRef.current) {
          return
        }
        const calcDistance = (maxSlideDistance - x) / maxSlideDistance
        slideLabelRef.current.style.setProperty('opacity', (calcDistance - 0.1).toFixed(2))

        const bgOpacity = x / maxSlideDistance - SLIDER_ACTION_REDUCE_OPACITY
        handleUpdateSlideBg(
          bgOpacity > SLIDER_ACTION_REDUCE_OPACITY ? SLIDER_ACTION_REDUCE_OPACITY : bgOpacity,
          draggerWidth + x,
        )
      },
      [handleUpdateSlideBg, slideRef],
    )

    const resetState = useCallback(() => {
      if (slideLabelRef.current) {
        slideLabelRef.current.style.setProperty('opacity', '1')
      }

      setDisableDrag(false)
      setSlideStatus(false)
      handleUpdateSlideBg(0, 0)
    }, [handleUpdateSlideBg])

    const handleOnDragEnd = useCallback<NonNullable<SlideDraggerProps['onDragEnd']>>(
      ({maxSlideDistance}, _, {x}, setPosition) => {
        if (!slideRef.current) {
          return
        }

        const resetPosition = () => {
          resetState()
          setPosition({x: 0, y: 0}, {transition: true})
        }

        if (x === maxSlideDistance) {
          if (!allowSwipeAfterEnd) {
            setDisableDrag(true)
          }

          setSlideStatus(true)
          onSwipeEnd?.(resetPosition)
          return
        }

        resetPosition()
      },
      [slideRef, resetState, allowSwipeAfterEnd, onSwipeEnd],
    )

    const {slideDraggerRef, setDraggerPosition} = useSlideActionDragger({
      slideRef,
      onDrag: handleOnDrag,
      onDragEnd: handleOnDragEnd,
      disableDrag,
    })

    const exposedResetHandler = useCallback(() => {
      resetState()
      setDraggerPosition({x: 0, y: 0}, {transition: true})
    }, [resetState, setDraggerPosition])

    useImperativeHandle(ref, () => {
      return Object.defineProperties(
        slideRef.current,
        // ensure exposed `resetState` is read-only by showing an TypeError (to console) when other dev try to modify them (on 'use strict' mode)
        Object.getOwnPropertyDescriptors(Object.freeze({resetState: exposedResetHandler})),
      ) as SlideActionRef
    }, [exposedResetHandler])

    useLazyEffect(() => {
      onChange?.(slideStatus)
    }, [slideStatus, onChange])

    useEffect(() => {
      if (!color) {
        slideRef.current?.style.removeProperty(SLIDER_ACTION_THEME_VARIABLE)
        return
      }

      slideRef.current?.style.setProperty(
        SLIDER_ACTION_THEME_VARIABLE,
        isValidColorVariable(color) ? `var(${color})` : color,
      )
    }, [color, slideRef])

    return (
      <div
        className={classNames(
          SLIDER_ACTION_CLASSES.ROOT,
          classes.slideAction,
          compact ? `${SLIDER_ACTION_CLASSES.ROOT}--compact ${classes.compact}` : undefined,
          className,
        )}
        // data-color={color} // attr(data-color) is not widely supported yet, using inline style for now
        {...htmlDivAttributes}
        ref={slideRef}
      >
        <div
          ref={slideBgRef}
          className={classNames(
            SLIDER_ACTION_CLASSES.BG,
            classes.slideActionBackground,
            `${SLIDER_ACTION_CLASSES.BG}--${slideType}`,
            slideType && classes[slideType],
            stylingClassNames?.progress,
          )}
          style={styles?.progress}
        />

        <button
          ref={slideDraggerRef}
          className={classNames(
            SLIDER_ACTION_CLASSES.DRAGGER,
            classes.slideActionDragger,
            disableDrag
              ? `${SLIDER_ACTION_CLASSES.ROOT}--disableDrag ${classes.disableDrag}`
              : undefined,
            stylingClassNames?.dragger,
          )}
          type="button"
          style={styles?.dragger}
        >
          {icon || <SlideActionDefaultIcon />}
        </button>

        <div
          ref={slideLabelRef}
          className={classNames(
            SLIDER_ACTION_CLASSES.LABEL,
            classes.slideActionLabel,
            `${SLIDER_ACTION_CLASSES.LABEL}--${labelType}`,
            labelType && classes[labelType],
            stylingClassNames?.label,
          )}
          title={typeof children === 'string' ? children : label}
        >
          {children || label}
        </div>
      </div>
    )
  },
)

SlideAction.displayName = `${DISPLAY_NAME_PREFIX}/SlideAction`
