import {useDebouncedState} from '@kaiverse/k/hooks'

export default function UseDebouncedStateImmediateUpdate() {
  const [value, setValue] = useDebouncedState('', 200, true)

  return (
    <>
      <label className="form-control w-full max-w-xs">
        <span className="label label-text">Type sth to see the behavior</span>
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
