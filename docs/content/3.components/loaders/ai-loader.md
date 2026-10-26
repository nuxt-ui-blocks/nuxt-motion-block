---
title: AI Loader
description: A family of waiting indicators that share one cycle and never fake determinate progress.
---

Three shapes for the same message: dots, a sweeping bar and a nine-cell grid.
All three run on a shared 1.2 second cycle, so two loaders on one screen move as
one system instead of drifting out of tempo. None of them pretends to know how
much is left. The bar sweeps rather than filling, which is the honest signal for
a wait with no measurable end.

The grid fills on a diagonal wave using fixed per-cell delays. That ordering is
what makes it read as a sweep rather than noise, and because the delays are
constants the animation costs nothing to compute.

## Usage

Each variant is the same component with a different `variant`. `label` sits
before the indicator and becomes the announced status; `showElapsed` appends a
counter for waits long enough that a sign of progress matters.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="ai-loader-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-default bg-elevated p-6">
    <MAiLoader
      label="Thinking"
      variant="dots"
    />
    <MAiLoader
      label="Searching sources"
      variant="bar"
    />
    <MAiLoader
      label="Drafting"
      show-elapsed
      variant="grid"
    />
  </div>
</template>
```

::

The indicator inherits `currentColor`, so placing the loader inside a coloured
container recolours it without extra props.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="ai-loader-custom" />
  :::
#code
  <PlaygroundCode name="AiLoader" />
::

## Props

::component-props
  ::component-prop{name="variant" type="'dots' | 'bar' | 'grid'" default="'dots'"}
  Shape of the indicator.
  ::
  ::component-prop{name="label" type="string"}
  Text before the indicator, e.g. "Thinking". Also used as the announced status.
  ::
  ::component-prop{name="showElapsed" type="boolean" default="false"}
  Append a live elapsed counter in seconds.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the wrapper.
  ::
::

## Accessibility

- The wrapper is a `role="status"` region with `aria-live="polite"`, so a change
  of label is announced without interrupting the user.
- With a label, the visible text is the accessible name; without one, a visually
  hidden `Loading` keeps the region from being silent.
- The elapsed counter is real text and uses `tabular-nums`, so digits do not
  jitter as the number changes.
- Under `prefers-reduced-motion` every variant holds a static frame instead of
  looping. The loader is still visible and still announced; only the motion
  stops.
- Nothing is conveyed by colour or motion alone: the label and the elapsed text
  carry the state.

## Performance

- Only `opacity` and `transform` animate, both compositor properties; no layout
  or paint work happens per frame.
- The dots and grid use fixed delays and an infinite repeat handled by the
  animation engine, so no JavaScript runs after mount.
- The elapsed counter samples on animation frames but updates state only when a
  tenth of a second changes, which caps re-renders at ten per second.
- The frame loop is only started when `showElapsed` is set, and is cancelled on
  unmount.
- The bar is a single element inside a clipped track; the sweep never changes the
  track's size.
