import {Dialog} from '@kaiverse/k/ui'
import {useState, type FormEventHandler} from 'react'
import JunkArticle from './junk-articles'

export default function DialogControlledByForm() {
  const [openDrawer, setOpenDrawer] = useState(false)
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
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDrawer(true)}>
        Open Drawer
      </button>
      <p className="my-4">
        Submitted form values:
        <br />
        <pre className="p-2 w-full rounded-lg bg-base-100 whitespace-pre-wrap [overflow-wrap:anywhere]">
          {JSON.stringify({keyword}, null, 2)}
        </pre>
      </p>

      <Dialog
        open={openDrawer}
        variant="drawer"
        offset="1.5rem"
        onClose={() => setOpenDrawer(false)}
      >
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
            <h3 className="sticky inset-x-0 top-0 bg-[canvas]">Drawer Form</h3>
            <p>
              In this form example, all inputs are uncontrolled input.
              <br />
              Check the "Keep form value" checkbox to persist the form value after submitting and
              closing the Dialog.
            </p>
            <label className="form-control w-full max-w-xs">
              <span className="label label-text">Keyword</span>
              <input
                className="input input-bordered w-full max-w-xs"
                name="keyword"
                type="text"
                placeholder="Type some keyword"
                autoFocus
              />
            </label>
            <label className="items-center flex gap-2 cursor-pointer">
              <span className="label-text">Keep form value:</span>
              <input className="checkbox" name="keepFormValue" type="checkbox" />
            </label>
          </form>
          <JunkArticle /> {/* Just to make the drawer's content long */}
        </Dialog.Content>

        <Dialog.Footer>
          <button
            className="btn btn-neutral btn-outline"
            form="form-manipulate-drawer"
            type="reset"
            onClick={() => setOpenDrawer(false)} // remove this line if you only want to reset the form value
          >
            Cancel
          </button>
          <button className="btn btn-secondary" form="form-manipulate-drawer" type="submit">
            Submit
          </button>
        </Dialog.Footer>
      </Dialog>
    </>
  )
}