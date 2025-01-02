import type {ObjectAny} from '#types'

/**
 * Remove 1st level properties from an object without mutating the original object.
 * ___
 * **Note**: This function uses [`structuredClone`](https://developer.mozilla.org/docs/Web/API/Window/structuredClone#browser_compatibility) if available, otherwise it uses `Object.assign` to clone the original object.
 *
 * @param obj - The object to remove properties from.
 * @param keys - The keys to remove from the object.
 * @returns A new object with the specified properties removed.
 */
export function objRemoveProperties<T extends ObjectAny>(obj: T, keys: (keyof T)[]): T {
  const newObj = 'structuredClone' in globalThis ? structuredClone(obj) : Object.assign({}, obj)
  keys.forEach((key) => Reflect.deleteProperty(newObj, key))
  return newObj
}
