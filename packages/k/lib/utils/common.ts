export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max)
}

export const isDOMAvailable: boolean =
  typeof window !== 'undefined' && Boolean(window.document && window.document.createElement)

/**
 * Try to convert `inputVal` to a `number`. If it can't, return `fallbackNum` number.
 *
 * @param inputVal any except function.
 * @param fallbackNum default: `0`
 * @description
 *___
 * ⚠️ Attention should be paid if `inputVal` is an array.
 * @example
 * [] => 0 // same result with inputVal = [null] or [undefined]
 * [12] => 12
 * ['12'] => 12
 * ['12', '13'] => fallbackNum
 * '[12]' => fallbackNum
 *
 * [true] => fallbackNum // same result with inputVal = [false]
 *
 * [BigInt(9007199254740991)] => 9007199254740991
 * [BigInt(9007199254740991000000)] => 9.007199254740991e+21
 * ['BigInt(9007199254740991)'] => fallbackNum
 * '[BigInt(9007199254740991)]' => fallbackNum
 */
export const safeAnyToNumber = <T = unknown>(
  inputVal: Exclude<T, (...args: never) => unknown>,
  fallbackNum = 0,
): {result: number; success: boolean} => {
  if (inputVal === null || typeof inputVal === 'symbol') {
    return {result: fallbackNum, success: false}
  }

  const toNumber = Number(inputVal)
  if (Number.isNaN(toNumber)) {
    return {result: fallbackNum, success: false}
  }

  return {result: toNumber, success: true}
}
