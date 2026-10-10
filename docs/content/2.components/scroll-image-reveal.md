---
title: Scroll Image Reveal
description: An image unmasked by scroll progress through a wipe, curtain, circle, blinds or scale, with counter-parallax inside the frame.
navigation:
  icon: i-lucide-image-down
---

# Scroll Image Reveal

An image that reveals itself as you scroll, using a CSS mask on the frame rather
than a clip on the image. Five masks are available ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â `wipe`, `curtain`,
`circle`, `blinds` and `scale` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and all of them share one spring-smoothed
progress value, with a counter-parallax drift underneath so the image settles
into place rather than simply appearing. Ported from smoothui's
scroll-image-reveal.

Two implementation details shape how you use it. First, the mask lives on the
**frame**, not the image: the image is deliberately taller than its frame by
`2 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â parallax` pixels so the drift has somewhere to travel, and a clip measured
against that oversized box would never line up with the visible edges. Second,
the frame has no intrinsic height ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the image is absolutely positioned ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so you
must give the frame one.

## Usage

Set an explicit height on the frame (via `class`), pass `src` and `alt`, and
pick a `mask`. Reach for `once` when the reveal is a one-time entrance ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â without
it, scrolling back up re-hides the image, because the mask is a direct function
of progress rather than a latch.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-image-reveal-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg space-y-3">
    <MScrollImageReveal
      :src="src"
      :alt="alt"
      mask="circle"
      class="h-64"
    />
    <p class="text-muted text-sm">
      The frame is absolutely positioned inside, so it needs an explicit height.
    </p>
  </div>
</template>

<script setup lang="ts">
const src = 'https://picsum.photos/seed/motion-reveal/900/600'
const alt = 'A misty mountain ridge at sunrise'
</script>
```
::

## Masks

| Mask | Mechanism | `direction` applies |
| --- | --- | --- |
| `wipe` *(default)* | `clip-path: inset()` cutting from one edge | `left` / `right` |
| `curtain` | `clip-path: inset()` cutting from top or bottom | `up` / `down` |
| `circle` | `clip-path: circle()` expanding from the centre | ignored ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â always centred |
| `blinds` | `repeating-linear-gradient` mask, opaque band growing | `left` / `right` / `up` / `down` |
| `scale` | No mask ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the image scales down from `1.12` and fades in | ignored |

`direction` is only honoured by the masks listed above. `wipe` reads `right` as
"reveal from the right edge inward" and anything else as "from the left edge
inward"; `curtain` reads `down` and anything else as "from the bottom upward".
Passing `up` or `down` to `wipe` silently gets you the left-edge behaviour.

`blinds` is the odd one out: a clip path can only cut one continuous region, so
the slats come from a hard-edged repeating gradient whose opaque band widens with
progress. Band size is fixed at 40px and is not configurable.

## Props

::field-group
  ::field{name="src" type="string"}
  Required. Image URL, applied to the `<img>` directly ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â there is no loader or
  Nuxt Image integration, so supply an optimised source yourself if size matters.
  The image also carries `decoding="async"`.
  ::
  ::field{name="alt" type="string"}
  Required. Forwarded to the `<img>` as its `alt`. The component will not invent
  one, and there is no decorative mode ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â pass `alt=""` yourself if the image is
  purely decorative.
  ::
  ::field{name="mask" type="'wipe' | 'curtain' | 'circle' | 'blinds' | 'scale'" default="'wipe'"}
  Which reveal to use. See the table above for how each behaves and which honour
  `direction`.
  ::
  ::field{name="direction" type="'left' | 'right' | 'up' | 'down'" default="'left'"}
  Reveal direction. Only `left`/`right` apply to `wipe` and `blinds`; only
  `up`/`down` apply to `curtain`; `circle` and `scale` ignore it.
  ::
  ::field{name="offset" type="ScrollOffset" default="['start 0.9', 'end 0.6']"}
  Motion scroll-offset tuple for `useScroll`, measured against the frame. The
  default is deliberately narrower than Motion's own `['start start', 'end
  start']` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â running the full enter-to-exit range finishes the reveal just as
  the element leaves the viewport, so the payoff happens off-screen.
  ::
  ::field{name="parallax" type="number" default="60"}
  Counter-parallax travel in pixels. The image is rendered
  `calc(100% + ${parallax * 2}px)` tall and offset by `-parallax`, so it drifts
  within an overscanned box and never drags a strip of background into view.
  Pass `0` to disable the drift entirely (the absolute value is used, so a
  negative value behaves the same as its positive counterpart).
  ::
  ::field{name="once" type="boolean" default="false"}
  Latch the reveal at its furthest point. With `false` (the default) the mask is
  a pure function of scroll progress, so scrolling back up re-hides the image.
  With `true` the component tracks `maxReveal` and never retreats.
  ::
  ::field{name="rounded" type="string" default="'rounded-2xl'"}
  Tailwind `rounded-*` class applied to the frame. Because the mask is on the
  frame, this is what rounds the revealed image ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â pass `rounded-none` for square
  corners.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the frame after `relative overflow-hidden`. This is where you set
  the frame's height ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â without one the component collapses, because the image
  inside is absolutely positioned and contributes no height of its own.
  ::
::

## Accessibility

The component is a `<div>` frame wrapping a single `<img>` that carries the
`alt` you passed. It applies no ARIA attributes, roles or live regions of its own,
and it does not manage focus ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a scroll-driven reveal is purely visual, so
nothing about it needs announcing.

The image is in the accessibility tree from first paint, before the mask opens.
A screen-reader user is therefore never blocked from the content, and the reveal
carries no semantic meaning that would need announcing.

Under `prefers-reduced-motion` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â read via `useReducedMotion` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the mask is
dropped entirely (`inset(0% 0% 0% 0%)` / `none`), parallax becomes `0`, and the
`scale` mask settles at full scale and full opacity. The image is simply there,
fully visible and static.

## Performance

- One `useScroll` and one `useSpring` (`stiffness: 260`, `mass: 0.4`,
  `damping: 32`) for the whole component. Every mask, the parallax and the
  opacity all derive from that single smoothed value.
- The mask is a `useTransform` returning a CSS string, so the browser composites
  the reveal on `clip-path` / `mask-image` rather than the component writing a
  style on every scroll tick.
- The image's drift is a `y` transform inside an overscanned box, so parallax
  costs one transform instead of a `top` change and no layout.
- The image is deliberately oversized (`100% + 2 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â parallax`) so the drift never
  exposes the frame's background ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â no reflow when the scroll offset changes.
- `once` is implemented by tracking a `maxReveal` ref inside the transform, so
  latching costs one number rather than a separate animation or watcher.

::tip
Reveal progress is multiplied by `2.5` before it reaches the mask. The scroll
window is intentionally longer than the visible reveal, so the image finishes
unmasking while still comfortably on screen rather than as it slides away. If
your image feels like it reveals too late, widen `offset`'s first value (pull
`start 0.9` toward `start 1`) rather than reaching for a different mask.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollImageReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative overflow-hidden'` |
| `image` | `'absolute inset-x-0 w-full object-cover'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.scrollImageReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `image` | `absolute inset-x-0 w-full object-cover` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.scrollImageReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `image` | `absolute inset-x-0 w-full object-cover` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollImageReveal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative overflow-hidden` |
| `image` | `absolute inset-x-0 w-full object-cover` |
