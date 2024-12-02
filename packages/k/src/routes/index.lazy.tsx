import {createLazyFileRoute, Link} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Homepage,
})

function Homepage() {
  return (
    <>
      <section className="p-4 space-y-4">
        <h2>Components</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,_1fr))]">
          <Link to="/dialog" className="card">
            <h3 className="gradient-leaf">Dialog</h3>
            <p>
              Display overlay area on top of a page. Build on top of the native HTML {`<dialog />`}{' '}
              element.
            </p>
          </Link>
          <Link to="/terminal" className="card">
            <h3 className="gradient-fall">Terminal</h3>
            <p>
              Terminal UI component that allows users to interact with the terminal-like interface.
            </p>
          </Link>
          <Link to="/slide-action" className="card">
            <h3 className="gradient-maple">SlideAction</h3>
            <p>A component that requires user to swipe to confirm an action.</p>
          </Link>
        </div>
      </section>

      <section className="p-4 space-y-4">
        <h2>Hooks</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))]">
          <Link to="/use-drag" className="card">
            <h3 className="gradient-fire">useDrag</h3>
            <p>Feature-rich Drag element hook.</p>
          </Link>
          <Link to="/speech-to-text" className="card">
            <h3 className="gradient-nature">useSpeechToText</h3>
            <p>Hook to use the Web Speech API for speech recognition.</p>
          </Link>
        </div>
      </section>

      <section className="p-4 space-y-4">
        <h2>Games</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(18rem,_1fr))]">
          <Link to="/sudoku" className="card">
            <h3 className="gradient-leaf">Sudoku</h3>
            <p>
              The popular Japanese puzzle game Sudoku is based on the logical placement of numbers.
            </p>
          </Link>
        </div>
      </section>
    </>
  )
}
