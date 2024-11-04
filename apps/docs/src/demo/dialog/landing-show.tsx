import {useDisclosure} from '@kaiverse/k/hooks'
import {Dialog} from '@kaiverse/k/ui'

export default function DialogLandingShow() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <div className="not-content mt-9">
      <button className="btn btn-neutral" type="button" onClick={open}>
        Open Dialog
      </button>
      <Dialog className="min-w-80" open={opened} onClose={close}>
        <Dialog.Header>
          <Dialog.Title>Dialog header</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>Dialog content</Dialog.Content>
        <Dialog.Footer>
          <button className="btn btn-secondary" type="button" onClick={close}>
            Close
          </button>
          Dialog Footer
        </Dialog.Footer>
      </Dialog>
    </div>
  )
}
