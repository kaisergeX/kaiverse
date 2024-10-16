import {Dialog, type DialogProps} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function DrawerDialog() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerPosition, setDrawerPosition] = useState<DialogProps['position']>(undefined)

  const openDrawerPosition = (position: DialogProps['position']) => {
    setDrawerPosition(position)
    setOpenDrawer(true)
  }

  const handleCloseDrawer = () => setOpenDrawer(false)

  return (
    <>
      <button
        className="btn btn-outline btn-neutral mx-auto block"
        type="button"
        onClick={() => openDrawerPosition('top')}
      >
        Open at the top
      </button>
      <div className="flex items-center justify-center gap-4 flex-wrap my-4">
        <button
          className="btn btn-neutral"
          type="button"
          onClick={() => openDrawerPosition('left')}
        >
          Open on the left
        </button>
        <button
          className="btn btn-outline btn-neutral"
          type="button"
          onClick={() => openDrawerPosition('bottom')}
        >
          Open at the bottom
        </button>
        <button
          className="btn btn-neutral"
          type="button"
          onClick={() => openDrawerPosition('right')}
        >
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
          <button className="btn btn-secondary" type="button" onClick={handleCloseDrawer}>
            Close
          </button>
        </footer>
      </Dialog>
    </>
  )
}
