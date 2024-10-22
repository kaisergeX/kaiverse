export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max)
}

export const isDOMAvailable: boolean =
  typeof window !== 'undefined' && Boolean(window.document && window.document.createElement)

export const safeAnyToNumber = <T = unknown>(
  inputVal: Exclude<T, (...args: never) => unknown>,
  fallbackNum = 0,
): {result: number; success: boolean} => {
  if (inputVal === null || typeof inputVal === 'symbol') {
    return {result: fallbackNum, success: false}
  }

  const toNumber = Number(inputVal)
  return {result: isNaN(toNumber) ? fallbackNum : toNumber, success: true}
}
