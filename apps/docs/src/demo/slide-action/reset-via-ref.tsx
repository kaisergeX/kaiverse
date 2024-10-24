import {SlideAction, type SlideActionRef} from '@kaiverse/k/ui'
import {IconCheck} from '@tabler/icons-react'
import {useRef, useState} from 'react'

export default function SlideActionResetRefDocs() {
  const slideActionRef = useRef<SlideActionRef>(null)
  const [status, setStatus] = useState(false)

  return (
    <>
      <SlideAction
        ref={slideActionRef}
        color={status ? '#059669' : undefined}
        icon={status ? <IconCheck className="size-5 text-white" /> : undefined}
        onChange={setStatus}
      >
        Swipe to confirm
      </SlideAction>

      <p>
        Status:{' '}
        {status ? (
          <strong style={{color: '#059669'}}>Confirmed!</strong>
        ) : (
          'Waiting for confirmation'
        )}
      </p>

      <button
        className="btn btn-neutral btn-outline mt-4"
        type="button"
        onClick={() => slideActionRef.current?.resetState()}
      >
        Reset above SlideAction
      </button>
    </>
  )
}
