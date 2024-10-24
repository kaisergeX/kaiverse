import {createRootRoute, Link, Outlet} from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="sticky top-0 p-4 shadow bg-[canvas] z-10">
        <Link className="no-underline" to="/">
          Homepage
        </Link>
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  ),
})
