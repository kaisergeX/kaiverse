import type {Nullish} from '#types'

export const isDOMAvailable: boolean =
  typeof window !== 'undefined' && Boolean(window.document && window.document.createElement)

export const isNullish = (input: unknown): input is Nullish => input === null || input === undefined
