import type {CustomForwardRefExoticComponent, CustomForwardRefRenderFn, ObjectAny} from '#types'
import {forwardRef, version, type PropsWithoutRef, type Ref, type RefAttributes} from 'react'

const reactVersion = parseInt(version, 10)

/**
 * Compatibility factory that ensures stable props object for forwardRef components and backward compatibility with React 18.
 * ___
 * We ensure that the ref is always present in the props object (even if that's not the case for older versions of React) to avoid the footgun of spreading props over the ref in the newer versions of React.
 *
 * **Footgun**: `<Component ref={ref} {...props} />` will break past React 19, but the types will now warn us that we should use `<Component {...props} ref={ref} />` instead.
 *
 * Related: https://github.com/facebook/react/issues/31613
 */
export const refFactory = <T, P = ObjectAny>(
  render: CustomForwardRefRenderFn<T, P & {ref: Ref<T>}>,
) => {
  if (reactVersion >= 19) {
    const Component = (props: P & {ref: Ref<T>}) => render(props, props.ref ?? null)
    Component.displayName = render.displayName ?? render.name
    return Component as CustomForwardRefExoticComponent<P>
  }

  return forwardRef(
    render as CustomForwardRefRenderFn<T, PropsWithoutRef<P>>,
  ) as CustomForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>
}
