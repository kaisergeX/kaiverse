'use client'

import {useImperativeHandle, useRef, type Ref} from 'react'

export function useDOMRef<T extends HTMLElement = HTMLElement>(ref?: Ref<T>) {
  const domRef = useRef<T>(null)
  useImperativeHandle(ref, () => domRef.current as T)
  return domRef
}
