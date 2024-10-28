import {safeAnyToNumber} from '@kaiverse/k/utils'
import {useState} from 'react'

export default function SafeAnyToNumberDemo() {
  const [convert, setConvert] = useState<ReturnType<typeof safeAnyToNumber>>()

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          setConvert(safeAnyToNumber(formData.get('inputValue')))
        }}
      >
        <label className="form-control w-full max-w-xs">
          <span className="label label-text">String value</span>
          <input
            className="input input-bordered w-full max-w-xs"
            placeholder="Type any string"
            name="inputValue"
            type="text"
          />
        </label>

        <button className="btn btn-neutral my-4" type="submit">
          Convert
        </button>
      </form>
      {!convert || (
        <pre className="bg-base-200 rounded p-4">
          Converted value: <strong>{convert.result}</strong>
          <br />
          Status:{' '}
          {convert.success ? (
            <span className="text-success">success</span>
          ) : (
            <span className="text-error">failed</span>
          )}
        </pre>
      )}
    </>
  )
}
