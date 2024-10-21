import {SlideAction} from '@kaiverse/k/ui'
import {useState} from 'react'

// Slate, Orange, Red, Emerald, Daisy's primary color, Cyan, Violet, Rose
const slideColors = [
  '#475569',
  '#ea580c',
  'red',
  '#059669',
  'oklch(var(--p))',
  '#0891b2',
  '#7c3aed',
  '#e11d48',
]

export default function SliderColorfulDocs() {
  const [themeColor, setThemeColor] = useState(slideColors[0])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {slideColors.map((color) => (
          <button
            key={color}
            title={color}
            className="h-10 w-20 rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer border-none"
            onClick={() => setThemeColor(color)}
            style={{backgroundColor: color}}
          />
        ))}

        <button
          className="h-10 w-20 font-semibold text-white rounded-md opacity-80 hover:opacity-100 transition-opacity cursor-pointer border-none"
          style={{
            background:
              'linear-gradient(to right top, #fff6f2, #ffd4c1, #ffb194, #f98d6b, #f16645, #dc5135, #c63a26, #b12118, #8d2318, #6a2117, #481d15, #281713)',
          }}
          onClick={() =>
            setThemeColor(
              `#${Math.floor(Math.random() * 0xffffff)
                .toString(16)
                .padStart(6, '0')}`,
            )
          }
        >
          Random
        </button>
      </div>

      <p>
        color: <strong>{themeColor}</strong>
      </p>

      <SlideAction color={themeColor}>Slide background</SlideAction>

      <SlideAction color={themeColor} slideType="static">
        Fadein background
      </SlideAction>

      <SlideAction labelType="slide" color={themeColor}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa non ipsum, pariatur in
        eveniet neque dolores sequi, numquam aspernatur ratione veritatis nemo earum maxime aut
        distinctio repellat dolorum ipsa deleniti!
      </SlideAction>

      <h3>Gradient slide background</h3>
      <SlideAction
        classNames={{
          progress: 'bg-gradient-wave',
        }}
      >
        Slide to see bg color change
      </SlideAction>
    </div>
  )
}
