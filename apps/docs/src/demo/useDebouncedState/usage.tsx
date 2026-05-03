import {useDebouncedState} from '@kaiverse/k/hooks'

export default function Usage() {
  const [value, setValue] = useDebouncedState('', 200)

  return (
    <>
      <label className="fieldset max-w-xs">
        <span className="fieldset-label text-base">Type something to see debounce state update</span>
        <input
          className="input input-bordered w-full max-w-xs"
          placeholder="200ms debounce"
          type="text"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value.trim())}
        />
      </label>
      <p>
        Debounced state value:{' '}
        {value ? <strong>{value}</strong> : <span className="text-slate-400">empty</span>}
      </p>
    </>
  )
}
