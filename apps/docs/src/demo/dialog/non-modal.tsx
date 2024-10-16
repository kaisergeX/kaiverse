import {Dialog} from '@kaiverse/k/ui'
import {classNames} from '@kaiverse/k/utils'
import {useState} from 'react'

export default function NonModalDialog() {
  const [openDialog, setOpenDialog] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <button
        className={classNames('btn mr-4', openDialog ? 'btn-secondary' : 'btn-neutral')}
        type="button"
        onClick={() => setOpenDialog(!openDialog)}
      >
        {openDialog ? 'Close' : 'Open'} Dialog
      </button>

      <button className="btn btn-outline" type="button" onClick={() => setCount(count + 1)}>
        Count++
      </button>

      <Dialog open={openDialog} dialogMode="non-modal" onClose={() => setOpenDialog(false)}>
        <Dialog.Header>
          <h2>Non-modal Dialog</h2>
        </Dialog.Header>
        <Dialog.Content>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog#accessibility:~:text=A%20non%2Dmodal%20dialog%20does%20not%20dismiss%20via%20the%20Esc%20key%20by%20default"
            target="_blank"
          >
            Read more
          </a>{' '}
          about non-modal mode and
          <br />
          related accessibility considerations.
        </Dialog.Content>
        <footer className="p-4">
          <button className="btn btn-secondary" type="button" onClick={() => setOpenDialog(false)}>
            Close
          </button>
        </footer>
      </Dialog>

      <p className="my-4">
        Count: <strong>{count}</strong>
      </p>
      <section>
        <h3>Some page content</h3>
        You can interact with the content below the non-modal dialog.
        <br />
        Try click the 2 buttons above.
      </section>
    </>
  )
}
