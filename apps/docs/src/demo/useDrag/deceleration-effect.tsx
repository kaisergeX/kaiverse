import {useDrag, type UseDragOptions} from '@kaiverse/k/hooks'

const limit: UseDragOptions['limit'] = {x: {min: 0, max: 200}, y: {min: 0, max: 100}}

export default function DecelerationEffect() {
  const {targetRef} = useDrag<HTMLDivElement>({limit, decelerationEffect: true})

  return (
    <div className="playground outline-2 p-4">
      <pre>
        limitBoxSize: {JSON.stringify({width: '300px', height: '150px'})}
        <br />
        targetSize: {JSON.stringify({width: '100px', height: '50px'})}
        <br />
        limit: {JSON.stringify(limit)}
      </pre>
      <h3 className="mt-6 mb-2">Limit box</h3>
      <div className="outline-2 outline rounded-lg outline-neutral w-[300px] h-[150px]">
        <div
          ref={targetRef}
          className="rounded-lg inline-block border-2 h-[50px] w-[100px] border-primary bg-primary/50 cursor-move select-none group content-center text-center"
        >
          👋 drag me
        </div>
      </div>
    </div>
  )
}
