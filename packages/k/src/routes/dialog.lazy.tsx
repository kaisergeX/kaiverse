import {Dialog} from '#components'
import {createLazyFileRoute} from '@tanstack/react-router'
import {useState} from 'react'

export const Route = createLazyFileRoute('/dialog')({
  component: DialogPage,
})

function DialogPage() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <button className="k-button" type="button" onClick={() => setOpenDialog(true)}>
        Open Dialog
      </button>
      <Dialog
        // ref={(ref) => {
        //   if (ref) {
        //     ref.ariaDescription = '1234'
        //   }
        // }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <Dialog.Header>
          <Dialog.Title className="text-gradient gradient-leaf">Dialog header</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>
          Dialog content <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Dialog.Content>
        <Dialog.Footer>
          <button className="k-button" type="button" onClick={() => setOpenDialog(false)}>
            Close
          </button>
          Dialog Footer
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
