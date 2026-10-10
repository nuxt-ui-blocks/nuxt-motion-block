---
title: Coverflow Carousel
description: A self-contained coverflow that fans images in 3D, driven by buttons, drag, keyboard or autoplay.
navigation:
  icon: i-lucide-layers-3
---

# Coverflow Carousel

A coverflow that renders itself. You hand it an `items` array and it draws the
fan ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â images or text panels, positioned by distance from the active slide, rotated
on Y, scaled down and pushed back in Z. No Embla, no slot to fill.

Navigation is four ways at once: Prev/Next buttons, horizontal drag, arrow keys,
and optional autoplay. Any of them ends up calling the same `goTo`, so the index
is the only state and the four paths can never disagree.

Two behaviours are worth knowing before you wire it up. Focus pauses the motion:
tabbing into the region stops autoplay and moving focus out restarts it, so
keyboard users are not chasing a moving target. And the whole thing is
self-contained ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â including the buttons, the `aria-roledescription` and the
visually hidden "Slide N of M" ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so you cannot restyle the controls without
forgoing that.

## Usage

Pass `items`, each with an `id` and either an `image` (plus optional `alt`) or
`content`. Without an `image` the slide becomes a text panel, which is handy for
a quote reel. Index it yourself if you need to drive it from elsewhere.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="coverflow-carousel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <MCoverflowCarousel
      :items="items"
      :autoplay="autoplay"
      :autoplay-delay="3000"
      class="rounded-2xl bg-gradient-to-b from-violet-50 to-white p-4 dark:from-violet-950/40 dark:to-transparent"
    />

    <div class="flex items-center justify-center gap-3">
      <USwitch
        v-model="autoplay"
        label="Autoplay"
      />
      <span class="text-xs text-muted">
        Drags past 80px or flicks past 500px/s also move it
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const autoplay = ref(true)

