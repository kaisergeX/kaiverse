import {Terminal} from '#components'
import {createLazyFileRoute} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/terminal')({
  component: TerminalPage,
})

function TerminalPage() {
  return (
    <div className="container mx-auto [&>section]:h-[40dvh] space-y-4">
      <section>
        <Terminal
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
        />
      </section>
      <section>
        <Terminal
          title="Terminal (window)"
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
