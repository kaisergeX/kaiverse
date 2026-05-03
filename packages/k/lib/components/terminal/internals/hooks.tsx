import {Fragment, isValidElement, useMemo, useState, type JSX, type ReactNode} from 'react'
import type {TerminalHelpers} from '../types'

function addCommandToHistory(histories: ReactNode[], pushedHistory: ReactNode) {
  return histories.concat(pushedHistory)
}

const BANNED_NODE_TYPE = ['iframe', 'object', 'embed', 'html']

function isBannedNodeType(node: ReactNode) {
  if (isValidElement(node)) {
    return BANNED_NODE_TYPE.includes(node.type.toString())
  }

  return true
}

type UseTerminalHistoryReturnType = {
  renderHistories: JSX.Element[]
  helpers: TerminalHelpers
}

export function useTerminalHistory(): UseTerminalHistoryReturnType {
  const [terminalHistory, setTerminalHistory] = useState<ReactNode[]>([])

  const helpers = useMemo<TerminalHelpers>(
    () =>
      Object.freeze({
        println: (input) => setTerminalHistory((curr) => addCommandToHistory(curr, `${input}\n`)),
        printNode: (node) => {
          if (isBannedNodeType(node)) {
            return
          }

          setTerminalHistory((curr) => addCommandToHistory(curr, node))
        },
        clearHistory: () => setTerminalHistory([]),
      }),
    [],
  )

  const renderHistories = useMemo(
    () => terminalHistory.map((node, idx) => <Fragment key={idx}>{node}</Fragment>),
    [terminalHistory],
  )

  return {renderHistories, helpers}
}
