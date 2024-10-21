import {SlideAction} from '@kaiverse/k/ui'

export default function CustomEffectDocs() {
  return (
    <>
      <h3>Slide effect</h3>
      <SlideAction>Default: Slide background</SlideAction>

      <SlideAction className="my-4" slideType="static">
        Static fade-in background
      </SlideAction>

      <h3>Label effect</h3>
      <SlideAction labelType="slide">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, temporibus voluptatibus!
        Dolorum tenetur in distinctio quaerat, hic a soluta, veniam ut id porro adipisci molestias
        cumque perspiciatis asperiores facilis voluptatem.
      </SlideAction>
    </>
  )
}
