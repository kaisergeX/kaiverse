import {Terminal, type TerminalRef} from '#components'
import {createLazyFileRoute} from '@tanstack/react-router'
import {useRef} from 'react'

export const Route = createLazyFileRoute('/terminal')({
  component: TerminalPage,
})

function TerminalPage() {
  const terminalRef = useRef<TerminalRef>(null)
  // const [_, forceRerender] = useReducer((s) => s + 1, 0)

  return (
    <div className="container mx-auto [&>section]:h-[40dvh] space-y-4">
      <button
        className="k-button"
        type="button"
        onClick={() => {
          if (terminalRef.current) {
            terminalRef.current.ariaDescription = '12345'
            terminalRef.current.println('Hello, world!')
            // terminalRef.current.println = () => {}
          }
        }}
      >
        Test
      </button>
      <section>
        <Terminal
          ref={terminalRef}
          // ref={(ref) => {
          //   if (ref) {
          //     ref.ariaDescription = '1234'
          //     ref.println('Hello, world!')
          //   }
          // }}
          windowTitle="Terminal (macos)"
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
        />
      </section>
      <section>
        <Terminal
          windowTitle="Terminal (window)"
          greeting={`T
E  __      __        __                    
R /  \\    /  \\ ____ |  |   ____  ____   _____   ____  
M \\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
I  \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
N   \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  >
A        \\/       \\/          \\/            \\/     \\/
L\n`}
          theme="window"
        />
      </section>
    </div>
  )
}
