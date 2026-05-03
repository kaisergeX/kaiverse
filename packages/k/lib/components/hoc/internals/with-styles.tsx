import type {ObjectAny} from '#types'
import {classNames, refFactory} from '#utils'
import type {ComponentType} from 'react'

export function withStyles<P = ObjectAny>(
  Component: ComponentType<P>,
  ...classes: (string | undefined)[]
) {
  return refFactory<P, P>((props, ref) => (
    <Component
      {...props}
      ref={ref}
      className={classNames(...classes, (props as {className?: string})?.className)}
    />
  ))
}
