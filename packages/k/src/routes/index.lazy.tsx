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
              Display overlay area on top of a page and slides in from the side. Build on top of the
              native HTML {`<dialog />`} element.
            </p>
          </Link>
          <Link to="/terminal" className="card">
            <h3 className="gradient-fall">Terminal</h3>
            <p>
              Terminal UI component that allows users to interact with the terminal-like interface.
            </p>
          </Link>
        </div>
      </section>
      <section className="p-4 space-y-4">
        <h2>Hooks</h2>
        <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(16rem,_1fr))]">
          <Link to="/use-drag" className="card">
            <h3 className="gradient-maple">useDrag</h3>
          </Link>
        </div>
      </section>
    </>
  )
}
