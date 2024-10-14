import {Terminal, type TerminalRef} from '@kaiverse/k/ui'
import {useRef} from 'react'

export default function TerminalHelpers() {
  const terminalRef = useRef<TerminalRef>(null)

  return (
    <>
      <Terminal
        className="max-h-[40dvh]"
        ref={terminalRef}
        greeting={
          <p>
            Helpers that ship with the <code className="italic">commandHandler</code> prop:
            <br />
            <code className="text-green-400">printNode</code> - prints a React node
            <br />
            <code className="text-blue-400">println</code> - prints a string with a newline
            <br />
            <code className="text-rose-400">clearHistory</code> - clears the terminal history
            <br />
            Try typing anything
          </p>
        }
        commandHandler={(command, {printNode, println}) => {
          const currentDateTime = new Date().toLocaleTimeString()

          printNode(
            <>
              <span className="text-green-400">{currentDateTime}</span> [
              <code className="text-blue-400">printNode</code>]{' '}
              <img className="size-5 invert" src="/favicon.svg" alt="@kaiverse/k" /> Command:{' '}
              {command}
            </>,
          )
          println(`\n${currentDateTime} [println] Command: ${command}`)
          return true
        }}
      />

      <p className="mt-4 mb-2">
        You can also access these helpers via <code className="font-semibold">ref</code> as well.
      </p>
      <button
        className="btn btn-neutral"
        type="button"
        onClick={() =>
          terminalRef.current?.println(
            `${new Date().toLocaleTimeString()} [println]: Trigger println via TerminalRef`,
          )
        }
      >
        Println
      </button>
    </>
  )
}
