export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value: number, [min, max]: [number, number]): number {
  return Math.min(Math.max(value, min), max)
}
