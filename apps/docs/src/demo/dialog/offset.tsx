import {useDisclosure} from '@kaiverse/k/hooks'
import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'

export default function OffsetDialog() {
  const [opened, {open, close}] = useDisclosure(false)
  const [offset, setOffset] = useState(16)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={open}>
        Open Dialog
      </button>
      <Dialog open={opened} variant="drawer" offset={offset} onClose={close}>
        <Dialog.Header>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>
          You can set the <code>offset</code> prop to adjust the Dialog's position from the edge of
          the viewport.
          <br />
          Try dragging the range slider below.
          <label className="form-control mt-4">
            <p>
              Offset: <strong>{offset}</strong> (px)
            </p>
            <input
              className="range range-sm"
              title={offset.toString()}
              type="range"
              min={0}
              max={64}
              value={offset}
              onChange={(e) => setOffset(parseInt(e.target.value))}
            />
          </label>
        </Dialog.Content>
        <footer className="p-4">
          <button className="btn btn-secondary" type="button" onClick={close}>
            Close
          </button>
        </footer>
      </Dialog>
    </>
  )
}
