import {createContext} from 'react'
import type {DialogProps} from './types'

export const DialogContext = createContext<Pick<DialogProps, 'onClose'> | undefined>(undefined)
