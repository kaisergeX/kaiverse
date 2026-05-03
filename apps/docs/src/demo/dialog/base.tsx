import {useDisclosure} from '@kaiverse/k/hooks'
import {DialogBase} from '@kaiverse/k/ui'

export default function UnstyledDialog() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <button className="btn" type="button" onClick={open}>
        Open Base Dialog
      </button>
      <DialogBase open={opened} onClose={close}>
        <DialogBase.Header>
          <DialogBase.Title>Dialog header</DialogBase.Title>
        </DialogBase.Header>
        <DialogBase.Content>This is a base, unstyled dialog.</DialogBase.Content>
        <DialogBase.Footer>
          <button type="button" onClick={close}>
            Close
          </button>
        </DialogBase.Footer>
      </DialogBase>
    </>
  )
}
