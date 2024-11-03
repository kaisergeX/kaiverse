import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function DialogLandingShow() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="not-content mt-9">
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDialog(true)}>
        Open Dialog
      </button>
      <Dialog className="min-w-80" open={openDialog} onClose={() => setOpenDialog(false)}>
        <Dialog.Header>
          <Dialog.Title>Dialog header</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>Dialog content</Dialog.Content>
        <Dialog.Footer>
          <button className="btn btn-secondary" type="button" onClick={() => setOpenDialog(false)}>
            Close
          </button>
          <em className="font-semibold text-gradient gradient-fall">Dialog Footer</em>
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
