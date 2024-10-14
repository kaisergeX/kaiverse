import {Terminal} from '@kaiverse/k/ui'

export default function TerminalStyling() {
  return (
    <Terminal
      className="bg-neutral dark:bg-base-200"
      classNames={{
        windowHeader:
          'bg-[radial-gradient(circle,rgba(34,193,195,0.4)_0%,rgba(253,187,45,0.2)_100%)] dark:bg-base-100',
        commandForm: '[&>span]:text-accent',
      }}
      title="Terminal Title ✨"
      greeting={`🎨 You can use classNames prop to style <Terminal /> component like this:\n<Terminal
  classNames={{
    windowHeader: '...',
    historySection: '...',
    commandForm: '...',
  }}
/>`}
    />
  )
}
