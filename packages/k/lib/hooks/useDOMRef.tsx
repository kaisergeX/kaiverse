'use client'

import {useImperativeHandle, useRef, type Ref} from 'react'

/**
 * A custom hook that creates a ref for a DOM element and allows the parent component to access it via the provided ref.
 *
 * @example
 * const MyComponent = forwardRef((props, ref) => { // or `refFactory`
 *   const domRef = useDOMRef(ref)
 *   return <div ref={domRef}>...</div>
 * }
 */
export function useDOMRef<T extends HTMLElement = HTMLElement>(ref?: Ref<T>) {
  const domRef = useRef<T>(null)
  useImperativeHandle(ref, () => domRef.current as T)
  return domRef
}
