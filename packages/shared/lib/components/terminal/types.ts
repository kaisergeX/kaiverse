import type {HTMLAttributes, ReactNode} from 'react'

export type PrintlnFn = (input: string) => void

type Props = {
  title?: string
  greeting?: ReactNode
  /** @default '$' */
  commandPrefix?: string
  /**
   * Custom command handler
   * ___
   * Default commands:
   * - `clear` - clear the terminal
   * - Others - println: "command not found".
   *
   * @param command need to be handled
   * @returns `true` if the command is manually handled. `false` - commands will be executed by default handler.
   */
  commandHandler?: (command: string, println: PrintlnFn) => boolean
}

export type TerminalProps = Props & Omit<HTMLAttributes<HTMLDivElement>, keyof Props | 'onClick'>
