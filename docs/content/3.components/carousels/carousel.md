---
title: Carousel
description: Nuxt UI's carousel with every slide pushed into a 3D coverflow fan.
---

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


## Examples

### Tuning the Fan

`rotation` sets the angle one slide away, `depth` sets how far each step is pushed back, and `scaleStep` sets how much each step shrinks. Raise all three for a wider, more theatrical fan.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="carousel-tuning" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-10 pb-2">
    <section>
      <p class="mb-6 text-xs font-medium uppercase tracking-wide text-muted">
        Subtle · rotation 25 · depth 80 · scaleStep 0.1
      </p>
      <MCarousel
        v-slot="{ item }"
        :items="slides"
        :ui="{ item: 'w-full' }"
        :rotation="25"
        :depth="80"
        :scale-step="0.1"
        loop
        arrows
      >
        <div
          class="flex h-40 w-full items-center justify-center rounded-2xl"
          :class="item.class"
        >
          <span class="text-3xl font-semibold text-white">{{ item.label }}</span>
        </div>
      </MCarousel>
    </section>

    <section>
      <p class="mb-6 text-xs font-medium uppercase tracking-wide text-muted">
        Dramatic · rotation 60 · depth 260 · scaleStep 0.18
      </p>
      <MCarousel
        v-slot="{ item }"
        :items="slides"
        :ui="{ item: 'w-full' }"
        :rotation="60"
        :depth="260"
        :scale-step="0.18"
        loop
        arrows
      >
        <div
          class="flex h-40 w-full items-center justify-center rounded-2xl"
          :class="item.class"
        >
          <span class="text-3xl font-semibold text-white">{{ item.label }}</span>
        </div>
      </MCarousel>
    </section>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { label: '01', class: 'bg-gradient-to-br from-indigo-500 to-violet-600' },
  { label: '02', class: 'bg-gradient-to-br from-sky-500 to-cyan-500' },
  { label: '03', class: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
  { label: '04', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: '05', class: 'bg-gradient-to-br from-rose-500 to-pink-600' },
]
</script>
```
::

### Inverted

Set `inverted` to mirror the rotation, so the fan curves the other way. Travel and snapping are unchanged — only which way the slides turn.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="carousel-inverted" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md pb-8">
    <MCarousel
      v-slot="{ item }"
      :items="slides"
      :ui="{ item: 'w-full' }"
      :inverted="true"
      :rotation="55"
      loop
      arrows
      dots
    >
      <div
        class="flex h-48 w-full items-center justify-center rounded-2xl"
        :class="item.class"
      >
        <span class="text-4xl font-semibold text-white">{{ item.label }}</span>
      </div>
    </MCarousel>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { label: '01', class: 'bg-gradient-to-br from-sky-500 to-indigo-600' },
  { label: '02', class: 'bg-gradient-to-br from-violet-500 to-fuchsia-600' },
  { label: '03', class: 'bg-gradient-to-br from-rose-500 to-red-600' },
  { label: '04', class: 'bg-gradient-to-br from-amber-500 to-orange-600' },
  { label: '05', class: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
]
</script>
```
::

### Plain

With `coverflow` set to `false` the slot renders straight into the carousel, so the same markup becomes a plain `UCarousel` with no 3D transform.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="carousel-plain" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md pb-8">
    <MCarousel
      v-slot="{ item }"
      :items="slides"
      :ui="{ item: 'w-full' }"
      :coverflow="false"
      loop
      arrows
      dots
    >
      <div
        class="flex h-48 w-full items-center justify-center rounded-2xl"
        :class="item.class"
      >
        <span class="text-4xl font-semibold text-white">{{ item.label }}</span>
      </div>
    </MCarousel>
  </div>
</template>

<script setup lang="ts">
const slides = [
  { label: '01', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '02', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '03', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '04', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
  { label: '05', class: 'bg-gradient-to-br from-slate-600 to-slate-800' },
]
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="carousel-custom" />
  :::
#code
  <PlaygroundCode name="Carousel" />
::

## Props

::component-props
  ::component-prop{name="coverflow" type="boolean" default="true"}
  Whether slides get the 3D fan treatment. Set it to `false` and the slot renders
  straight into the carousel, unchanged — the same component becomes a plain
  `UCarousel`.
  ::
  ::component-prop{name="rotation" type="number" default="45"}
  Degrees of Y rotation at one slide of distance, signed by which side the slide
  is on. Slides two away therefore sit at roughly twice the angle.
  ::
  ::component-prop{name="depth" type="number" default="180"}
  Pixels each slide is pushed back in Z per step of distance, which is what makes
  the fan read as depth rather than as flat rotation.
  ::
  ::component-prop{name="scaleStep" type="number" default="0.15"}
  How much each step of distance shrinks a slide. Floored at `0.4`, so a dense
  fan never collapses into invisibility.
  ::
  ::component-prop{name="perspective" type="number" default="1200"}
  Perspective in pixels applied to each slide. Larger is flatter and further away,
  smaller is wider angle and more dramatic.
  ::
  ::component-prop{name="inverted" type="boolean" default="false"}
  Mirrors the rotation direction, so the fan curves the other way. Travel and
  snapping are unchanged — only which way the slides turn.
  ::
  ::component-prop{name="items" type="unknown[]"}
  The slide data, forwarded to `UCarousel` through `$attrs`. Also read internally
  to compute offsets, which is why it must be an array.
  ::
  ::component-prop{name="loop" type="boolean"}
  Forwarded to `UCarousel`, and also changes how offsets are measured: with `loop`
  on, an offset is taken the short way round the ring so the tail turns into the
  head instead of travelling the length of the track.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto `UCarousel`'s root through `$attrs`.
  ::
::

## Events

::component-events
  ::component-event{name="select" type="(index: number) => void"}
  Fired with the index of the newly selected slide, on Embla's `select` and again
  on `reInit` — so a resize that re-snaps reports the current position too.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
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