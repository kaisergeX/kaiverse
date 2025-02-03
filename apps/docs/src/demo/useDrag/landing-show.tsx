import {useDrag, type DragHookOptions} from '@kaiverse/k/hooks'

const limit: DragHookOptions['limit'] = {x: {min: 0, max: 200}, y: {min: 0, max: 100}}

export default function UseDragLandingShow() {
  const {targetRef} = useDrag<HTMLDivElement>({limit})

  return (
    <div className="outline-2 outline rounded-lg outline-base-300 w-[300px] h-[150px] mt-4">
      <div
        ref={targetRef}
        className="rounded-lg inline-block border-2 h-[50px] w-[100px] border-primary bg-primary/50 cursor-move select-none group content-center text-center"
      >
        👋 drag me
      </div>
    </div>
  )
}
