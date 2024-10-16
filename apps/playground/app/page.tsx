import DialogWrapper from '@/components/dialog'
import {Terminal} from '@kaiverse/k/ui'

export default function Home() {
  return (
    <div className="container mx-auto p-4 h-[40dvh] font-[family-name:var(--font-geist-sans)]">
      <DialogWrapper />
      <Terminal />
    </div>
  )
}
