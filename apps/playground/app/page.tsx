import DialogWrapper from '@/components/dialog'
import TerminalPlayground from '@/components/terminal-playground'

export default function Home() {
  return (
    <div className="container mx-auto p-4 font-[family-name:var(--font-geist-sans)]">
      <DialogWrapper />
      <TerminalPlayground />
    </div>
  )
}
