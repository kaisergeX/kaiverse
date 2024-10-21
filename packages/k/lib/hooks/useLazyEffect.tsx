import {useEffect, useRef, type DependencyList, type EffectCallback} from 'react'

/** `useEffect` but it does not trigger on first render */
export function useLazyEffect(effect: EffectCallback, deps: DependencyList) {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      effect()
      return
    }
    mounted.current = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
