import type {HTMLAttributes} from 'react'

type Props = {
  title?: string
  greeting?: string
  /** @default '$' */
  commandPrefix?: string
}

export type TerminalProps = Props & Omit<HTMLAttributes<HTMLDivElement>, keyof Props | 'onClick'>
