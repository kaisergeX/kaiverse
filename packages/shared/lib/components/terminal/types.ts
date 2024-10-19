import type {CSSProperties, HTMLAttributes, ReactNode} from 'react'

export type TerminalStylingSelectors = 'windowHeader' | 'historySection' | 'commandForm'

export type PrintlnFn = (text: string) => void
export type PrintNodeFn = (node: ReactNode) => void
export type TerminalHelpers = Readonly<{
  /** Print a string */
  println: PrintlnFn
  /**
   * Print a `ReactNode` to Terminal history section.
   * ___
   * **Note**: The following element types will be ignored:
   *
   * 1. Primitive data: `string`, `number`, `boolean`. Please use `println` helper instead.
   * 2. object, array. If you wanna show a list of elements in only one call, wrap it with an element (eg: `<>{contents}</>`).
   * 3. HTML element: `iframe`, `object`, `embed`, `html`.
   */
  printNode: PrintNodeFn
  clearHistory: () => void
}>

type Props = {
  /** Applies className to related element. */
  classNames?: Partial<Record<TerminalStylingSelectors, string>>
  /**
   * Applies inline styles to related element.
   *
   * It is NOT recommended to use this prop, as the `classNames` prop is more flexible and has better performance.
   */
  styles?: Partial<Record<TerminalStylingSelectors, CSSProperties>>
  // /** @default 'macos' */
  // theme?: 'macos' | 'window'

  title?: string
  greeting?: ReactNode
  /**
   * By default, the prefix is:
   * - `'$'`
   * - `'>'` (if `theme` is `'window'`)
   */
  commandPrefix?: string
  /**
   * Custom command handler
   * ___
   * Default commands:
   * - `clear` | `cls` - clear the terminal history.
   * - Others - println: "command not found".
   *
   * @param command need to be handled
   * @returns `skip_default` if the command is manually handled and you wanna skip the default handler. Otherwise, commands will be executed by it.
   */
  commandHandler?: (command: string, helper: TerminalHelpers) => 'skip_default' | void
  /** @default 'macos' */
  theme?: 'macos' | 'window'
  /** @default false */
  hideWindowCtrls?: boolean
}

export type TerminalProps = Props & Omit<HTMLAttributes<HTMLDivElement>, keyof Props | 'onClick'>

export type TerminalRef = TerminalProps & TerminalHelpers
