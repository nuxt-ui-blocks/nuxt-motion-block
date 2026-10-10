---
title: Glass Card
description: A layered glass surface whose specular highlight, light sweep and chromatic rim track the pointer.
navigation:
  icon: i-lucide-panels-top-left
---

# Glass Card

A glass surface built from four stacked layers: a blurred body, a refracting rim, a
pointer-tracked specular highlight with a vertical light sweep, and a chromatic rim
gradient blended additively over the top. Pointer movement springs all of them toward
the cursor; leaving returns them to rest.

Because `backdrop-filter` only shows what is behind the element, the effect is
invisible on a flat page. Put something with colour and contrast behind it ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a
gradient, an image, or blurred blobs ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and the panel starts reading as glass.

## Usage

Wrap any content in `MGlassCard` and give it a background to refract. `class` merges
onto the root, so `rounded-*` on your side lines up with the rim, which paints
`rounded-[inherit]` at the radius the component sets.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glass-card-basic" />
  :::
#code
```vue
<template>
  <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-rose-500 via-violet-500 to-sky-500 p-6">
    <div class="absolute -left-6 top-4 size-24 rounded-full bg-amber-300/80 blur-2xl" />
    <div class="absolute -right-4 bottom-2 size-28 rounded-full bg-teal-300/80 blur-2xl" />

    <MGlassCard class="rounded-3xl">
      <div class="space-y-4 text-white">
        <p class="text-xs font-medium uppercase tracking-widest text-white/70">
          Focus session
        </p>
        <h3 class="text-2xl font-semibold leading-tight">
          Deep work, uninterrupted
        </h3>
        <p class="text-sm text-white/80">
          Move the pointer across the panel ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the highlight, the vertical sweep and
          the chromatic rim all follow it, then settle back on leave.
        </p>
        <UButton
          label="Start session"
          icon="i-lucide-play"
        />
      </div>
    </MGlassCard>
  </div>
</template>
```
::

## Tuning the surface

Each visual layer is a prop, so the surface can be tuned without leaving the
component. The two that move are driven by the pointer; the rest are static.

| Prop | What it changes |
| --- | --- |
| `blur` | Body blur, plus saturate and a small brightness lift. The rim's own blur is derived at 12% of this, never less than `1px`. |
| `rimWidth` | Thickness of the refracting ring. Also sets the content padding (`max(20, rimWidth + 10)`) and the body's inner radius. |
| `tint` | The body's background colour, painted over the blur. `oklch(1 0 0 / 0.1)` by default ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â mostly white at low alpha. |
| `refraction` | Displacement scale of the rim's turbulence. `0` disables the bend entirely, leaving a blurred rim. |
| `specular` | Whether the highlight and the light sweep render at all. Turning it off leaves a static, still-glass panel. |
| `border` | The inset inner ring that reads as the pane's edge highlight. |
| `shadow` | The drop shadow beneath the card. |
| `radius` | Corner radius of the root, in pixels. |
| `interactive` | The whole pointer-tracking layer. |

## Props

::field-group
  ::field{name="blur" type="number" default="11"}
  Backdrop blur in pixels applied to the body, together with a `saturate(160%)` and a
  `brightness(1.02)` lift. The rim's blur is derived from it at 12%, floored at `1px`,
  so the two layers stay in proportion at any value.
  ::
  ::field{name="border" type="boolean" default="true"}
  Renders the inset inner ring ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the two light hairlines plus the soft outer edge ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
  that reads as the pane's physical thickness. Turn it off for a borderless sheet.
  ::
  ::field{name="interactive" type="boolean" default="true"}
  Whether the pointer is tracked at all. When false the rAF loop and the
  `pointermove`/`pointerleave` listeners are never attached and the panel renders
  statically, still glass, no highlight.
  ::
  ::field{name="radius" type="number" default="26"}
  Corner radius in pixels. The body's own radius is `max(radius - rimWidth, 6)`, so the
  rim always sits on a tighter curve than the outer edge.
  ::
  ::field{name="refraction" type="number" default="24"}
  Scale of the `feDisplacementMap` that bends the rim's backdrop. The effect is also
  gated on a runtime capability probe, so this is a ceiling rather than a guarantee ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
  see the tip.
  ::
  ::field{name="rimWidth" type="number" default="12"}
  Thickness in pixels of the refracting ring, applied as masked padding. This is the
  only prop that changes layout: it also sets the content padding to
  `max(20, rimWidth + 10)` so your slot content can never sit under the rim.
  ::
  ::field{name="shadow" type="boolean" default="true"}
  Applies the two-layer drop shadow beneath the card. When false the root gets no
  `box-shadow` at all, so nothing is left behind to tint the glass from below.
  ::
  ::field{name="specular" type="boolean" default="true"}
  Renders the radial specular highlight and the narrow vertical light sweep that track
  the pointer. When false those two layers are not created and only the rim and body
  remain.
  ::
  ::field{name="tint" type="string" default="'oklch(1 0 0 / 0.1)'"}
  Background colour of the body layer, painted over the backdrop blur. Any CSS colour
  works; low-alpha white is the default so the panel takes on whatever is behind it.
  ::
  ::field{name="class" type="string"}
  Merged onto the root, which is already `relative overflow-hidden` with its radius and
  shadow set inline. Set your own `rounded-*` to match.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The panel's content. Wrapped in a `relative` div that carries the computed content
  padding, so it always clears the rim.
  ::
