---
title: Carousel
description: Nuxt UI's carousel with every slide pushed into a 3D coverflow fan.
navigation:
  icon: i-lucide-gallery-horizontal-end
---

# Carousel

`MCarousel` is Nuxt UI's `UCarousel` with the slide motion replaced. Scrolling,
snapping, controls and looping stay exactly as they were — you get the same
`items` array, the same `{ item, index }` slot and the same props. What
changes is the presentation: each slide is wrapped in a motion element that
pushes it sideways, rotates it on the Y axis and pulls it back in Z, so the
neighbours read as a fan instead of a strip.

Distance drives everything. The offset of a slide from the selected one sets
its rotation, its scale, its depth and its stacking order, so the geometry stays
consistent for any combination of props — change the rotation and the fan opens
or closes, change the depth and it flattens.

Beyond three slides away a slide is faded out and, with `loop`, an offset is
measured the short way round the ring so the last slide turns into the first
rather than flying back across the whole track.

## Usage

The default slot is scoped, so declare it with `v-slot="{ item, index }"` on
`<MCarousel>`. Everything the Nuxt UI carousel accepts — `items`, `loop`, `arrows`,
`dots`, `ui`, `orientation` — is forwarded through `$attrs`, so set `coverflow` to
`false` to get the plain back out.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="carousel-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'w-full' }"
      class="rounded-2xl"
      loop
      arrows
      dots
      @select="active = $event"
    >
      <div class="relative h-56 w-full overflow-hidden rounded-2xl">
        <img
          :src="item.image"
          :alt="item.title"
          class="h-full w-full object-cover"
        >
        <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12 text-white">
          <p class="text-xs uppercase tracking-widest text-white/70">
            {{ item.tag }}
          </p>
          <p class="text-lg font-semibold">
            {{ item.title }}
          </p>
        </div>
      </div>
    </MCarousel>

    <p class="text-center text-xs text-muted">
      Slide {{ active + 1 }} of {{ items.length }} · the three on each side fan away in 3D
    </p>
  </div>
</template>

<script setup lang="ts">
const active = ref(0)

const items = [
  { title: 'Iceland', tag: 'North', image: 'https://picsum.photos/seed/carousel-1/800/600' },
  { title: 'Kyoto', tag: 'East', image: 'https://picsum.photos/seed/carousel-2/800/600' },
  { title: 'Patagonia', tag: 'South', image: 'https://picsum.photos/seed/carousel-3/800/600' },
  { title: 'Dolomites', tag: 'Alps', image: 'https://picsum.photos/seed/carousel-4/800/600' },
  { title: 'Namibia', tag: 'Desert', image: 'https://picsum.photos/seed/carousel-5/800/600' },
]
</script>
```
::

## Props

::field-group
  ::field{name="coverflow" type="boolean" default="true"}
  Whether slides get the 3D fan treatment. Set it to `false` and the slot renders
  straight into the carousel, unchanged — the same component becomes a plain
  `UCarousel`.
  ::
  ::field{name="rotation" type="number" default="45"}
  Degrees of Y rotation at one slide of distance, signed by which side the slide
  is on. Slides two away therefore sit at roughly twice the angle.
  ::
  ::field{name="depth" type="number" default="180"}
  Pixels each slide is pushed back in Z per step of distance, which is what makes
  the fan read as depth rather than as flat rotation.
  ::
  ::field{name="scaleStep" type="number" default="0.15"}
  How much each step of distance shrinks a slide. Floored at `0.4`, so a dense
  fan never collapses into invisibility.
  ::
  ::field{name="perspective" type="number" default="1200"}
  Perspective in pixels applied to each slide. Larger is flatter and further away,
  smaller is wider angle and more dramatic.
  ::
  ::field{name="inverted" type="boolean" default="false"}
  Mirrors the rotation direction, so the fan curves the other way. Travel and
  snapping are unchanged — only which way the slides turn.
  ::
  ::field{name="items" type="unknown[]"}
  The slide data, forwarded to `UCarousel` through `$attrs`. Also read internally
  to compute offsets, which is why it must be an array.
  ::
  ::field{name="loop" type="boolean"}
  Forwarded to `UCarousel`, and also changes how offsets are measured: with `loop`
  on, an offset is taken the short way round the ring so the tail turns into the
  head instead of travelling the length of the track.
  ::
  ::field{name="class" type="string"}
  Merged onto `UCarousel`'s root through `$attrs`.
  ::
::

## Events

::field-group
  ::field{name="select" type="(index: number) => void"}
  Fired with the index of the newly selected slide, on Embla's `select` and again
  on `reInit` — so a resize that re-snaps reports the current position too.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Scoped with `{ item, index }` from `UCarousel`, the same shape you would get
  from the Nuxt UI carousel directly. When `coverflow` is on it is wrapped in a
  motion element that carries the 3D transform.
  ::
::

## Accessibility

The component adds nothing of its own: no roles, no ARIA attributes, no keyboard
handling. Everything comes from `UCarousel`, which renders its own region,
slides and controls — `MCarousel` only replaces the visual wrapper on each slide,
leaving Embla's keyboard and focus behaviour in place.

Under `prefers-reduced-motion` the 3D is dropped entirely. Each slide animates to
a flat state with a zero-duration transition: the selected one at full opacity,
every other at zero, so only the current slide is visible. Snapping and the
`select` event still work, so the carousel stays navigable — just without the fan.

## Performance

- Offsets are computed per slide per render from one `selectedIndex` ref — no
  layout reads, no measurement loop.
- The only animated properties are `rotateY`, `scale`, `z` and `opacity`, all
  compositor-side, and every slide carries `will-change: transform` and
  `transform-style: preserve-3d`.
- Depth beyond three slides is clamped for both the opacity cut-off and the
  stacking order, so the tail of a long track costs the same as its head.
- The Embla API is captured once with a post-flush watcher and its listeners are
  removed on unmount; re-attaching to the same instance is a no-op.
- `inheritAttrs` is off, so attributes are forwarded once to `UCarousel` rather
  than being applied to the root and to the inner carousel.

::tip
`scaleStep` and `depth` are measured per step of distance, so changing them on a
five-item carousel and then on a twenty-item one produces different geometry. If
you want the same look across different list lengths, divide them by the number
of slides you intend to show.
::