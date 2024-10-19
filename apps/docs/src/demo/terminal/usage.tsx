import {Terminal} from '@kaiverse/k/ui'

export default function TerminalUsageDemo() {
  return (
    <Terminal
      title="Terminal"
      greeting={
        <p>
          {`T
E  __      __        __                    
R /  \\    /  \\ ____ |  |   ____  ____   _____   ____  
M \\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
I  \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
N   \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  >
A        \\/       \\/          \\/            \\/     \\/
L\n\n`}
          Try command <code className="text-blue-400">hello</code> and then{' '}
          <code className="text-rose-400">clear</code>:
        </p>
      }
      commandHandler={(command, {println}) => {
        if (command === 'hello') {
          println('Hello world👋!')
          return 'skip_default'
        }
      }}
      style={{maxHeight: '30dvh'}}
    />
  )
}
