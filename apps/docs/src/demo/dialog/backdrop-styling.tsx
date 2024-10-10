import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function BackdropStyling() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <>
      <button
        className="btn btn-neutral"
        type="button"
        onClick={() => setOpenDialog(true)}
      >
        Open styled drawer
      </button>
      <Dialog
        open={openDialog}
        variant="drawer"
        onClose={() => setOpenDialog(false)}
        styles={{
          root: {backgroundColor: 'rgba(255,255,255,0.9)'},
          header: {fontWeight: 600, color: 'var(--cdg-color-cdgBlue)'},
          content: {color: 'oklch(var(--n))'},
          footer: {
            background: 'radial-gradient(circle,rgba(34,193,195,0.4) 0%,rgba(253,187,45,0.2) 100%)',
          },
        }}
        backdropProps={{
          blur: 1,
          opacity: 0.9,
          background: 'linear-gradient(-25deg,rgba(238,174,202,0.6) 0%,rgba(148,187,233,0.6) 100%)',
        }}
      >
        <Dialog.Header>
          <h2>Drawer header</h2>
        </Dialog.Header>
        We can use <code>classNames</code>, <code>styles</code>, and <code>backdropProps</code> to
        style the Drawer component and its child elements.
        <Dialog.Footer className="py-2">
          <button
            className="btn btn-secondary btn-sm"
            type="button"
            onClick={() => setOpenDialog(false)}
          >
            Close
          </button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
