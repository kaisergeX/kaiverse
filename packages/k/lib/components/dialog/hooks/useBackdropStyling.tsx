import {useEffect, useMemo} from 'react'
import {DIALOG_CSS_VARIABLES} from '../constants'
import type {DialogProps} from '../types'
import {isDOMAvailable, updateElementStyles} from '#utils'
import type {NullableRefObject} from '#types'

export const useBackdropStyling = (
  dialogRef: NullableRefObject<HTMLDialogElement>,
  backdropProps: DialogProps['backdropProps'],
) => {
  const {backdropStyles, customStyles} = useMemo(() => {
    const blurVal = backdropProps?.blur
    const customStyles = {
      [DIALOG_CSS_VARIABLES.BACKDROP_OPACITY]: backdropProps?.opacity,
      [DIALOG_CSS_VARIABLES.BACKDROP_BLUR]: typeof blurVal === 'number' ? `${blurVal}px` : blurVal,
      [DIALOG_CSS_VARIABLES.BACKDROP_BG]: backdropProps?.background,
    }

    if (!isDOMAvailable || !dialogRef.current) {
      return {backdropStyles: customStyles, customStyles}
    }

    const computedStyle = window.getComputedStyle(dialogRef.current)
    const mergedStyles = Object.assign(
      {
        [DIALOG_CSS_VARIABLES.BACKDROP_OPACITY]: computedStyle.getPropertyValue(
          DIALOG_CSS_VARIABLES.BACKDROP_OPACITY,
        ),
        [DIALOG_CSS_VARIABLES.BACKDROP_BLUR]: computedStyle.getPropertyValue(
          DIALOG_CSS_VARIABLES.BACKDROP_BLUR,
        ),
        [DIALOG_CSS_VARIABLES.BACKDROP_BG]: computedStyle.getPropertyValue(
          DIALOG_CSS_VARIABLES.BACKDROP_BG,
        ),
      },
      customStyles,
    )

    return {
      backdropStyles: mergedStyles,
      customStyles,
    }
  }, [backdropProps?.background, backdropProps?.blur, backdropProps?.opacity, dialogRef])

  useEffect(() => {
    if (!isDOMAvailable) {
      return
    }

    updateElementStyles(dialogRef.current, customStyles, {ignoreNilValue: true})
  }, [customStyles, dialogRef])

  return {backdropStyles}
}
