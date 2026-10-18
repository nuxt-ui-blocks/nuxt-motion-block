---
title: Emboss Surface
description: A material surface whose relief is built from stacked shadows or a lit SVG filter, with an optional pointer-tracked light angle.
navigation:
  icon: i-lucide-layers
---

# Emboss Surface

Turns any element into a lit material surface. Four variants — `emboss`,
`deboss`, `plaster` and `metal-stamp` — each describe a different relief recipe:
two shadow layers for a raised surface, the same pair inset for a pressed one, a
wider pair plus an SVG specular filter for plaster, and a hard zero-blur pair
with an SVG `drop-shadow` for a stamped plate.

A stack of `box-shadow`s can only darken, which is why `plaster` is different:
it blurs the element's own alpha channel into a height field, lights that field
with `feSpecularLighting`, and clips the result back to the original silhouette.
That is what actually produces a lit surface rather than a shaded one.

## Usage

Wrap content in the component and pick a `variant`. The rendered element gets its
background colour from `color`, so give it padding of your own. Add
`interactive` when you want the light to follow the pointer — it is gated to
hover-capable pointers and reduced motion automatically.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="emboss-surface-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="grid grid-cols-2 gap-4">
      <MEmbossSurface
        v-for="variant in variants"
        :key="variant"
        :variant="variant"
        class="rounded-2xl p-6"
      >
        <p class="text-sm font-medium capitalize">
          {{ variant }}
        </p>
      </MEmbossSurface>
    </div>

    <MEmbossSurface
      variant="plaster"
      interactive
      class="flex h-32 items-center justify-center rounded-2xl"
    >
      <p class="text-sm text-muted">
        Move the pointer across this surface
      </p>
    </MEmbossSurface>
  </div>
</template>

<script setup lang="ts">
const variants = ['emboss', 'deboss', 'plaster', 'metal-stamp'] as const
</script>
```
::

## Variants

| Variant | Relief | Blur | Built from |
| --- | --- | --- | --- |
| `emboss` *(default)* | Raised, highlight top-left / shade bottom-right | Soft (`softness` × 2.4) | Two `box-shadow` layers |
| `deboss` | Pressed — same geometry, `inset` and inverted | Soft | Two `inset box-shadow` layers |
| `plaster` | Pressed, wide and shallow | Widest (× 1.8) | Two inset layers + an SVG `feSpecularLighting` filter |
| `metal-stamp` | Raised, hard zero-blur edges | None (`0px`) | Two hard layers + two `drop-shadow` layers |

`plaster` is the only variant that mounts an SVG filter, and the only one whose
`filter` is an `url(#…)` rather than a `drop-shadow`. `metal-stamp` is the only
other variant that touches `filter`, and the only one with a zero-blur layer.

## Props

::field-group
  ::field{name="variant" type="'emboss' | 'deboss' | 'plaster' | 'metal-stamp'" default="'emboss'"}
  The material recipe. Everything else — inset vs. outset, blur scale, highlight
  and shade mix percentages, hard edges, specular filter — is read from this one
  value.
  ::
  ::field{name="color" type="string" default="'var(--ui-bg)'"}
  Base material colour, applied as the element's `backgroundColor`. The highlight
  and shadow tints are derived from it with `color-mix()` in oklab, so any CSS
  colour works. Note the default is `var(--ui-bg)`, **not** shadcn's
  `var(--background)` — that variable does not exist under Nuxt UI, and an
  undefined custom property inside `color-mix()` invalidates the whole colour,
  which silently drops the entire `box-shadow` to `none`. A surface with no
  relief and no error.
  ::
  ::field{name="depth" type="number" default="2"}
  Relief depth in pixels. Sets the shadow offsets and also scales the blur
  (`depth × softness × 2.4 × variant blurScale`, floored at `0.25`). It is also
  the maximum pointer travel in interactive mode.
  ::
  ::field{name="softness" type="number" default="0.5"}
  Shadow diffusion from `0` (hard) to `1` (soft). Multiplies the blur; has no
  effect on `metal-stamp`, whose hard layers are explicitly `0px`.
  ::
  ::field{name="lightAngle" type="number" default="135"}
  Direction the light comes from, in degrees. `0` is right, `90` is up, so the
  default `135` is up-left. Split into `--es-dx` / `--es-dy` custom properties
  and recomputed as trig whenever it changes.
  ::
  ::field{name="interactive" type="boolean" default="false"}
  Let the light angle follow the pointer. Requires `interactive`, reduced-motion
  to be off, **and** a `(hover: hover) and (pointer: fine)` device — the pointer
  handlers are only attached when all three hold, and are `undefined` otherwise.
  The angle resets to `lightAngle` on `pointerleave`.
  ::
  ::field{name="as" type="string" default="'div'"}
  Element or component rendered as the material surface. Use `as="button"` or
  `as="a"` to make the surface itself interactive; the surface `ref` follows
  whatever is rendered.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the surface after `text-default`. This is where padding, rounding
  and layout classes go — the component sets only colour, shadow, filter and
  text-shadow inline.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The surface's content. It sits above the background and below the
  `text-shadow`, so light text on a dark material stays legible.
  ::
::

## Accessibility

The component renders no ARIA roles or attributes of its own and adds nothing to
the accessibility tree — it is a `box-shadow`, a background colour and, for
`plaster`, an `aria-hidden="true"` SVG whose `<title>` is decorative. Its only
semantic contribution is `as`: setting `as="button"` gives you a real button,
and setting `as="div"` leaves whatever you put inside to carry the semantics.

Interactive light tracking is pointer-only. There is no keyboard equivalent and
no `focus` styling, so a keyboard user sees the surface at its resting angle —
which is a fine outcome, but it is not an interactive control and should not be
used as one.

The SVG filter's id comes from Vue's `useId` rather than a random string, so it
is stable across server and client render. This matters: the surface references
it from its own inline `filter`, and a hydration mismatch would leave the filter
dangling and the plaster variant unlit until the next paint.

Under `prefers-reduced-motion` — read via `useReducedMotion` — the
`box-shadow` transition is dropped entirely and pointer tracking is disabled, so
the surface renders statically. Note this only removes the transition on
`box-shadow`; the highlight/shade layers are still composed.

## Performance

- The whole style object is one `computed`. Nothing recomputes per pointer event
  except the two custom properties `--es-dx` and `--es-dy`, written directly to
  `element.style` — no Vue re-render per move.
- The pointer only sets a *direction*, never a distance: the offset is normalized
  by the cursor's distance from centre and scaled by `depth`, so the relief
  depth stays a property of the material rather than of the pointer's distance.
- The hover-capability check uses `matchMedia` with a `change` listener rather
  than a feature sniff, and the listener is removed in `onBeforeUnmount`.
- `plaster` is the only variant that costs an SVG filter pass; the other three
  are pure `box-shadow` and (for `metal-stamp`) `filter: drop-shadow`, all
  handled by the compositor.
- Shadow layers are emitted as CSS custom properties (`calc(var(--es-blur) *
  1px)`), so the light angle can change without rebuilding the shadow string —
  only the custom properties are updated.

::tip
`color` is not decoration — it is load-bearing. Both the highlight and the shade
are `color-mix(in oklab, <color>, white|black N%)`, so an unresolvable `color`
invalidates both and collapses the surface to no relief at all, with no error in
the console. If a surface looks flat, check that `color` resolves before you
touch `depth` or `softness`.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.embossSurface` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-default` |
| `filter` | `pointer-events-none absolute h-0 w-0` |
