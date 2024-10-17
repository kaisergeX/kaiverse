import {Dialog} from '@kaiverse/k/ui'
import {useState} from 'react'
import JunkArticle from './junk-articles'
import {IconX} from '../icon'

export default function WithoutCompoundComponents() {
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
      <button className="btn btn-neutral" type="button" onClick={() => setOpenDrawer(true)}>
        Open Drawer
      </button>
      <Dialog
        className="[&[open]]:flex flex-col"
        open={openDrawer}
        variant="drawer"
        offset="1.5rem"
        onClose={() => setOpenDrawer(false)}
      >
        <header className="p-4 flex items-center justify-between gap-4">
          <h2>Drawer controlled by form</h2>
          <button
            className="btn btn-ghost btn-circle btn-sm"
            type="button"
            onClick={() => setOpenDrawer(false)}
          >
            <IconX />
          </button>
        </header>
        <article className="flex-1 px-4 overflow-y-auto">
          <form
            className="space-y-4 border-2 border-neutral-200 rounded-lg p-4"
            id="form-dialog-without-compound"
            method="dialog"
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
                name="keyword-input"
                type="text"
                placeholder="Type something..."
                autoFocus
              />
            </label>
          </form>
          <JunkArticle /> {/* Just to make the drawer's content long */}
        </article>
        <footer className="p-4 flex justify-between items-center">
          <button
            className="btn btn-neutral btn-outline"
            form="form-dialog-without-compound"
            type="reset"
            onClick={() => setOpenDrawer(false)} // remove this line if you only want to reset the form value
          >
            Cancel
          </button>
          <button className="btn btn-secondary" form="form-dialog-without-compound" type="submit">
            Submit
          </button>
        </footer>
      </Dialog>
    </>
  )
}
