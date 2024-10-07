import {Dialog, SlideAction, Terminal, type SlideActionOnSwipeEnd} from '#components'
import {useCallback, useState} from 'react'

function App() {
  const [openDialog, setOpenDialog] = useState(false)
  const [status, setStatus] = useState(false)

  const handleOnSwipeEnd = useCallback<SlideActionOnSwipeEnd>((reset) => {
    // do sth when users swiped to the end
    setTimeout(() => {
      reset()
    }, 1000)
  }, [])

  return (
    <>
      <h1>Kaiverse</h1>
      <button className="k-button" onClick={() => setOpenDialog(true)}>
        Open dialog
      </button>

      <div className="container mx-auto h-[50dvh] p-4">
        <Terminal title="Terminal" greeting="Welcome to Terminal UI Demo!" />
      </div>

      <SlideAction
        label="Swipe to confirm"
        color={status ? '--cdg-color-success' : undefined}
        icon={
          status ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="size-5 text-white"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
          ) : undefined
        }
        onChange={(isConfirmed) => setStatus(isConfirmed)}
        onSwipeEnd={handleOnSwipeEnd}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        variant="drawer"
        backdropProps={{
          blur: 2,
        }}
      >
        <Dialog.Header onClose={() => setOpenDialog(false)}>
          <h2>Dialog</h2>
        </Dialog.Header>
        <p>Dialog content</p>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog>
    </>
  )
}

export default App
