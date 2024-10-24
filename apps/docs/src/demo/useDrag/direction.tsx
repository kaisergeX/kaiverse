import {useDrag} from '@kaiverse/k/hooks'

export default function UseDragDirection() {
  const {targetRef: targetDragXAxis, setPosition: setPositionXAxis} = useDrag<HTMLDivElement>({
    direction: 'horizontal',
  })
  const {targetRef: targetDragYAxis, setPosition: setPositionYAxis} = useDrag<HTMLDivElement>({
    direction: 'vertical',
  })

  return (
    <>
      <div className="playground p-4 h-[30vh] content-center text-center">
        <div
          ref={targetDragXAxis}
          className="rounded-lg inline-block border-2 border-accent p-4 bg-accent/20 cursor-move select-none group"
        >
          Horizontal only
        </div>
        <div
          ref={targetDragYAxis}
          className="rounded-lg inline-block border-2 rotate-90 border-primary p-4 bg-primary/50 cursor-move select-none group"
        >
          Vertical only
        </div>
      </div>
      <button
        className="btn btn-neutral btn-outline mt-4"
        type="button"
        onClick={() => {
          setPositionXAxis({x: 0, y: 0}, {transition: true})
          setPositionYAxis({x: 0, y: 0}, {transition: true})
        }}
      >
        Reset
      </button>
    </>
  )
}
