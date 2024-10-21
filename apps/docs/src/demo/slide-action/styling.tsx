import {SlideAction} from '@kaiverse/k/ui'

export default function StylingDemo() {
  return (
    <SlideAction
      className="bg-[rgba(225,88,25,0.1)]"
      classNames={{
        label: 'text-[rgb(225,88,25)] font-bold',
        progress: 'bg-gradient-wave',
        dragger: 'bg-gradient-to-r from-purple-500 to-pink-500 [&>span]:animate-spin',
      }}
      color="rgb(225,88,25)"
      icon={<span>⚽️</span>}
      label="Slide to see progress Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur
      amet ut repellat quia natus asperiores facere."
    />
  )
}
