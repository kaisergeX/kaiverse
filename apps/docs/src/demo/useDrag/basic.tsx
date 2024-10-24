import {useDrag} from '@kaiverse/k/hooks'

export default function UseDragBasic() {
  const {targetRef: draggableTargetRef, setPosition} = useDrag<HTMLDivElement>()

  return (
    <>
      Drag the block below
      <div className="playground p-4 h-[30vh]">
        <div
          ref={draggableTargetRef}
          className="rounded-lg inline-block border-2 border-accent p-4 bg-accent/20 cursor-move select-none group"
        >
          <div className="group-active:animate-none animate-bounce">😀</div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <button
          className="btn btn-neutral btn-outline"
          type="button"
          onClick={() => setPosition({x: 0, y: 0})}
        >
          Reset
        </button>

        <button
          className="btn btn-neutral"
          type="button"
          onClick={() => setPosition({x: 0, y: 0}, {transition: true})}
        >
          Reset with transition
        </button>
      </div>
    </>
  )
}
