import {SlideAction, type SlideActionOnSwipeEnd} from '#components'
import {useCallback, useState} from 'react'
import {IconCheck} from './assets'

function App() {
  const [status, setStatus] = useState(false)

  const handleOnSwipeEnd = useCallback<SlideActionOnSwipeEnd>((reset) => {
    // do sth when users swiped to the end
    setTimeout(() => {
      reset()
    }, 1000)
  }, [])

  return (
    <>
      {/* <Terminal
        title="Terminal (macos)"
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
          return 'skip_default'
        }}
      /> */}

      <SlideAction
        label="Swipe to confirm"
        color={status ? '#059669' : undefined}
        icon={status ? <IconCheck className="size-5 text-white" /> : undefined}
        onChange={(isConfirmed) => setStatus(isConfirmed)}
        onSwipeEnd={handleOnSwipeEnd}
      />
    </>
  )
}

export default App
