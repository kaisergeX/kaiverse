import {useContext} from 'react'
import {DialogContext} from '../context'

export function useDialogContext() {
  const ctx = useContext(DialogContext)
  if (!ctx) {
    throw new Error('Dialog compound components must be rendered within the Dialog component')
  }

  return ctx
}
