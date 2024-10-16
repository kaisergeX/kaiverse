import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function OffsetDialog() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDialog(true)}>
        Open Dialog
      </button>
      <Dialog open={openDialog} variant="drawer" offset={16} onClose={() => setOpenDialog(false)}>
        <Dialog.Header>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>
          You can set the <code>offset</code> prop to adjust the Dialog's position from the edge of
          the viewport
        </Dialog.Content>
        <footer className="p-4">
          <button className="btn btn-secondary" type="button" onClick={() => setOpenDialog(false)}>
            Close
          </button>
        </footer>
      </Dialog>
    </>
  )
}