::

## Accessibility

Every decorative layer ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the SVG filter host, the body, the rim, the chromatic
gradient, the specular highlight, the sweep, the bottom shade and the inner ring ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â is
`aria-hidden="true"`, and the SVG host is `focusable="false"`. The component adds
nothing to the accessibility tree; only your slot content does.

There is no role and no keyboard behaviour: the surface is a presentation wrapper, and
the hover lift is a pointer affordance. Two guards keep it out of the way when it
should not be there ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â tracking only runs under `(hover: hover) and (pointer: fine)`,
and `useReducedMotion` disables it entirely, removing both the pointer tracking and
the `whileHover` lift and collapsing the root transition to `duration: 0`.

Anything focusable inside the card keeps its own focus ring; nothing here clips or
restyles it.

## Performance

- The pointer loop writes `transform` directly onto three plain `div` layers from a
  single `requestAnimationFrame` callback. Motion's own DOM pipeline snapshots
  `MotionValue`s handed over through `style` once at mount, so the springs are read
  manually instead ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Vue does not re-render on any frame.
- `pointermove` and `pointerleave` are attached lazily to the resolved root element,
  only when `interactive` is true, and both are removed on unmount along with the rAF
  frame and the `matchMedia` listener.
- Three layers composite with `mix-blend-mode: plus-lighter`; only the two that move
  get `will-change: transform`.
- `rimWidth` is the one layout-affecting prop: it drives the content padding, so
  changing it live reflows the slot content. Everything else is paint or composite.
- The rim's refraction adds an SVG `feTurbulence` + `feDisplacementMap` filter whose id
  is namespaced per instance with `useId`. The component probes `CSS.supports` for it
  once on mount and skips the filter node entirely where it is unsupported.

::tip
The refraction is Chromium-only ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `backdrop-filter` cannot composite an SVG
displacement map anywhere else. Rather than dropping the whole declaration, the mount
probe swaps `url(#filterId) blur(npx) saturate(ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦)` for plain `blur(npx) saturate(ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â¦)`,
so Safari and Firefox keep a blurred, saturated rim and lose only the bend.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glassCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative overflow-hidden'` |
| `filter` | `'pointer-events-none absolute h-0 w-0'` |
| `body` | `'absolute'` |
| `rim` | `'absolute inset-0 rounded-[inherit]'` |
| `overlay` | `'pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]'` |
| `chromatic` | `'absolute inset-0 rounded-[inherit]'` |
| `specular` | `'absolute'` |
| `sweep` | `'absolute top-0'` |
| `shade` | `'absolute inset-0 rounded-[inherit]'` |
| `ring` | `'pointer-events-none absolute inset-0 rounded-[inherit]'` |
| `content` | `'relative'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.glassCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `filter` | `pointer-events-none absolute h-0 w-0` |
| `body` | `absolute` |
| `rim` | `absolute inset-0 rounded-[inherit]` |
| `overlay` | `pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]` |
| `chromatic` | `absolute inset-0 rounded-[inherit]` |
| `specular` | `absolute` |
| `sweep` | `absolute top-0` |
| `shade` | `absolute inset-0 rounded-[inherit]` |
| `ring` | `pointer-events-none absolute inset-0 rounded-[inherit]` |
| `content` | `relative` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.glassCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `filter` | `pointer-events-none absolute h-0 w-0` |
| `body` | `absolute` |
| `rim` | `absolute inset-0 rounded-[inherit]` |
| `overlay` | `pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]` |
| `chromatic` | `absolute inset-0 rounded-[inherit]` |
| `specular` | `absolute` |
| `sweep` | `absolute top-0` |
| `shade` | `absolute inset-0 rounded-[inherit]` |
| `ring` | `pointer-events-none absolute inset-0 rounded-[inherit]` |
| `content` | `relative` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glassCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `filter` | `pointer-events-none absolute h-0 w-0` |
| `body` | `absolute` |
| `rim` | `absolute inset-0 rounded-[inherit]` |
| `overlay` | `pointer-events-none absolute inset-0 isolate overflow-hidden rounded-[inherit]` |
| `chromatic` | `absolute inset-0 rounded-[inherit]` |
| `specular` | `absolute` |
| `sweep` | `absolute top-0` |
| `shade` | `absolute inset-0 rounded-[inherit]` |
| `ring` | `pointer-events-none absolute inset-0 rounded-[inherit]` |
| `content` | `relative` |
