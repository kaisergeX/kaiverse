import type {NullableRefObject} from '#types'
import {useEffect} from 'react'

/**
 * Calls the handler when a click event occurs outside the specified element.
 *
 * @param el - The element to monitor for outside clicks.
 * @param handler - The function to call when an outside click is detected.
 * @param cssSelectorsToExclude - An optional array of CSS selectors to exclude from the outside click detection.
 */
export function useOnClickOutside(
  el: Node | NullableRefObject<Node> | null,
  handler: ((e: PointerEvent) => void) | undefined,
  cssSelectorsToExclude?: string[],
) {
  useEffect(() => {
    // Support both direct nodes and ref objects
    const element = el && 'current' in el ? el.current : el
    if (!element || !handler) {
      return
    }

    const listener = (e: PointerEvent) => {
      const eventTarget = e.target as Element
      if (!element || element.contains(eventTarget)) {
        // Do nothing if clicking ref's element or descendent elements
        return
      }

      if (
        // Do nothing if clicking on an element that is excluded by the CSS selector(s)
        cssSelectorsToExclude?.some((cssSelector) => eventTarget.closest(cssSelector))
      ) {
        return
      }

      handler(e)
    }

    const root = element.getRootNode()
    root.addEventListener('pointerup', listener as EventListener)
    return () => {
      root.removeEventListener('pointerup', listener as EventListener)
    }
  }, [el, cssSelectorsToExclude, handler])
}
