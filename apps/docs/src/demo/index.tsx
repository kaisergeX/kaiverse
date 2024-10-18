import {classNames} from '@kaiverse/k/utils'
import {Suspense} from 'react'
import {demoModules} from './config'
import {IconLoading} from './icon'

type DemoProps = Readonly<{path: keyof typeof demoModules; className?: string}>

export default function Demo({path, className}: DemoProps) {
  const DemoComponent = demoModules[path] || <div>Demo not found</div>

  return (
    <div className={classNames('not-content my-4 leading-normal', className)}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center gap-1">
            <IconLoading className="animate-spin" />
            Crafting demo...
          </div>
        }
      >
        <DemoComponent />
      </Suspense>
    </div>
  )
}
