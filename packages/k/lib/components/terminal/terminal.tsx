'use client'

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type FormEventHandler,
} from 'react'
import {classNames} from '#utils'
import {TERMINAL_CTRLS, TERMINAL_CLASSES, TERMINAL_COMMANDS} from './constants'
import type {TerminalProps, TerminalRef} from './types'
import useTerminalHistory from './useTerminalHistory'
import {CloseIcon, MaximizeIcon, MinimizeIcon} from './icons'
import {DISPLAY_NAME_PREFIX} from '../constants'
import classes from './terminal.module.css'

/** Terminal UI component that allows users to interact with the terminal-like interface. */
const Terminal = forwardRef<TerminalRef, TerminalProps>((props, ref) => {
  const {
    className,
    title,
    greeting = '',
    commandPrefix = props.theme === 'window' ? '>' : '$',
    commandHandler,
    theme = 'macos',
    hideWindowCtrls = false,

    classNames: stylingClassNames,
    styles,
    ...htmlDivAttributes
  } = props

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

      if (commandHandler?.(command, helpers) === 'skip_default') {
        return
      }

      switch (command.toLowerCase()) {
        case TERMINAL_COMMANDS.CLEAR:
        case TERMINAL_COMMANDS.CLS: {
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

  useImperativeHandle(ref, () => helpers)

  return (
    <div
      {...htmlDivAttributes}
      className={classNames(
        TERMINAL_CLASSES.ROOT,
        `${TERMINAL_CLASSES.ROOT}--${theme}`,
        classes[theme],
        classes.terminal,
        className,
      )}
      onClick={() => terminalInput.current?.focus()}
    >
      <header
        title={title}
        className={classNames(
          TERMINAL_CLASSES.HEADER,
          classes.terminalHeader,
          stylingClassNames?.windowHeader,
        )}
        style={styles?.windowHeader}
      >
        {hideWindowCtrls || (
          <div className={classNames(TERMINAL_CLASSES.WINDOW_CTRLS, classes.windowControls)}>
            <button className={classes.close} type="button" title="Close">
              <CloseIcon />
            </button>
            <button className={classes.minimize} type="button" title="Minimize">
              <MinimizeIcon />
            </button>
            <button className={classes.maximize} type="button" title="Maximize">
              <MaximizeIcon />
            </button>
          </div>
        )}
        {title ? <h2>{title}</h2> : null}
      </header>
      <div
        ref={terminalHistoryRef}
        className={classNames(
          TERMINAL_CLASSES.HISTORY,
          classes.terminalHistory,
          stylingClassNames?.historySection,
        )}
        style={styles?.historySection}
      >
        <pre>
          {greeting ? (
            <>
              {greeting}
              {`\n`}
            </>
          ) : (
            ''
          )}
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
})

Terminal.displayName = `${DISPLAY_NAME_PREFIX}/Terminal`
export default Terminal
