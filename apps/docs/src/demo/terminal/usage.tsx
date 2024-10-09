import {Terminal} from '@kaiverse/k/ui'

export default function TerminalUsageDemo() {
  return (
    <Terminal
      title="Terminal"
      greeting={`T
E  __      __        __                    
R /  \\    /  \\ ____ |  |   ____  ____   _____   ____  
M \\   \\/\\/   // __ \\|  | _/ ___\\/  _ \\ /     \\_/ __ \\ 
I  \\        /\\  ___/|  |_\\  \\__(  <_> )  Y Y  \\  ___/ 
N   \\__/\\  /  \\___  >____/\\___  >____/|__|_|  /\\___  >
A        \\/       \\/          \\/            \\/     \\/
L`}
      commandHandler={(command, {println}) => {
        if (command === 'hello') {
          println('Hello world👋!')
          return true
        }
        return false
      }}
      style={{maxHeight: '30dvh'}}
    />
  )
}
