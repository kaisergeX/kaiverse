import {useDrag} from '@kaiverse/k/hooks'

export default function UseDragStep() {
  const {targetRef: draggableTargetRef, setPosition} = useDrag<HTMLDivElement>({
    stepSize: 50,
  })

  return (
    <>
      <pre className="mb-4">With {JSON.stringify({stepSize: 50})}</pre>
      Drag the block below
      <div className="h-[30vh] bg-grid">
        <div
          ref={draggableTargetRef}
          className="rounded-lg inline-block border-2 border-accent size-[50px] text-center content-center bg-accent/20 cursor-move select-none group"
        >
          <div className="group-active:animate-none animate-bounce">😀</div>
        </div>
      </div>
      <button
        className="btn btn-neutral btn-outline mt-4"
        type="button"
        onClick={() => setPosition({x: 0, y: 0}, {transition: true})}
      >
        Reset
      </button>
    </>
  )
}
