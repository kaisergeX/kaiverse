import {useAnimateStateChange} from '@kaiverse/k/hooks'
import {useReducer} from 'react'

export default function Usage() {
  const [count, incrementCount] = useReducer((c) => c + 1, 0)
  const flashElement = useAnimateStateChange<HTMLPreElement>({
    value: count,
    keyframes: {color: ['#86efac', 'inherit']},
    options: 400,
  })

  return (
    <div>
      <button className="btn btn-neutral" type="button" onClick={incrementCount}>
        Count++
      </button>
      <p>
        The below displayed <code>count</code> element below will be flashed when you increment it:
        <pre ref={flashElement}>
          Count value is <strong>{count}</strong>
        </pre>
      </p>
    </div>
  )
}
