import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function BasicDialog() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDialog(true)}>
        Open Dialog
      </button>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Dialog.Header>
          <Dialog.Title>Dialog header</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>
          Dialog content <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Dialog.Content>
        <Dialog.Footer>
          <button className="btn btn-secondary" type="button" onClick={() => setOpenDialog(false)}>
            Close
          </button>
          Dialog Footer
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
