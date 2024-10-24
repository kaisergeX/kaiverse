import {useSpeechToText, type UseSpeechToTextErrorCode} from '@kaiverse/k/hooks'
import {IconMicrophoneOff, IconMicrophone, IconCopy, IconCheck} from '@tabler/icons-react'
import {useRef, useCallback, type MouseEventHandler, useState} from 'react'

export default function SpeechToTextDemo() {
  const speechErrRef = useRef<HTMLParagraphElement>(null)
  const transcriptInputRef = useRef<HTMLTextAreaElement>(null)

  const writeErr = (err: string) => {
    if (!speechErrRef.current) {
      return
    }

    speechErrRef.current.textContent = err
  }

  const [transcriptHistory, setTranscriptHistory] = useState('')

  const {isSpeechAPIAvailable, isListening, startListening, stopListening} = useSpeechToText({
    lang: 'en',
    onTranscriptChange: setTranscriptHistory,
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
      <p className="mb-4">
        Language of the Speech Recognition:{' '}
        <strong>
          <code>en</code> - English
        </strong>
      </p>
      <div>
        {isListening ? (
          <div className="flex items-center gap-4">
            <div>Listening...</div>
            <button className="btn btn-neutral" type="button" onClick={stopListening}>
              <IconMicrophoneOff size={20} /> Stop
            </button>
          </div>
        ) : (
          <button className="btn btn-neutral btn-outline" type="button" onClick={startListening}>
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
          defaultValue={transcriptHistory}
          wrap="soft"
          placeholder="The transcript will be displayed here"
          readOnly
        />
        {!transcriptHistory || (
          <button
            className="btn btn-ghost btn-outline btn-square btn-sm absolute top-8 right-2 hidden h-fit group-focus-within:block"
            type="button"
            onClick={handleCopyClipboard}
          >
            <IconCopy size={16} />
            <IconCheck className="hidden mx-auto" size={16} />
          </button>
        )}
      </label>
    </>
  )
}

const SPEECH_ERROR_MAPPING: Partial<Record<UseSpeechToTextErrorCode, string>> = {
  'audio-capture': 'Cannot detect your microphone! Please check your bluetooth/cable connection.',
  'no-speech': 'No speech',
  'language-not-supported': 'Language not supported',
}

const BTN_COPIED = [
  'text-green-500',
  'pointer-events-none',
  'opacity-80',
  '[&>.tabler-icon-copy]:hidden',
  '[&>.tabler-icon-check]:block',
]
