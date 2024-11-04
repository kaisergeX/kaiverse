import {useDisclosure} from '@kaiverse/k/hooks'
import {Dialog} from '@kaiverse/k/ui'

export default function BackdropStyling() {
  const [opened, {open, close}] = useDisclosure(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={open}>
        Open styled drawer
      </button>
      <Dialog
        className="bg-base-100/90"
        open={opened}
        variant="drawer"
        onClose={close}
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
          <button className="btn btn-secondary btn-sm" type="button" onClick={close}>
            Close
          </button>
        </footer>
      </Dialog>
    </>
  )
}
