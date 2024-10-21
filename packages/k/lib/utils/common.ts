export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max)
}

export const isDOMAvailable: boolean =
  typeof window !== 'undefined' && Boolean(window.document && window.document.createElement)
