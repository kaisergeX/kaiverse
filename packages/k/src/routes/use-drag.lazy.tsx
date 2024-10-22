import {useDrag} from '#hooks'
import {createLazyFileRoute} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/use-drag')({
  component: UseDragPage,
})

function UseDragPage() {
  const {targetRef} = useDrag<HTMLDivElement>({
    relativeLimit: 'client-size',
  })
  const {targetRef: targetRef2} = useDrag<HTMLDivElement>({
    relativeLimit: 'client-no-padding',
  })
  const {targetRef: targetRef3} = useDrag<HTMLDivElement>({
    relativeLimit: 'client-size',
  })
  const {targetRef: targetRef4} = useDrag<HTMLDivElement>({
    relativeLimit: 'client-no-padding',
  })

  const {targetRef: targetRefOffset} = useDrag<HTMLDivElement>({
    relativeLimit: 'offset-size',
  })
  const {targetRef: targetRefOffset2} = useDrag<HTMLDivElement>({
    relativeLimit: 'offset-no-padding',
  })
  const {targetRef: targetRefOffset3} = useDrag<HTMLDivElement>({
    relativeLimit: 'offset-size',
  })
  const {targetRef: targetRefOffset4} = useDrag<HTMLDivElement>({
    relativeLimit: 'offset-no-padding',
  })

  return (
    <div className="sm:grid grid-cols-2 gap-2">
      <section className="card">
        <div className="border-orange-200 my-4 rounded-lg border-[16px] bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>client-size</code>
          </h2>
          <p>Has border</p>
          <div
            ref={targetRef}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
        <div className="border-orange-200 my-4 rounded-lg border-[16px] bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>client-no-padding</code>
          </h2>
          <p>Has border - ignore padding</p>
          <div
            ref={targetRef2}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>

        <div className="my-4 rounded-lg border-none bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>client-size</code>
          </h2>
          <p>No border</p>
          <div
            ref={targetRef3}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
        <div className="my-4 rounded-lg border-none bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>client-no-padding</code>
          </h2>
          <p>No border - ignore padding</p>
          <div
            ref={targetRef4}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
      </section>

      <section className="card">
        <div className="border-orange-200 my-4 rounded-lg border-[16px] bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>offset-size</code>
          </h2>
          <p>Has border</p>
          <div
            ref={targetRefOffset}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
        <div className="border-orange-200 my-4 rounded-lg border-[16px] bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>offset-no-padding</code>
          </h2>
          <p>Has border - ignore padding</p>
          <div
            ref={targetRefOffset2}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>

        <div className="my-4 rounded-lg border-none bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>offset-size</code>
          </h2>
          <p>No border</p>
          <div
            ref={targetRefOffset3}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
        <div className="my-4 rounded-lg border-none bg-orange-50 p-8 h-[30vh]">
          <h2>
            <code>offset-no-padding</code>
          </h2>
          <p>No border - ignore padding</p>
          <div
            ref={targetRefOffset4}
            className="rounded-lg inline-block p-4 bg-orange-500/20 border-2 border-orange-400 cursor-move select-none group"
          >
            <div className="group-active:animate-none animate-bounce">😀</div>
          </div>
        </div>
      </section>
    </div>
  )
}
