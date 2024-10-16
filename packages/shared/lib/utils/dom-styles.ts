type CustomStyles = {[key: string]: string | number | undefined | null}
type UpdateStyleOptions = {
  /** @default false */
  ignoreNilValue?: boolean
  /**
   * Cache the original styles.
   * Only cache value of provided properties that have been updated (depending on `ignoreNilValue` option).
   * ___
   * If set to `once`, it won't override existing cached styles.
   * @default false
   */
  cache?: boolean | 'once'
}

const styleCached = new WeakMap<HTMLElement, CustomStyles>()

export function updateElementStyles(
  element: Element | HTMLElement | null,
  /** CSS property name should be a kebab-case string (eg: `border-radius`) */
  styles: CustomStyles,
  options: UpdateStyleOptions = {cache: false},
) {
  if (!element || !(element instanceof HTMLElement)) {
    return
  }

  const originalStyles: CustomStyles = {}
  Object.entries(styles).forEach(([key, value]) => {
    if (options.ignoreNilValue && (value === undefined || value === null)) {
      return
    }

    originalStyles[key] = element.style.getPropertyValue(key)
    element.style.setProperty(key, (value as string) ?? null)
  })

  if (!options.cache) {
    return
  }

  if (options.cache === 'once' && styleCached.has(element)) {
    return
  }

  styleCached.set(element, originalStyles)
}

/**
 * Reset the element's styles.
 *
 * Depending on provided `properties`, if the original styles have been cached,
 * it will restore the original styles, otherwise, it will remove the current styles.
 */
export function resetElementStyles(
  element: Element | HTMLElement | null,
  /**
   * Property name should be a kebab-case string.
   * ___
   * If not provided, it will reset only properties that have been updated and cached by `updateElementStyles` before.
   */
  properties?: string[],
) {
  if (!element || !(element instanceof HTMLElement)) {
    return
  }

  const originalStyles = styleCached.get(element)
  if (!properties) {
    // reset all properties that have been updated before.
    if (originalStyles) {
      updateElementStyles(element, originalStyles)
      styleCached.delete(element)
    }
    return
  }

  for (const property of properties) {
    element.style.setProperty(property, (originalStyles?.[property] as string) ?? null)
  }
}
