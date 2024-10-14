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
        classNames={{
          header: 'italic',
          content: '[&_code]:text-info',
          footer:
            'bg-[radial-gradient(circle,rgba(34,193,195,0.4)_0%,rgba(253,187,45,0.2)_100%)] dark:bg-base-100',
        }}
        variant="drawer"
        onClose={() => setOpenDialog(false)}
        // styles={{
        //   header: {fontWeight: 600, font-style: 'italic'},
        //   content: {color: 'oklch(var(--n))'},
        //   footer: {
        //     background: 'radial-gradient(circle,rgba(34,193,195,0.4) 0%,rgba(253,187,45,0.2) 100%)',
        //   },
        // }}
        backdropProps={{
          blur: 1,
          opacity: 0.5,
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
