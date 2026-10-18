---
title: Dot Morph Button
description: A UButton whose leading dot turns from a circle into a pill on hover, sized to the button itself.
---

A `UButton` with a leading dot that turns from a 16px circle into a 12px pill while
the pointer is over the button. Everything else is the button you already know:
`color`, `variant`, `size`, `loading`, `disabled` and the `leading` / `trailing` icons
all behave as they do on `UButton`.

The dot is fixed at 16px, which is fine at `md` and wrong at `xs` or `xl`. So the pill
height is measured off the button element with a `ResizeObserver` and capped at 28px:
change the size prop, or let the row reflow, and the dot re-measures instead of
spilling out of the button.

## Usage

Give it a `label` and hover it. Pass a `dot-color` when the dot should read against
the button rather than match it — a destructive button with a primary dot looks
unfinished.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dot-morph-button-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MDotMorphButton label="Run deploy" />
      <MDotMorphButton
        label="Destroy"
        color="error"
        variant="soft"
        dot-color="error"
      />
      <MDotMorphButton
        label="Docs"
        color="neutral"
        variant="outline"
        dot-color="neutral"
        trailing-icon="i-lucide-arrow-up-right"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      On hover the leading dot turns from a 16px circle into a 12px pill. Its height is measured off
      the button itself and capped at 28px, so the dot never outgrows a small or an extra large
      button.
    </p>
  </div>
</template>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dot-morph-button-custom" />
  :::
#code
  <PlaygroundCode name="DotMorphButton" />
::

## Props

::component-props
  ::component-prop{name="color" type="ButtonProps['color']" default="'primary'"}
  Forwarded to the inner `UButton`. Because it is a declared prop it is bound
  explicitly and cannot be overridden through fallthrough attributes.
  ::
  ::component-prop{name="variant" type="ButtonProps['variant']" default="'solid'"}
  Forwarded to the inner `UButton`, same caveat as `color`.
  ::
  ::component-prop{name="size" type="ButtonProps['size']" default="'md'"}
  Forwarded to the inner `UButton`. The dot re-measures through a `ResizeObserver`, so
  the pill height follows this value.
  ::
  ::component-prop{name="dotColor" type="string" default="'primary'"}
  A Nuxt UI palette key, interpolated into `var(--color-<value>-500)` and applied as
  the dot's `background`. It is not free-form CSS — see the note below.
  ::
  ::component-prop{name="label" type="string" default="'Dot-Morph'"}
  The button label, used when no default slot is supplied.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's content, replacing `label`.
  ::
  ::component-slot-row{name="trailing"}
  Forwarded to the inner `UButton`'s `trailing` slot. The wrapper template here is
  declared unconditionally, so unlike `ButtonCopy` an absent slot still leaves
  `UButton`'s trailing element in the DOM.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dotMorphButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="leading"}
  `flex h-4 w-4 shrink-0 items-center justify-center`
  ::
  ::component-slot-row{name="dot"}
  `flex items-center justify-center`
  ::
::

## Accessibility

The root is a real `UButton`, so it is a `<button type="button">` with the usual focus
ring and keyboard activation. The dot is an empty `<span>` with no text and no role, so
it adds nothing to the accessibility tree — though the component does not mark it
`aria-hidden` either.

The morph is pointer-only: it is driven by `mouseenter` on a device matching
`(hover: hover) and (pointer: fine)`, so keyboard focus produces no change and a
touch user never sees the pill. Under `prefers-reduced-motion` the transition duration
is forced to `0` and the animate target collapses to the base circle, so the dot never
changes shape.

## Performance

- A `ResizeObserver` watches the button element and recomputes the pill height whenever
  the button resizes. It is disconnected on unmount.
- Two media queries — hover capability and reduced motion — are tracked with `change`
  listeners that are removed on unmount.
- The morph animates `width` and `height` through a spring, and both are layout
  properties, so the 0.25s morph re-runs layout on the dot and its parent every frame.
  `border-radius` is animated too but stays pinned at `999px`, so it costs paint only.
- The dot's colour is one computed `var(--color-…)` reference, so changing `dotColor`
  swaps a background value instead of re-mounting the dot.
- Leaving hover only flips `isHovered`; the idle `animate` target is rebuilt to the same
  base values each time.

::tip
`dot-color` is string-interpolated into a CSS variable name, so it must be a Nuxt UI
palette key such as `primary` or `error`. Pass `#ff0000` and the component asks for
`var(--color-#ff0000-500)`, which resolves to nothing and the dot renders transparent.
::

