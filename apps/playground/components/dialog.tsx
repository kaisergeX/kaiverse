import {Dialog, DialogCloseButton, DialogContent, DialogHeader, DialogTitle} from '@kaiverse/k/ui'

export default function DialogWrapper() {
  return (
    <>
      <Dialog open offset={32} variant="drawer">
        <DialogHeader>
          <DialogTitle>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam exercitationem officiis
            quas deleniti. A fuga provident repellendus vitae laborum quasi repellat facilis
            numquam, excepturi accusantium saepe, praesentium illum est. Placeat. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Saepe sed suscipit porro repudiandae sunt
            deleniti quae corrupti et. Veritatis optio magni error, reprehenderit similique eum quod
            velit fuga quos eos!
          </DialogTitle>
          <DialogCloseButton />
        </DialogHeader>
        <DialogContent>
          <div>
            <img
              className="mx-auto block"
              src="https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg"
              alt=""
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
