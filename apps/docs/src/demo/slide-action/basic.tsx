import {SlideAction} from '@kaiverse/k/ui'

export default function BasicDemo() {
  return (
    <SlideAction
      label="Swipe to confirm"
      onSwipeEnd={() => {
        // do sth when users swiped to the end, e.g. call API, mutation data, etc...
      }}
    />
  )
}
