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
          <h2>Dialog header</h2>
        </Dialog.Header>
        Dialog content <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
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
