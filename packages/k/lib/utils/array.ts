import type {SortableMixedArr} from '#types'
import {isNullist} from './common'

/**
 * *MIXED* types array *ASCENDING* sorting
 *
 * @param inputArr an array
 * @param mutate should the origin array be modified/mutated? Default: `false`
 * @returns sorted array. Sort order: `number` → `string` → `boolean` → `object` → `nullish` → `empty`
 *
 * @description
 * - ⭐This function supports all *Primitive Types* and again, it aims to handle *MIXED* types of array elements sorting.
 * - Single type array sorting works fine too (eg: `number[]`, `string[]`, etc..). But we should just write a `array.sort` instead of use this func.
 * - ⛔`symbol` is not supported.
 * - Sort descending? Use `sortArrayAsc(...).reverse()`.
 *
 * @example
 * ```ts
 * inputArr = [3, undefined, 'rob', null, ' peter ', ['test'], false, 'a', 43, true, 0, null, 100, { a: 'obj' }, 1, -222, empty, false]
 * output = [-222, 0, 1, 3, 43, 100, "a", " peter ", "rob", true, false, false, ["test"], { "a": "obj" }, null, null, undefined, empty]
 * ```
 */
export const sortMixedArrAsc = (inputArr: SortableMixedArr, mutate = false) =>
  // playground: https://codesandbox.io/s/mixed-array-sortasc-fgkq1d
  (mutate ? inputArr.slice() : inputArr).sort((a, b) => {
    // Nullish is skipped, always on the end of the sorted arrays.
    if (isNullist(a)) {
      return 1
    }

    if (isNullist(b)) {
      return -1
    }

    // Compare value of all other primitive types
    return {
      numbernumber: Number(a) - Number(b),

      // string after number
      numberstring: -1,
      stringnumber: 1,
      stringstring: a.toString().trim() > b.toString().trim() ? 1 : -1,

      // boolean after string
      stringboolean: -1,
      booleanstring: 1,
      booleanboolean: a === b ? 0 : a ? -1 : 1,

      // object after boolean
      booleanobject: -1,
      objectboolean: 1,
    }[typeof a + typeof b] as number
  })
