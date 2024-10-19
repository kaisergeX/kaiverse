import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function BackdropStyling() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDialog(true)}>
        Open styled drawer
      </button>
      <Dialog
        className="bg-base-100/90"
        open={openDialog}
        variant="drawer"
        onClose={() => setOpenDialog(false)}
        backdropProps={{
          blur: 1,
          opacity: 0.5,
          background: 'linear-gradient(-25deg,rgba(238,174,202,0.6) 0%,rgba(148,187,233,0.6) 100%)',
        }}
      >
        <Dialog.Header className="italic">
          <Dialog.Title>Drawer header</Dialog.Title>
        </Dialog.Header>
        <Dialog.Content className="[&_code]:text-info">
          We can use <code>backdropProps</code> to style the Dialog's backdrop.
        </Dialog.Content>
        <footer className="p-2 bg-[radial-gradient(circle,rgba(34,193,195,0.4)_0%,rgba(253,187,45,0.2)_100%)] dark:bg-base-100">
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
        </footer>
      </Dialog>
    </>
  )
}
