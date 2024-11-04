import {useDisclosure} from '@kaiverse/k/hooks'
import {classNames} from '@kaiverse/k/utils'

export default function ControlledDetailsDemo() {
  const [opened, {open, close, toggle}] = useDisclosure(false)

  return (
    <>
      <p>
        State:{' '}
        <strong className={opened ? 'text-success' : 'text-error'}>{opened.toString()}</strong>
      </p>

      <button
        className={classNames('btn my-4', opened ? 'btn-secondary' : 'btn-neutral')}
        type="button"
        onClick={toggle}
      >
        {opened ? 'Close' : 'Open'} {'<details>'} element
      </button>

      <details
        open={opened}
        // browsers can open <details> element automatically on some cases, eg: users search for contents that are inside <details> element.
        // so with "controlled" approach, we need to sync react `state` with the inner state of the <details> element.
        onToggle={(e) => (e.currentTarget.open ? open() : close())}
      >
        <summary
          onClick={(e) => {
            e.preventDefault()
            toggle()
          }}
        >
          System Requirements
        </summary>
        <p>
          Requires a computer running an operating system. The computer must have some memory and
          ideally some kind of long-term storage. An input device as well as some form of output
          device is recommended.
        </p>
      </details>
    </>
  )
}
