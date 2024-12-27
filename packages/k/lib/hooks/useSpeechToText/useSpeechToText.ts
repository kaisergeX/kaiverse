import {useRef, useState, useCallback, useEffect} from 'react'
import type {UseSpeechToTextOptions, UseSpeechToTextReturn} from './useSpeechToText.types'

/** [Experimental] Hook to use the [Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API) for speech recognition. */
export const useSpeechToText = ({
  lang,
  onStart,
  onUnMatch,
  onError,
  onTranscriptChange,
}: UseSpeechToTextOptions): UseSpeechToTextReturn => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  // const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  // const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

  const isSpeechAPIAvailable = typeof window !== 'undefined' && !!SpeechRecognition
  const recognition = useRef<SpeechRecognition>(undefined)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const startListening = useCallback(() => {
    recognition.current?.start()
  }, [])

  const stopListening = useCallback(() => {
    recognition.current?.stop()
  }, [])

  useEffect(() => {
    if (!isSpeechAPIAvailable) {
      return
    }

    const speechRecognition = new SpeechRecognition()
    if (lang) {
      speechRecognition.lang = lang
    }
    recognition.current = speechRecognition

    speechRecognition.onstart = () => {
      onStart?.()
      setIsListening(true)
    }
    speechRecognition.onend = () => setIsListening(false)
    speechRecognition.onresult = (event) => {
      speechRecognition.stop()

      const resultTranscript = event.results[0]?.[0]?.transcript
      if (resultTranscript) {
        setTranscript(resultTranscript)
        onTranscriptChange?.(resultTranscript)
      }
    }
    speechRecognition.onspeechend = () => speechRecognition.stop()
    speechRecognition.onnomatch = (event) => {
      onUnMatch?.(event)
      speechRecognition.stop()
    }
    speechRecognition.onerror = (event) => {
      onError?.(event)
      speechRecognition.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeechAPIAvailable, lang, onError, onStart, onUnMatch])

  useEffect(() => {
    return () => {
      if (!recognition.current) {
        return
      }

      recognition.current.abort()
      recognition.current = undefined
    }
  }, [])

  return {
    isSpeechAPIAvailable,
    isListening,
    startListening,
    stopListening,
    transcript,
  }
}
