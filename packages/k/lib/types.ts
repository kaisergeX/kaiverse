export type Primitives = string | number | boolean
export type ObjectAny = Record<PropertyKey, unknown>
export type Nullish = null | undefined

// symbol is skipped
export type SortableMixedArr = (Primitives | ObjectAny | Nullish | SortableMixedArr)[]
