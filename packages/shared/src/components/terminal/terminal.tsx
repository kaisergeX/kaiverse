'use client'

import {useCallback, useEffect, useMemo, useRef, useState, type FormEventHandler} from 'react'
import classes from './terminal.module.css'
import {TERMINAL_CTRLS, TERMINAL_CLASSES, TERMINAL_COMMANDS} from './constants'
import {classNames} from '#utils'
import type {TerminalProps} from './types'

const OUTPUT_SEPARATOR = '|'

function addCommandToHistory(currentCommands: string, command: string) {
  return `${currentCommands}${OUTPUT_SEPARATOR}${command}`
}

export default function Terminal({
  title,
  greeting: defaultMsg = '',
  commandPrefix = '$',
}: TerminalProps) {
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
    const scrollTimeoutId = setTimeout(() =>
      terminalInput.current?.scrollIntoView({behavior: 'smooth'}),
    )

    return () => clearTimeout(scrollTimeoutId)
  }, [terminalLineData])

  return (
    <div
      className={classNames(classes.terminal, TERMINAL_CLASSES.ROOT)}
      onClick={() => terminalInput.current?.focus()}
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
