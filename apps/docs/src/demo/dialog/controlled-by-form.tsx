import {Dialog} from '@kaiverse/k/ui'
import {useState, type FormEventHandler} from 'react'
import {useDisclosure} from '@kaiverse/k/hooks'
import JunkArticle from './junk-articles'

export default function DialogControlledByForm() {
  const [opened, {open, close}] = useDisclosure(false)
  const [keyword, setKeyword] = useState('') // just for display form value

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    const formData = new FormData(e.currentTarget)
    setKeyword((formData.get('keyword') as string) || '')

    if (!formData.get('keepFormValue')) {
      e.currentTarget.reset()
    }
  }

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={open}>
        Open Drawer
      </button>
      <section className="my-4">
        <strong>Submitted form values:</strong>
        <pre className="p-2 w-full rounded-lg bg-base-100 whitespace-pre-wrap wrap-anywhere">
          {JSON.stringify({keyword}, null, 2)}
        </pre>
      </section>

      <Dialog open={opened} variant="drawer" offset="1rem" onClose={close}>
        <Dialog.Header>
          <Dialog.Title>Drawer controlled by form</Dialog.Title>
          <Dialog.CloseButton />
        </Dialog.Header>
        <Dialog.Content className="py-0">
          <form
            className="space-y-4 border-2 border-neutral-200 rounded-lg p-4"
            id="form-manipulate-drawer"
            method="dialog"
            onSubmit={handleFormSubmit}
          >
            <h3 className="sticky sticky-bg inset-x-0 top-0">Drawer Form</h3>
            <p>
              In this form example, all inputs are uncontrolled input.
              <br />
              Check the "Keep form value" checkbox to persist the form value after submitting and
              closing the Dialog.
            </p>
            <label className="fieldset w-full max-w-xs text-base">
              <span className="fieldset-legend">Keyword</span>
              <input
                className="input input-bordered w-full max-w-xs"
                name="keyword"
                type="text"
                placeholder="Type some keyword"
                autoFocus
              />
            </label>
            <label className="label text-base-content font-semibold">
              <input className="checkbox" name="keepFormValue" type="checkbox" />
              Keep form value
            </label>
          </form>
          <JunkArticle /> {/* Just to make the drawer's content long */}
        </Dialog.Content>

        <Dialog.Footer>
          <button
            className="btn btn-outline"
            form="form-manipulate-drawer"
            type="reset"
            onClick={close} // remove this line if you only want to reset the form value
          >
            Cancel
          </button>
          <button className="btn btn-success" form="form-manipulate-drawer" type="submit">
            Submit
          </button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}
