<div align="center">
<h1>Kaiverse</h1>

<p>Collection of powerful utility functions, uncommon React components & hooks.</p>

[![npm](https://img.shields.io/npm/v/@kaiverse/k)](https://www.npmjs.com/package/@kaiverse/k)
[![.github/workflows/ci.yml](https://github.com/kaisergeX/kaiverse/actions/workflows/ci.yml/badge.svg)](https://github.com/kaisergeX/kaiverse/actions/workflows/ci.yml)

</div>

## Docs

[Documentation page](https://kaisergex.github.io/kaiverse/)

## Installation

### Via `npmjs`

```
npm i @kaiverse/k
```

```
pnpm add @kaiverse/k
```

## Packages

- `@kaiverse/k/ui`: uncommon React components.
- `@kaiverse/k/hooks`: Hooks.
- `@kaiverse/k/utils`: Utility functions.

_Note:_ `@kaiverse/k/ui` is not a common React component library. It's a collection of rarely used components.

If you are looking for a component library with a wide range of components from basic (eg: `<Button>`, `<Input>`, `<Layout>`) to complex (such as `<RichTextEditor>`, `<Chart>`),
I highly recommend [shadcn UI](https://ui.shadcn.com/), [Mantine](https://mantine.dev/), and [daisyui](https://daisyui.com/).

## Usage with Server Components

All `@kaiverse/k/ui` components already have `'use client';` directive at the top of the file.

_Note:_ Some components like [Dialog](https://kaisergex.github.io/kaiverse/components/dialog/) have associated compound components. Compound
components cannot be used in server components. Instead of `Component.X` syntax, use `ComponentX`
or add `'use client'` directive to the top of your pages/layouts/components.
