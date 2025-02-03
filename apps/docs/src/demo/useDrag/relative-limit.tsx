import {useDrag, type DragHookRelativeLimit} from '@kaiverse/k/hooks'
import {useState} from 'react'

export default function DragRelativeLimit() {
  const [relativeLimit, setRelativeLimit] = useState<DragHookRelativeLimit>('client-size')
  const {targetRef, setPosition} = useDrag<HTMLDivElement>({relativeLimit})

  const showWarning = relativeLimit.startsWith('offset')

  return (
    <>
      <label className="form-control w-fit mb-4">
        <span className="label-text">Select relativeLimit mode</span>
        <select
          className="select select-bordered select-sm text-base"
          value={relativeLimit}
          onChange={(e) => {
            setPosition({x: 0, y: 0})
            setRelativeLimit(e.target.value as DragHookRelativeLimit)
          }}
        >
          <option value="client-size">"client-size"</option>
          <option value="client-no-padding">"client-no-padding"</option>
          <option value="offset-no-padding">"offset-no-padding"</option>
          <option value="offset-size">"offset-size"</option>
        </select>
      </label>

      <RelativeLimitDesc showWarning={showWarning} />

      <div className="playground p-8 h-[40vh] border-[16px] border-sky-200">
        <div
          ref={targetRef}
          className="rounded-lg inline-block border-2 border-sky-400 bg-sky-200 dark:bg-sky-800 p-4 cursor-move select-none group"
        >
          👋 drag me
        </div>

        <pre className="mt-4 select-none">
          Playground related styles:
          <br />
          {JSON.stringify({padding: '2rem', borderWidth: '16px'}, null, 2)}
        </pre>
      </div>

      <div className="flex items-center mt-4 gap-1">
        <div className="h-6 w-14 bg-sky-200 rounded-md"></div>
        <span>: Border</span>
      </div>
    </>
  )
}

function RelativeLimitDesc({showWarning}: {showWarning: boolean}) {
  return (
    <p className="min-h-14">
      Try to drag the block below{' '}
      {showWarning && (
        <>
          over the playground border, you will see the difference between <code>"offset"</code> and{' '}
          <code>"client"</code>.
          <br />
          <strong>Now border width will be ignored.</strong>
        </>
      )}
    </p>
  )
}
