// SpeechRecognitionErrorCode https://wicg.github.io/speech-api/#enumdef-speechrecognitionerrorcode
export type SpeechToTextHookErrorCode =
  | 'aborted'
  | 'audio-capture'
  | 'bad-grammar'
  | 'language-not-supported'
  | 'network'
  | 'no-speech'
  | 'not-allowed'
  | 'service-not-allowed'

export type SpeechToTextHookOptions = {
  /**
   * Language of the speech.
   *
   * If not specified, this defaults to the HTML [`lang` attribute](https://developer.mozilla.orgdocs/Web/HTML/Global_attributes/lang) value. If that isn't set either then the user agent's language setting will be used.
   * ___
   * https://developer.mozilla.org/docs/Web/API/SpeechRecognition/lang
   */
  lang?: string
  onStart?: () => void
  /** Fired when the speech recognition service returns a final result with no significant recognition */
  onUnMatch?: (event: SpeechRecognitionEvent) => void
  onError?: (event: SpeechRecognitionErrorEvent) => void
  /** Fired when the speech recognition service returns a final result with significant recognition. */
  onTranscriptChange?: (transcript: string) => void
}

export type SpeechToTextHookReturn = {
  isSpeechAPIAvailable: boolean
  isListening: boolean
  /** Start the speech recognition. Do nothing if the [Web Speech API](https://developer.mozilla.org/docs/Web/API/Web_Speech_API#browser_compatibility) is not available. */
  startListening: () => void
  stopListening: () => void
  /** The result of the speech recognition. */
  transcript: string
}
