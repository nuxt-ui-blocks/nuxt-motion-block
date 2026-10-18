---
title: Smooth Button
description: A button with a skewed light sweep on hover and a press scale, wrapped so every UButton prop still works.
---

Two effects around a normal `UButton`: the whole thing scales to `0.95` while the
mouse is held down, and a skewed white gradient sweeps left-to-right across the
button's face on hover.

The component is a wrapper, not a reimplementation. `inheritAttrs` is off and every
attribute is re-bound onto an inner `UButton`, so the entire `UButton` API — `label`,
`icon`, `trailing-icon`, `color`, `variant`, `size`, `loading`, `disabled`, `block`,
`to` — keeps working exactly as it would on its own. The sheen is a sibling overlay
clipped to the button's measured `border-radius`, so it follows the rounding of
whatever you pass instead of carrying its own.

## Usage

Use it wherever you would use `UButton` and want the sweep: pass `label` and the
standard button props, or put your own content in the default slot. Nothing else is
required.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="smooth-button-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6 py-6">
    <div class="flex flex-wrap items-center justify-center gap-4">
      <MSmoothButton
        label="Hover me"
        color="primary"
      />
      <MSmoothButton
        label="And me"
        color="neutral"
        variant="outline"
      />
      <MSmoothButton
        icon="i-lucide-zap"
        color="neutral"
        variant="soft"
        aria-label="Ship it"
      />
    </div>

    <p class="max-w-xs text-center text-xs text-muted">
      The sheen is a sibling overlay clipped to the button's own radius, so it follows the rounding
      of whatever you pass. It is pointer-events-none: hover states, focus rings and clicks all pass
      straight through to the button underneath.
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
    <component-example name="smooth-button-custom" />
  :::
#code
  <PlaygroundCode name="SmoothButton" />
::

## Props

SmoothButton declares no props of its own. Everything it renders comes from the inner
`UButton` through `v-bind="$attrs"`: `label`, `icon`, `trailingIcon`, `color`,
`variant`, `size`, `loading`, `disabled`, `block`, `to`, `type`, `aria-label` and any
other `UButton` prop or attribute.

::component-props
  ::component-prop{name="class" type="string"}
  A fallthrough attribute rather than a declared prop. It is bound onto the inner
  `UButton`, so it styles the button itself and never reaches the wrapper — see the
  tip below for why that matters.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The button's content. Rendered inside the inner `UButton`; when the slot is empty
  the button falls back to its `label` prop as usual.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.smoothButton` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative inline-block`
  ::
  ::component-slot-row{name="shine"}
  `pointer-events-none absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300`
  ::
  ::component-slot-row{name="shineBar"}
  `absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent mix-blend-plus-lighter`
  ::
::

## Accessibility

The control is a real `UButton`, so Enter and Space activate it and the focus ring is
the one Nuxt UI draws. The component adds no ARIA attributes: the sheen is an empty,
unlabelled `div`, so it contributes nothing to the accessibility tree.

The press scale is the one asymmetry. It is driven by `mousedown` and `mouseup` on
the wrapper, with no keyboard equivalent, so a keyboard user gets no press feedback
at all — the button changes state with no visible acknowledgement. Reduced motion is
not consulted: the 0.6s sweep and the 0.15s scale transition run on their fixed
timings for every visitor.

## Performance

- The sheen is one absolutely positioned `div` inside a `pointer-events-none`,
  `opacity-0` overlay. Outside hover it costs a composited layer and nothing else —
  no pointer events are ever routed to it.
- Hover and press are two refs. Those flips and nothing else re-render the wrapper.
- The sweep animates `left` from `-100%` to `100%`, not a transform. `left` is a
  layout property, so the sweep runs on the layout path every frame rather than on the
  compositor.
- `border-radius` is read once on mount via `getComputedStyle` on the button element.
  Change the button's rounding afterwards — a size change, a theme switch — and the
  sheen keeps the radius it measured.

::tip
A `class` you pass lands on the inner button, not on the wrapper: the wrapper is a
bare `inline-block` sized by its child, so `max-w-*` or `w-full` on `<MSmoothButton>`
sizes the button while the wrapper stays as wide as that button. Constrain the
component from a parent flex or grid container instead.
::

