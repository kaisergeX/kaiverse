import {Terminal, TERMINAL_COMMANDS, type TerminalRef} from '@kaiverse/k/ui'
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
            Try command <span className="font-bold text-primary">print</span> or{' '}
            <code className="font-semibold text-primary">p</code> to log messages, and then{' '}
            <span className="font-bold text-rose-400">{TERMINAL_COMMANDS.CLEAR}</span>.
          </p>
        }
        commandHandler={(rawCommand, {printNode, println}) => {
          const command = rawCommand.trim()

          if (command === 'print' || command === 'p') {
            const currentDateTime = new Date().toLocaleTimeString()

            printNode(
              <>
                <span className="text-green-400">{currentDateTime}</span> [
                <code className="text-blue-400">printNode</code>]{' '}
                <img
                  className="size-5"
                  src="https://icons.iconarchive.com/icons/iconarchive/dogecoin-to-the-moon/48/Doge-icon.png"
                  alt="@kaiverse/k"
                />{' '}
                Command: {command}
              </>,
            )
            println(`\n${currentDateTime} [println] Command: ${command}`)
            return 'skip_default' // skip the default handler
          }

          // let the default handler handle all other commands
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
