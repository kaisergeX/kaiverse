'use client'

import {useCallback, useState} from 'react'

type DisclosureHookOptions = Readonly<{
  onOpen?: () => void
  onClose?: () => void
}>

type DisclosureHookReturnsType = Readonly<
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
  {onOpen, onClose}: DisclosureHookOptions = {},
): DisclosureHookReturnsType {
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
