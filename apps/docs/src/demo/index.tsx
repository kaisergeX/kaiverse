import {useIsomorphicLayoutEffect} from '@kaiverse/k/hooks'
import {classNames} from '@kaiverse/k/utils'
import {useState, type ReactNode} from 'react'

export default function Demo({path, className}: {path: string; className?: string}) {
  const [component, setComponent] = useState<ReactNode>()

  useIsomorphicLayoutEffect(() => {
    async function loadComponent() {
      const Component = (await import(/* @vite-ignore */ `./${path}.tsx`)).default
      setComponent(<Component />)
    }

    loadComponent()
  }, [path])

  return <div className={classNames('not-content my-4 leading-normal', className)}>{component}</div>
}
