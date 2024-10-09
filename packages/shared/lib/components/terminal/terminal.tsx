'use client'

import {useCallback, useEffect, useRef, type FormEventHandler} from 'react'
import {classNames} from '#utils'
import {TERMINAL_CTRLS, TERMINAL_CLASSES, TERMINAL_COMMANDS} from './constants'
import type {TerminalProps} from './types'
import classes from './terminal.module.css'
import useTerminalHistory from './useTerminalHistory'

export default function Terminal({
  className,
  title,
  greeting: defaultMsg = '',
  commandPrefix = '$',
  commandHandler,

  classNames: stylingClassNames,
  styles,
  ...htmlDivAttributes
}: TerminalProps) {
  const terminalHistoryRef = useRef<HTMLDivElement>(null)
  const terminalInput = useRef<HTMLInputElement>(null)
  const {renderHistories, helpers} = useTerminalHistory()

  const handleInput = useCallback<FormEventHandler<HTMLFormElement>>(
    (e) => {
      e.preventDefault()

      const command = new FormData(e.currentTarget).get(TERMINAL_CTRLS.INPUT)?.toString().trim()
      if (!command) {
        return
      }

      e.currentTarget.reset()

      if (commandHandler?.(command, helpers)) {
        return
      }

      switch (command.toLowerCase()) {
        case TERMINAL_COMMANDS.CLEAR: {
          helpers.clearHistory()
          break
        }

        default: {
          helpers.println(`out: command not found: ${command}`)
          break
        }
      }
    },
    [commandHandler, helpers],
  )

  useEffect(() => {
    const inputTarget = terminalInput.current
    const containerTarget = terminalHistoryRef.current
    if (!containerTarget || !inputTarget) {
      return
    }

    /**
     * Known issue(? or feature):
     *
     * When `printNode` some delay-painting contents (eg: `<img src="url"/>` - fetching/rendering un-cached images),
     * this code below mights execute before these contents are completely painted by browsers.
     * So users will have to tap anywhere inside the `<Terminal/>` or type sth or manually scroll to see the bottom of history list.
     *
     * After that, fetched contents might be cached by browsers, then when `printNode` the same contents, users will see the bottom correctly.
     *
     * Why this behavior can be consider a "won't fix" issue?
     * → Its ok when users have to review/view these contents (from top to bottom) the 1st time.
     * On top of that, with unstable internet connection, hard to make sure to scroll after these contents are fetched and completely painted.
     */
    const scrollToInput = () => {
      const isContainerScrollable = containerTarget.scrollHeight > containerTarget.clientHeight
      if (!isContainerScrollable) {
        window.cancelAnimationFrame(frameId)
        return
      }

      inputTarget.scrollIntoView({block: 'nearest'})
    }

    const frameId = window.requestAnimationFrame(scrollToInput)
    return () => window.cancelAnimationFrame(frameId)
  }, [renderHistories])

  return (
    <div
      className={classNames(classes.terminal, TERMINAL_CLASSES.ROOT, className)}
      {...htmlDivAttributes}
      onClick={() => terminalInput.current?.focus()}
    >
      <header
        className={classNames(
          classes.terminalHeader,
          stylingClassNames?.windowHeader,
          TERMINAL_CLASSES.HEADER,
        )}
        style={styles?.windowHeader}
      >
        <div className={classes.windowControls}>
          <button className={classNames(classes.macos, classes.close)} type="button"></button>
          <button className={classNames(classes.macos, classes.minimize)} type="button"></button>
          <button className={classNames(classes.macos, classes.maximize)} type="button"></button>
        </div>
        <h2>{title}</h2>
      </header>
      <div
        ref={terminalHistoryRef}
        className={classNames(
          classes.terminalHistory,
          stylingClassNames?.historySection,
          TERMINAL_CLASSES.HISTORY,
        )}
        style={styles?.historySection}
      >
        <pre>
          {defaultMsg}
          {'\n'}
          {renderHistories}
        </pre>
        <form
          id={TERMINAL_CTRLS.FORM}
          className={stylingClassNames?.commandForm}
          onSubmit={handleInput}
          style={styles?.commandForm}
        >
          <span>{commandPrefix}</span>
          <input
            ref={terminalInput}
            className={TERMINAL_CLASSES.INPUT}
            type="text"
            name={TERMINAL_CTRLS.INPUT}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  )
}
