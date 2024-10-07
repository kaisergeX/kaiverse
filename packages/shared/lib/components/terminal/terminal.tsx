'use client'

import {useCallback, useEffect, useMemo, useRef, useState, type FormEventHandler} from 'react'
import {classNames} from '#utils'
import {TERMINAL_CTRLS, TERMINAL_CLASSES, TERMINAL_COMMANDS} from './constants'
import type {TerminalProps} from './types'
import classes from './terminal.module.css'

const OUTPUT_SEPARATOR = '|'

function addCommandToHistory(currentCommands: string, command: string) {
  return `${currentCommands}${OUTPUT_SEPARATOR}${command}`
}

export default function Terminal({
  className,
  title,
  greeting: defaultMsg = '',
  commandPrefix = '$',
  ...htmlDivAttributes
}: TerminalProps) {
  const terminalCommandsRef = useRef<HTMLDivElement>(null)
  const terminalInput = useRef<HTMLInputElement>(null)
  const [terminalLineData, setTerminalLineData] = useState('')

  const renderTerminalOutput = useMemo(
    () =>
      terminalLineData.split(OUTPUT_SEPARATOR).map((output, idx) => <div key={idx}>{output}</div>),
    [terminalLineData],
  )

  const handleInput = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault()
    const command = new FormData(e.currentTarget).get(TERMINAL_CTRLS.INPUT)?.toString().trim()

    if (!command) {
      return
    }

    switch (command.toLowerCase()) {
      case TERMINAL_COMMANDS.CLEAR: {
        setTerminalLineData('')
        break
      }

      default: {
        setTerminalLineData((curr) =>
          addCommandToHistory(curr, `out: command not found: ${command}`),
        )
        break
      }
    }

    e.currentTarget.reset()
    setTimeout(() => terminalInput.current?.scrollIntoView({behavior: 'smooth'}))
  }, [])

  useEffect(() => {
    const inputTarget = terminalInput.current
    const containerTarget = terminalCommandsRef.current
    if (!containerTarget || !inputTarget) {
      return
    }

    const isContainerScrollable = containerTarget.scrollHeight > containerTarget.clientHeight
    if (!isContainerScrollable) {
      return
    }

    const scrollTimeoutId = setTimeout(() =>
      inputTarget.scrollIntoView({behavior: 'smooth', block: 'nearest'}),
    )

    return () => clearTimeout(scrollTimeoutId)
  }, [terminalLineData])

  return (
    <div
      className={classNames(classes.terminal, TERMINAL_CLASSES.ROOT, className)}
      onClick={() => terminalInput.current?.focus()}
      {...htmlDivAttributes}
    >
      <header className={classNames(classes.terminalHeader, TERMINAL_CLASSES.HEADER)}>
        <div className={classes.windowControls}>
          <button className={classNames(classes.macos, classes.close)} type="button"></button>
          <button className={classNames(classes.macos, classes.minimize)} type="button"></button>
          <button className={classNames(classes.macos, classes.maximize)} type="button"></button>
        </div>
        <h2>{title}</h2>
      </header>
      <div
        ref={terminalCommandsRef}
        className={classNames('kai-scrollbar', classes.terminalCommands, TERMINAL_CLASSES.COMMANDS)}
      >
        <pre>
          {defaultMsg}
          {renderTerminalOutput}
        </pre>
        <form id={TERMINAL_CTRLS.FORM} onSubmit={handleInput}>
          <span>{commandPrefix}</span>
          <input ref={terminalInput} type="text" name={TERMINAL_CTRLS.INPUT} autoComplete="off" />
        </form>
      </div>
    </div>
  )
}
