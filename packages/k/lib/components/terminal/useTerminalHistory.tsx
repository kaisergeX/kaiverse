import {
  Fragment,
  isValidElement,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
  type JSX,
} from 'react'
import type {PrintlnFn, PrintNodeFn, TerminalHelpers} from './types'

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

export default function useTerminalHistory(): UseTerminalHistoryReturnType {
  const [terminalHistory, setTerminalHistory] = useState<ReactNode[]>([])

  const println = useCallback<PrintlnFn>((input) => {
    setTerminalHistory((curr) => addCommandToHistory(curr, `${input}\n`))
  }, [])

  const printNode = useCallback<PrintNodeFn>((node) => {
    if (isBannedNodeType(node)) {
      return
    }

    setTerminalHistory((curr) => addCommandToHistory(curr, node))
  }, [])

  const clearHistory = useCallback(() => setTerminalHistory([]), [])

  const helpers = useMemo(
    () => Object.freeze({println, printNode, clearHistory}),
    [clearHistory, printNode, println],
  )

  const renderHistories = useMemo(
    () => terminalHistory.map((node, idx) => <Fragment key={idx}>{node}</Fragment>),
    [terminalHistory],
  )

  return {renderHistories, helpers}
}
