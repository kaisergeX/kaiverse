import {useDebouncedState} from '@kaiverse/k/hooks'

export default function Usage() {
  const [value, setValue] = useDebouncedState('', 200)

  return (
    <>
      <label className="form-control w-full max-w-xs">
        <span className="label label-text">Type something to see debounce state update</span>
        <input
          className="input input-bordered w-full max-w-xs"
          placeholder="200ms debounce"
          type="text"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </label>
      <p>Debounced state value: <strong>{value}</strong></p>
    </>
  )
}
