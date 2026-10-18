---
title: Infinite Slider
description: A marquee that duplicates its content once and scrolls it in a seamless loop.
---

A marquee in eleven lines. It renders your content twice, side by side, and runs
a CSS animation that translates the pair from `0` to `-50%` forever. Because the
pair is exactly twice the content's width, `-50%` lands precisely on where the
first copy started — and the second copy is already in place under it. The seam
never appears and the loop never resets visibly.

The duplication is unconditional. There is no clone-and-measure, no gap
compensation, no JS at all: the animation is a plain `@keyframes` on a linear
infinite timing function, scoped to the component. Which also means the loop
depends on the two copies being identical and evenly spaced, which they are as
long as your content does not itself vary per copy.

Because the content is `width: fit-content` in a flex row inside an
`overflow-hidden` box, the component is edge-to-edge by construction — put it in a
full-bleed section and the seam lands exactly at the viewport edges.

## Usage

Anything goes in the default slot; it is rendered twice. Spacing and alignment
come from the `className` prop, which lands on the flex row, not on the outer
clipping box.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="infinite-slider-basic" />
  :::
#code
```vue
<template>
  <div class="w-full overflow-hidden py-4">
    <MInfiniteSlider
      class-name="items-center gap-10"
      :duration="28"
    >
      <div
        v-for="logo in logos"
        :key="logo"
        class="flex shrink-0 items-center gap-2 text-dimmed"
      >
        <UIcon
          :name="logo"
          class="size-5"
        />
        <span class="text-sm font-semibold tracking-tight">
          {{ logo.replace('i-lucide-', '') }}
        </span>
      </div>
    </MInfiniteSlider>
  </div>
</template>

<script setup lang="ts">
const logos = [
  'i-lucide-rocket',
  'i-lucide-anchor',
  'i-lucide-orbit',
  'i-lucide-flame',
  'i-lucide-gem',
  'i-lucide-zap',
  'i-lucide-globe',
  'i-lucide-shield',
]
</script>
```
::

## Examples

### Slow marquee

Raise `duration` to slow the loop down. At `60` seconds the content crosses the box
once a minute, which suits large cards or imagery where a fast strip would be
distracting.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="infinite-slider-slow" />
  :::
#code
```vue
<template>
  <div class="rounded-lg bg-elevated p-4">
    <h3 class="mb-4 text-lg font-bold text-highlighted">
      Slow Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="60"
      class-name="gap-6"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="flex h-40 w-40 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 text-2xl font-bold text-white"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
```
::

### Card row

The row is gap-based, so any content works — cards, logos, testimonials. Adjust
the gap and vertical alignment through `className` to control how the copies sit
against each other.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="infinite-slider-example" />
  :::
#code
```vue
<template>
  <div class="rounded-lg bg-elevated p-6">
    <h3 class="mb-4 text-lg font-bold text-highlighted">
      Infinite Slider
    </h3>
    <MInfiniteSlider
      :duration="20"
      class-name="gap-4"
    >
      <div
        v-for="i in 10"
        :key="i"
        class="flex h-32 w-32 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 text-xl font-bold text-white"
      >
        {{ i }}
      </div>
    </MInfiniteSlider>
  </div>
</template>
```
::

## Customize

Adjust the `duration` and the row's `className` live in the playground below.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="infinite-slider-custom" />
  :::
#code
  <PlaygroundCode name="InfiniteSlider" />
::

## Props

::component-props
  ::component-prop{name="duration" type="number" default="40"}
  Seconds for one full lap. Written straight to `animationDuration`, so 40 means
  the content crosses the box once every forty seconds — not once per copy.
  ::
  ::component-prop{name="className" type="string"}
  Merged onto the scrolling flex row, which is the element carrying the
  animation. The outer clipping box is always `w-full overflow-hidden` and takes
  no classes, so put your spacing, alignment and vertical padding here.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the outer clipping box, alongside the theme's `w-full overflow-hidden`.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content. Rendered twice — the second copy is what makes the loop seamless,
  so anything with a random or time-varying value will visibly disagree with its
  twin at the wrap point.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.infiniteSlider` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `w-full overflow-hidden`
  ::
  ::component-slot-row{name="content"}
  `infinite-slider-content`
  ::
::

## Accessibility

There is no ARIA, no pause control, no keyboard behaviour and no
`prefers-reduced-motion` handling anywhere in the component. The marquee runs at
full speed for every user.

Because the content is duplicated, screen readers and tab order see everything
twice. That is the accessibility cost of the trick as implemented, and it is not
addressable from the props — if the content is focusable, wrap each item in a way
that hides the second copy, or replace the second `<slot />` with a static
placeholder in your own fork.

Motion-sensitive users get a moving strip with no opt-out. In practice this means
the component should not sit above the fold on a page where the marquee is the
dominant motion.

## Performance

- No JavaScript at all. One `computed` produces `animationDuration`; everything
  else is a scoped `@keyframes` animation on `transform: translateX`.
- The animation is compositor-driven — the browser runs it off the main thread
  and Vue never re-renders while it plays.
- Only `transform` is animated, never `left` or `margin`, so there is no layout
  on any frame.
- The content is rendered twice and never measured, so there is no resize
  observer, no reflow and no per-frame JS cost. Resizing the container is free:
  the percentage keyframe is relative to the row's own width.
- The outer box clips with `overflow-hidden`, so the sliding content never
  contributes to document scroll width or causes a horizontal scrollbar.

::tip
The gap between the last item of one copy and the first of the next is whatever
gap the flex row applies — the seam is not special. If your row uses `gap-10`,
the wrap looks seamless; if you space items with margins instead, the trailing
margin of the last item and the leading margin of the first double up at the
wrap. Use `gap`, not per-item margins.
::

## The half-width trick

The whole effect is one number. The row contains two copies of your content, so
its width is exactly `2 × content`. Translating by `-50%` therefore moves the row
by precisely one content width — the moment copy one leaves the left edge, copy
two is already exactly where copy one started.

That is why the animation has to be `infinite` and not `alternate`, and why
`duration` is seconds for the full pass rather than per-copy: it is one lap of the
doubled row, not two. It is also why nothing needs measuring — no
`ResizeObserver`, no `offsetWidth`, no recalculation on resize. If the content
changes width, the ratio holds.
