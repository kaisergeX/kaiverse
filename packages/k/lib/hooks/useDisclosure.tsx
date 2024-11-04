'use client'

import {useCallback, useState} from 'react'

type UseDisclosureOptions = Readonly<{
  onOpen?: () => void
  onClose?: () => void
}>

type UseDisclosureReturnsType = Readonly<
  [
    boolean,
    {
      open: () => void
      close: () => void
      toggle: () => void
    },
  ]
>

/** Hook to handle disclosure state */
export function useDisclosure(
  defaultOpened = false,
  {onOpen, onClose}: UseDisclosureOptions = {},
): UseDisclosureReturnsType {
  const [isOpen, setIsOpen] = useState(defaultOpened)

  const open = useCallback(() => {
    if (!isOpen) {
      onOpen?.()
      setIsOpen(true)
    }
  }, [isOpen, onOpen])

  const close = useCallback(() => {
    if (isOpen) {
      onClose?.()
      setIsOpen(false)
    }
  }, [isOpen, onClose])

  return [isOpen, {open, close, toggle: isOpen ? close : open}] as const
}
