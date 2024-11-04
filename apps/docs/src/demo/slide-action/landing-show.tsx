import {SlideAction} from '@kaiverse/k/ui'
import {classNames} from '@kaiverse/k/utils'
import {useState} from 'react'

export default function SliderActionLandingShow() {
  const [turnedOff, setTurnedOff] = useState(false)

  return (
    <div className="not-content w-80 overflow-clip rounded-br-xl rounded-bl-xl">
      <div className={classNames('iphone-mockup mx-auto', turnedOff ? 'turnedOff' : '')}>
        <SlideAction
          className="border-none bg-[rgba(61,127,118,0.5)]"
          classNames={{label: 'font-bold text-lg'}}
          color="#fff"
          icon={
            <svg
              className="cursor-[inherit]"
              xmlns="http://www.w3.org/2000/svg"
              color="red"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 6a7.75 7.75 0 1 0 10 0" />
              <path d="M12 4l0 8" />
            </svg>
          }
          labelType="slide"
          onSwipeEnd={(reset) => {
            setTurnedOff(true)
            setTimeout(() => {
              reset()
              setTurnedOff(false)
            }, 2000)
          }}
        >
          Slide to power off
        </SlideAction>
      </div>
    </div>
  )
}
