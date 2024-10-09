import {useIsomorphicLayoutEffect} from '@kaiverse/k/hooks'
import {useState, type ReactNode} from 'react'

export default function Demo({path}: {path: string}) {
  const [component, setComponent] = useState<ReactNode>()

  useIsomorphicLayoutEffect(() => {
    async function loadComponent() {
      const Component = (await import(/* @vite-ignore */ `./${path}.tsx`)).default
      setComponent(<Component />)
    }

    loadComponent()
  }, [path])

  return <div className="not-content my-4 leading-normal">{component}</div>
}
