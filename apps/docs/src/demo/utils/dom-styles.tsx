import {resetElementStyles, updateElementStyles} from '@kaiverse/k/utils'
import {useRef} from 'react'

export default function DOMStylesDemo() {
  const resultBoxRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <form id="color-form">
        <label className="form-control w-full max-w-xs">
          <span className="label label-text">Change background color 🎨</span>
          <input
            className="input input-bordered w-full max-w-xs"
            name="inputColor"
            defaultValue="#000000"
            type="color"
            onChange={(e) =>
              updateElementStyles(resultBoxRef.current, {'background-color': e.currentTarget.value})
            }
          />
        </label>
      </form>

      <h3 className="mt-4">Result box:</h3>
      <div ref={resultBoxRef} className="h-32 bg-black rounded"></div>
      <button
        className="btn btn-neutral mt-4"
        form="color-form"
        type="reset"
        onClick={() => resetElementStyles(resultBoxRef.current, ['background-color'])}
      >
        Reset
      </button>
    </>
  )
}
