import {useSpeechToText, type UseSpeechToTextErrorCode} from '#hooks'
import {IconCheck, IconCopy, IconMicrophone, IconMicrophoneOff} from '@tabler/icons-react'
import {createLazyFileRoute} from '@tanstack/react-router'
import {useCallback, useRef, type MouseEventHandler} from 'react'

export const Route = createLazyFileRoute('/speech-to-text')({
  component: SpeechToTextPage,
})

const SPEECH_ERROR_MAPPING: Partial<Record<UseSpeechToTextErrorCode, string>> = {
  'audio-capture': 'Cannot detect your microphone! Please check your bluetooth/cable connection.',
  'no-speech': 'No speech',
  'language-not-supported': 'Language not supported',
}

const BTN_COPIED = [
  'text-green-500',
  'shadow-none',
  'pointer-events-none',
  'opacity-80',
  '[&>.tabler-icon-copy]:hidden',
  '[&>.tabler-icon-check]:block',
]

function SpeechToTextPage() {
  const speechErrRef = useRef<HTMLParagraphElement>(null)
  const transcriptInputRef = useRef<HTMLTextAreaElement>(null)

  const writeErr = (err: string) => {
    if (!speechErrRef.current) {
      return
    }

    speechErrRef.current.textContent = err
  }

  const {isSpeechAPIAvailable, isListening, startListening, stopListening, transcript} =
    useSpeechToText({
      lang: 'en',
      onStart: () => {
        if (speechErrRef.current?.textContent) speechErrRef.current.textContent = null
      },
      onUnMatch: () => writeErr('Cannot recognize speech.'),
      onError: (event) =>
        writeErr(
          `Error occurred in recognition: ${SPEECH_ERROR_MAPPING[event.error as UseSpeechToTextErrorCode] || event.error}`,
        ),
    })

  const handleCopyClipboard = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
    transcriptInputRef.current?.focus()
    const transcriptVal = transcriptInputRef.current?.value.trim()
    if (!transcriptVal) {
      return
    }

    const targetClasses = e.currentTarget.classList
    navigator.clipboard
      .writeText(transcriptVal)
      .then(() => {
        targetClasses.add(...BTN_COPIED)
        setTimeout(() => targetClasses.remove(...BTN_COPIED), 1500)
      })
      .catch(console.log)
  }, [])

  if (!isSpeechAPIAvailable) {
    return <div>Browser doesn't support the Web Speech API</div>
  }

  return (
    <>
      <div>
        {isListening ? (
          <>
            <button className="k-button-secondary" type="button" disabled>
              Listening...
            </button>
            <button className="k-button ml-4" type="button" onClick={stopListening}>
              <IconMicrophoneOff size={20} /> Stop
            </button>
          </>
        ) : (
          <button className="k-button" type="button" onClick={startListening}>
            <IconMicrophone size={20} /> Turn on mic
          </button>
        )}

        <p ref={speechErrRef} className="mt-2 min-h-6 text-red-500"></p>
      </div>

      <label className="group relative">
        Transcript
        <textarea
          ref={transcriptInputRef}
          className="block min-h-12 w-full resize-none rounded-md p-2 shadow-sm [field-sizing:content]"
          name="transcript"
          defaultValue={transcript}
          wrap="soft"
          placeholder="The transcript will be displayed here"
        />
        <button
          className="k-button-secondary bg-primary absolute top-8 right-2 hidden h-fit p-1 shadow group-focus-within:block"
          type="button"
          onClick={handleCopyClipboard}
        >
          <IconCopy size={16} />
          <IconCheck className="hidden" size={16} />
        </button>
      </label>
    </>
  )
}
