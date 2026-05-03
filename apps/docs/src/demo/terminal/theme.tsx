import {Terminal} from '@kaiverse/k/ui'

export default function TerminalTheme() {
  return (
    <Terminal
      classNames={{windowHeader: '[&>h3]:m-[revert-layer]'}}
      windowTitle="Terminal (window) | Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi eum ab deleniti, non praesentium aliquid voluptas eos illo corrupti corporis minus"
      greeting="This is window theme"
      theme="window"
    />
  )
}
