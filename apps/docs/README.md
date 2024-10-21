<div align="center">
<h1>Kaiverse</h1>

<p>
  Documentation page for
  <a href="/packages/k">
    <code>@kaiverse/k</code>
  </a>
  <br />A collection of powerful utility functions, React components & hooks. Typescript supported.
</p>

[![.github/workflows/ci.yml](https://github.com/kaisergeX/kaiverse/actions/workflows/ci.yml/badge.svg)](https://github.com/kaisergeX/kaiverse/actions/workflows/ci.yml)
[![built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

</div>

## Installation

```
pnpm i
```

## Development

```
pnpm dev
```

## Build

```
pnpm build
```

This command generates static content into the `dist` directory and can be served using any static contents hosting service.

## Contribute notes

### `Module "..." has been externalized for browser compatibility` warning

When building, please pay attention to this warning, this issue can cause Astro/Vite build problem that will include many node polyfills in the final bundle, and increase the bundle size.

It probably means new changes in some client component is using variables/functions that belong to Astro server only or not supposed to be used in the client side (eg: `import.meta.env.BASE_URL`).
