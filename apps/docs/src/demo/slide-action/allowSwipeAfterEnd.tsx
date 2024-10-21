import {SlideAction} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function AllowSwipeAfterEnd() {
  const [countSuccess, setCountSuccess] = useState(0)

  return (
    <>
      <p className="mb-4">
        Successful / confirmatory action count: <strong>{`${countSuccess}`}</strong>
      </p>

      <SlideAction
        color="#475569"
        allowSwipeAfterEnd
        onSwipeEnd={() => setCountSuccess(countSuccess + 1)}
      >
        Can swipe after success
      </SlideAction>
    </>
  )
}
