import {Dialog, DialogBase, type DialogProps} from '#components'
import {createLazyFileRoute} from '@tanstack/react-router'
import {useState} from 'react'

export const Route = createLazyFileRoute('/dialog')({
  component: DialogPage,
})

function DialogPage() {
  const [openDialog, setOpenDialog] = useState(false)
  const [openUnstyledDialog, setOpenUnstyledDialog] = useState(false)

  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerPosition, setDrawerPosition] = useState<DialogProps['position']>(undefined)

  const openDrawerPosition = (position: DialogProps['position']) => {
    setDrawerPosition(position)
    setOpenDrawer(true)
  }

  const handleCloseDrawer = () => setOpenDrawer(false)

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

      <button className="k-button ml-4" type="button" onClick={() => setOpenUnstyledDialog(true)}>
        Open Unstyled Dialog
      </button>
      <DialogBase
        className="m-auto open:flex flex-col gap-4 *:p-4 rounded-lg"
        open={openUnstyledDialog}
        onClose={() => setOpenUnstyledDialog(false)}
      >
        <DialogBase.Header className="flex-center-between">
          <DialogBase.Title className="text-gradient gradient-leaf">Dialog header</DialogBase.Title>
          <DialogBase.CloseButton />
        </DialogBase.Header>
        <DialogBase.Content>
          Dialog content <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </DialogBase.Content>
        <DialogBase.Footer className="flex-center-between">
          <button className="k-button" type="button" onClick={() => setOpenUnstyledDialog(false)}>
            Close
          </button>
          Dialog Footer
        </DialogBase.Footer>
      </DialogBase>

      <button
        className="k-button mx-auto block"
        type="button"
        onClick={() => openDrawerPosition('top')}
      >
        Open at the top
      </button>
      <div className="flex items-center justify-center gap-4 flex-wrap my-4">
        <button className="k-button" type="button" onClick={() => openDrawerPosition('left')}>
          Open on the left
        </button>
        <button className="k-button" type="button" onClick={() => openDrawerPosition('bottom')}>
          Open at the bottom
        </button>
        <button className="k-button" type="button" onClick={() => openDrawerPosition('right')}>
          Open on the right
        </button>
      </div>

      <Dialog
        open={openDrawer}
        variant="drawer"
        position={drawerPosition}
        onClose={handleCloseDrawer}
      >
        <Dialog.Header>
          <h2>Drawer header</h2>
        </Dialog.Header>
        <Dialog.Content>
          Position <strong>{drawerPosition}</strong>
        </Dialog.Content>
        <footer className="p-4">
          <button className="k-button" type="button" onClick={handleCloseDrawer}>
            Close
          </button>
        </footer>
      </Dialog>

      <article className="h-dvh">Long content</article>
    </>
  )
}
