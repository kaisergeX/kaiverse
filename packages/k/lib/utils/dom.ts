import type {SyntheticEvent} from 'react'

/**
 * @example
 * <button onClick={eventStop(props?.onClick)}/>
 * // equavalent to
 * <button onClick={(e) => {
 *    e.stopPropagation()
 *    props?.onClick?.(e)
 * }}/>
 */
export const eventStop =
  <TEvent extends SyntheticEvent>(handler?: (event: TEvent) => void) =>
  (event: TEvent) => {
    event.stopPropagation()
    handler?.(event)
  }

/**
 * @example
 * <button onClick={eventPrevent(props?.onClick)}/>
 * // equavalent to
 * <button onClick={(e) => {
 *    e.preventDefault()
 *    props?.onClick?.(e)
 * }}/>
 */
export const eventPrevent =
  <TEvent extends SyntheticEvent>(handler?: (event: TEvent) => void) =>
  (event: TEvent) => {
    event.preventDefault()
    handler?.(event)
  }
