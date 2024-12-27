import type {
  ForwardedRef,
  ForwardRefRenderFunction,
  ReactElement,
  ReactNode,
  ReactPortal,
  RefObject,
} from 'react'

export type Primitives = string | number | boolean
export type ObjectAny = Record<PropertyKey, unknown>
export type Nullish = null | undefined
export type NullableRefObject<T> = RefObject<T | null>

// symbol is skipped
export type SortableMixedArr = (Primitives | ObjectAny | Nullish | SortableMixedArr)[]

/**
 * React 19's {@link ReactNode} supports `bigint` and `Promise<AwaitedReactNode>` which are not supported in React 18.
 * So, for backward compatibility, we exclude those new types.
 */
export type React18Node =
  | Exclude<
      ReactNode,
      bigint | ReactElement | ReactPortal | Iterable<ReactNode> | Promise<Awaited<ReactNode>>
    >
  | ReactElement<unknown, string | CustomJSXElementConstructor<ObjectAny>>
  | Iterable<React18Node>

export type CustomJSXElementConstructor<P> = (props: P) => React18Node

/**
 * The default {@link ForwardRefRenderFunction} type is `(props: P, ref: ForwardedRef<T>): ReactNode`
 *
 * React 19's `ReactNode` supports `bigint` and `Promise<AwaitedReactNode>` which are not supported in React 18.
 * So, for backward compatibility, we exclude those new types from the return type.
 */
export interface CustomForwardRefRenderFn<T, P = ObjectAny> extends ForwardRefRenderFunction<T, P> {
  (props: P, ref: ForwardedRef<T>): React18Node
}

/**
 * The default `ForwardRefExoticComponent` return type is `ReactNode`
 *
 * React 19's `ReactNode` supports `bigint` and `Promise<AwaitedReactNode>` which are not supported in React 18.
 * So, for backward compatibility, we exclude those new types from the return type.
 */
export interface CustomForwardRefExoticComponent<P = ObjectAny> {
  (props: P): React18Node
  readonly $$typeof: symbol
  /**
   * Used in debugging messages. You might want to set it
   * explicitly if you want to display a different name for
   * debugging purposes.
   *
   * @see {@link https://legacy.reactjs.org/docs/react-component.html#displayname Legacy React Docs}
   */
  displayName?: string | undefined
}
