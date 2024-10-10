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

      <div className="container mx-auto h-[50dvh] p-4 relative">
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          dialogMode="non-modal"
          backdropProps={{
            blur: 2,
          }}
        >
          <Dialog.Header>
            <h2>Dialog</h2>
          </Dialog.Header>
          <img
            className="max-h-[80dvh] mx-auto block"
            src="https://i.pinimg.com/736x/68/8d/d3/688dd325dbbdc238f4b70caffe77a5af.jpg"
            alt=""
          />
          <Dialog.Footer>Footer</Dialog.Footer>
        </Dialog>
        <Terminal
          title="Terminal"
          greeting="Welcome to Terminal UI Demo!"
          commandHandler={(command, {printNode, println}) => {
            println(command)
            // printNode(<img src="https://i.redd.it/fktuppkre7p51.gif" />)
            printNode(
              <>
                <div className="text-green-400 font-bold font-sans text-lg">Anc</div>
                {`T
E  __      __        __                    
R /  \\    /  \\ ____ |  |   ____  ____   _____   ____  
M \\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
I  \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
N   \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  >
A        \\/       \\/          \\/            \\/     \\/
L\n`}
              </>,
            )
            return true
          }}
        />
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
    </>
  )
}

export default App
