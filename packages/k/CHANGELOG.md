# @kaiverse/k

## 0.2.0

### Minor Changes

- dd94c07: Update docs for NextJS supports
- ee7c346: `SlideAction`: Add styling APIs & docs.<br/>`useDrag`: re-organize folder structure, improve `options` memorization.
- 69e7da3: `Terminal`: `commandHandler` now should returns `'skip_default'` to skip the default handler instead of `true`.

  Update `Dialog` & `Terminal` docs.

- 7bb5ed8: Support NextJS App dir.

## 0.1.0

### Minor Changes

- a87c8ce: Add `SlideAction` component, setup lib mode.
- 10ed788: Components: Terminal, Dialog | Hooks: useDOMRef, useIsomorphicLayoutEffect
- ee2dec4: `Dialog`: update styles, add docs.
- 3f525b6: `Terminal`: add `commandHandler` prop & doc page.
- 11b76e7: `Terminal` add `theme` & `hideWindowCtrls` prop.

  `Dialog` remove `root` selector from styling APIs.

### Patch Changes

- b617340: `Terminal`: assign styles into layer.

  `[docs]`: Switch to [Starlight](https://starlight.astro.build), add doc for `useDebouncedState` hook.