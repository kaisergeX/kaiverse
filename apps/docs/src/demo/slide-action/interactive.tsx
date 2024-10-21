import {SlideAction, type SlideActionOnSwipeEnd} from '@kaiverse/k/ui'
import {useCallback, useState} from 'react'
import {IconCheck} from '../icon'

export default function SliderActionInteractiveDocs() {
  const [status, setStatus] = useState(false)

  const handleOnSwipeEnd = useCallback<SlideActionOnSwipeEnd>((reset) => {
    // do sth when users swiped to the end, e.g. call API, mutation data, etc...

    setTimeout(() => {
      reset()
    }, 1000)
  }, [])

  return (
    <>
      <SlideAction
        label="Swipe to confirm"
        color={status ? '#059669' : undefined}
        icon={status ? <IconCheck className="size-5 text-white" /> : undefined}
        onChange={setStatus}
        onSwipeEnd={handleOnSwipeEnd}
      />

      <p>
        Status:{' '}
        {status ? (
          <strong style={{color: '#059669'}}>Confirmed!</strong>
        ) : (
          'Waiting for confirmation'
        )}
      </p>
    </>
  )
}
