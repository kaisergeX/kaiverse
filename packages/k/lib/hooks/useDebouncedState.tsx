'use client'

import {useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction} from 'react'

export function useDebouncedState<T = unknown>(
  defaultValue: T,
  debounceTime: number,
  /**
   * Immediately update value on first call
   * @default false
   */
  updateFirstChange = false,
): Readonly<[T, Dispatch<SetStateAction<T>>]> {
  const [value, setValue] = useState(defaultValue)
  const timeoutRef = useRef<number>()
  const updateFirstChangeRef = useRef(true)

  const clearTimeout = () => window.clearTimeout(timeoutRef.current)

  useEffect(() => clearTimeout, [])

  const debouncedSetValue = useCallback<Dispatch<SetStateAction<T>>>(
    (newValue) => {
      clearTimeout()

      if (updateFirstChangeRef.current && updateFirstChange) {
        setValue(newValue)
      } else {
        timeoutRef.current = window.setTimeout(() => {
          updateFirstChangeRef.current = true
          setValue(newValue)
        }, debounceTime)
      }

      updateFirstChangeRef.current = false
    },
    [updateFirstChange, debounceTime],
  )

  return [value, debouncedSetValue]
}