const items = [
  { id: 'reykjavik', alt: 'Reykjavik skyline', image: 'https://picsum.photos/seed/cover-1/560/440' },
  { id: 'kyoto', alt: 'Kyoto alley', image: 'https://picsum.photos/seed/cover-2/560/440' },
  { id: 'lofoten', alt: 'Lofoten islands', image: 'https://picsum.photos/seed/cover-3/560/440' },
  { id: 'oaxaca', alt: 'Oaxaca street', image: 'https://picsum.photos/seed/cover-4/560/440' },
  { id: 'queensland', alt: 'Queensland coast', image: 'https://picsum.photos/seed/cover-5/560/440' },
  { id: 'cappadocia', alt: 'Cappadocia balloons', image: 'https://picsum.photos/seed/cover-6/560/440' },
  { id: 'faroe', alt: 'Faroe cliffs', image: 'https://picsum.photos/seed/cover-7/560/440' },
]
</script>
```
::

## Geometry

Every slide's position comes from one number: its signed distance from the
active index. That distance feeds rotation, scale, Z and stacking order
together, so the fan is always self-consistent ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â there is no separate "arranged"
state to fall out of sync.

| Prop | What it changes |
| --- | --- |
| `spacing` | Horizontal pixels per step. The fan's overall width, and the only prop that decides how far neighbours sit from centre. |
| `rotation` | Degrees of Y rotation per step. The size of the fan's curve. |
| `depth` | Z pixels per step. What makes the rotation read as depth instead of flat. |
| `scaleStep` | Scale lost per step, floored at `0.4` so the far slides never vanish. |
| `loop` | Wrap the index around instead of clamping. Also enables both buttons at both ends rather than disabling them. |
| `inverted` | Flip the sign of the rotation and the direction of travel. |

Slides more than three steps out are hidden with `v-show`, so a seven-item array
costs seven `motion.div` nodes but only paints the middle seven.

## Props

::field-group
  ::field{name="items" type="CoverflowItem[]" default="[]"}
  The slides. Each needs an `id` (used as the render key) and either `image` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
  with optional `alt`, defaulting to empty ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â or `content`, which is rendered as
  plain centred text when there is no image.
  ::
  ::field{name="autoplay" type="boolean" default="false"}
  Advance on a timer. Requires more than one item, and never starts under
  `prefers-reduced-motion` or while the region is hidden.
  ::
  ::field{name="autoplayDelay" type="number" default="4000"}
  Milliseconds between autoplay steps. The timer is torn down and rebuilt
  whenever this, `autoplay`, `loop`, reduced motion or the tab visibility change.
  ::
  ::field{name="loop" type="boolean" default="false"}
  Wrap around the ends. With it off the index is clamped and the Prev/Next
  buttons disable themselves at the first and last slide.
  ::
  ::field{name="index" type="number"}
  Drive the carousel from outside. Passing it switches the component from
  internal state to controlled: it stops updating itself and only reports what
  you send back through `update:index`.
  ::
  ::field{name="spacing" type="number" default="220"}
  Horizontal pixels between adjacent slides.
  ::
  ::field{name="rotation" type="number" default="45"}
  Degrees of Y rotation per step of distance.
  ::
  ::field{name="depth" type="number" default="180"}
  Z translation in pixels per step of distance.
  ::
  ::field{name="scaleStep" type="number" default="0.15"}
  Scale removed per step, never below `0.4`.
  ::
  ::field{name="inverted" type="boolean" default="false"}
  Reverse the rotation sign, so the fan curves away from the default direction.
  The Prev button still means previous.
  ::
  ::field{name="class" type="string"}
  Merged onto the root region.
  ::
::

## Events

::field-group
  ::field{name="update:index" type="(index: number) => void"}
  Fired with the resolved target index on every navigation ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â button, drag, key
  or autoplay. Under `loop` the value is already wrapped into range, so it is
  always a valid index into `items`. With `loop` off it is clamped.
  ::
::

## Accessibility

The root is a focusable `role="region"` labelled "Coverflow carousel" and
carrying `aria-roledescription="carousel"`. Arrow keys move one step and
`preventDefault` so the page does not scroll underneath.

Non-active slides are `aria-hidden="true"`, which keeps the hidden ones out of
reading order while they are still visibly fanned. A visually hidden
`aria-live="polite"` region announces "Slide N of M" on every change ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â the
position is therefore readable even though the fan itself is a visual-only
arrangement.

Motion is handled in two places. Under `prefers-reduced-motion` the perspective
is dropped, dragging is disabled entirely, and each slide snaps to its position
with a zero-duration transition. Independently of that, focus pauses autoplay ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â
`mouseenter` and `focus` set the pause flag, `mouseleave` and `blur` clear it ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â so
nobody is chasing the animation, and a `visibilitychange` listener pauses it
while the tab is in the background.

The Prev/Next buttons are plain buttons with `aria-label`s and are disabled at
the ends when `loop` is off, so their state is exposed rather than just visually
greyed.

## Performance

- One spring per slide with a short duration (0.25s) and a small bounce (0.1);
  only `rotateY`, `scale`, `x` and `z` animate, all compositor properties.
- Slides past three steps out are `v-show`-hidden, so paint cost tracks the
  visible fan rather than the length of `items`.
- The autoplay timer is a single `setInterval`, cleared and re-created on every
  relevant change and definitely cleared on unmount, so it cannot leak across
  navigation.
- Drag is bounded with `drag-constraints` locked to `{ left: 0, right: 0 }` and a
  low `drag-elastic`, so a slide can never be pulled out of the fan.
- Every `goTo` route funnels through one clamping function, which is also what
  emits the index ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â one source of truth for the position.

::tip
Autoplay and `prefers-reduced-motion` interact the way you would want: the timer
never starts, but a keyboard user can still move through every slide with the
arrow keys, because `goTo` and the geometry are unaffected ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â only the fan and
the drag are gone.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.coverflowCarousel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative w-full select-none outline-none'` |
| `stage` | `'relative mx-auto flex h-[320px] items-center justify-center'` |
| `card` | `'absolute h-[220px] w-[280px] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl'` |
| `image` | `'h-full w-full object-cover'` |
| `content` | `'flex h-full w-full items-center justify-center p-4 text-sm'` |
| `controls` | `'mt-4 flex items-center justify-center gap-4'` |
| `button` | `'rounded-full border border-default bg-default px-4 py-1.5 text-sm text-default transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50'` |
| `status` | `'sr-only'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.coverflowCarousel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative w-full select-none outline-none` |
| `stage` | `relative mx-auto flex h-[320px] items-center justify-center` |
| `card` | `absolute h-[220px] w-[280px] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl` |
| `image` | `h-full w-full object-cover` |
| `content` | `flex h-full w-full items-center justify-center p-4 text-sm` |
| `controls` | `mt-4 flex items-center justify-center gap-4` |
| `button` | `rounded-full border border-default bg-default px-4 py-1.5 text-sm text-default transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50` |
| `status` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.coverflowCarousel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative w-full select-none outline-none` |
| `stage` | `relative mx-auto flex h-[320px] items-center justify-center` |
| `card` | `absolute h-[220px] w-[280px] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl` |
| `image` | `h-full w-full object-cover` |
| `content` | `flex h-full w-full items-center justify-center p-4 text-sm` |
| `controls` | `mt-4 flex items-center justify-center gap-4` |
| `button` | `rounded-full border border-default bg-default px-4 py-1.5 text-sm text-default transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50` |
| `status` | `sr-only` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.coverflowCarousel` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative w-full select-none outline-none` |
| `stage` | `relative mx-auto flex h-[320px] items-center justify-center` |
| `card` | `absolute h-[220px] w-[280px] overflow-hidden rounded-2xl border border-foreground/10 bg-background shadow-xl` |
| `image` | `h-full w-full object-cover` |
| `content` | `flex h-full w-full items-center justify-center p-4 text-sm` |
| `controls` | `mt-4 flex items-center justify-center gap-4` |
| `button` | `rounded-full border border-default bg-default px-4 py-1.5 text-sm text-default transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50` |
| `status` | `sr-only` |
