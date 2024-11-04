import {useDisclosure} from '@kaiverse/k/hooks'
import {Dialog} from '@kaiverse/k/ui'

export default function BasicDialog() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={open}>
        Open Dialog
      </button>
      <Dialog open={opened} onClose={close}>
        <Dialog.Header>
          <Dialog.Title>Dialog header</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content>
          Dialog content <br /> Lorem ipsum, dolor sit amet consectetur adipisicing elit.
        </Dialog.Content>
        <Dialog.Footer>
          <button className="btn btn-secondary" type="button" onClick={close}>
            Close
          </button>
          Dialog Footer
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
