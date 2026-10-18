---
title: Glass Panel
description: A frosted card with an optional background image that drifts under the pointer.
---

A frosted panel: a blurred, translucent `UCard` sitting over a cover-sized background
image. When `parallax` is on, the image translates up to 10px in each direction based
on where the pointer is inside the panel, so the card reads as a window with something
behind it rather than a flat translucent rectangle.

The card itself is a plain Nuxt UI `UCard`, so `ui` reaches every part of it and the
`header` and `footer` slots are Nuxt UI's own.

## Usage

Set `backgroundImage` to anything you want seen through the frost. The image is
rendered at `scale-110` regardless of `parallax`, because the parallax translate would
otherwise expose an edge — leave that over-scan to the component rather than scaling
it yourself.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glass-panel-basic" />
  :::
#code
```vue
<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/alpine-lake/1200/800"
    class="w-full max-w-md rounded-3xl"
  >
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-mountain"
            class="size-6 text-primary"
          />
          <div>
            <p class="font-semibold text-highlighted">
              Lake Brienz
            </p>
            <p class="text-xs text-muted">
              Interlaken, Switzerland
            </p>
          </div>
        </div>
        <UBadge
          label="Featured"
          color="primary"
          variant="soft"
        />
      </div>
    </template>

    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-highlighted">
        Morning on the water
      </h3>
      <p class="text-sm leading-relaxed text-highlighted/90">
        Move the pointer across the panel — the photo drifts a few pixels behind the
        frost, so the card reads as a window onto something rather than a flat tile.
      </p>
      <div class="flex items-center gap-1">
        <UIcon
          v-for="n in 5"
          :key="n"
          name="i-lucide-star"
          class="size-4"
          :class="n <= 4 ? 'text-amber-400' : 'text-muted/40'"
        />
        <span class="ml-2 text-xs text-muted">4.8 · 312 reviews</span>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-between">
        <span class="text-xs text-muted">From $180 / night</span>
        <UButton
          label="View trip"
          icon="i-lucide-arrow-up-right"
          size="xs"
          variant="soft"
        />
      </div>
    </template>
  </MGlassPanel>
</template>
```
::


## Examples

### Frosted panel with no image

Drop `backgroundImage` and the panel frosts whatever sits behind it in the page. Here
the frost is blurring a gradient and two blurred blobs rather than a photo.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glass-panel-frost" />
  :::
#code
```vue
<template>
  <div class="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-orange-400 p-6">
    <div class="absolute -left-6 top-2 size-28 rounded-full bg-amber-300/80 blur-2xl" />
    <div class="absolute -right-4 bottom-0 size-32 rounded-full bg-sky-300/80 blur-2xl" />

    <MGlassPanel class="rounded-3xl">
      <div class="space-y-4 text-white">
        <div class="flex items-center gap-2">
          <UIcon
            name="i-lucide-hard-drive"
            class="size-5"
          />
          <p class="text-xs font-medium uppercase tracking-widest text-white/75">
            Storage
          </p>
        </div>

        <div>
          <p class="text-3xl font-semibold">
            82 GB
            <span class="text-base font-normal text-white/70">of 100 GB</span>
          </p>
          <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div class="h-full w-4/5 rounded-full bg-white" />
          </div>
        </div>

        <p class="text-sm text-white/85">
          No image here — just the page behind, blurred and tinted by the frost.
        </p>

        <UButton
          label="Manage plan"
          color="neutral"
          variant="solid"
        />
      </div>
    </MGlassPanel>
  </div>
</template>
```
::

### Profile card

Header, body and footer are `UCard` slots, so a full profile composition is just slot
markup over the frost.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glass-panel-profile" />
  :::
#code
```vue
<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/studio-wall/1200/800"
    class="w-full max-w-sm rounded-3xl"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <UAvatar
          src="https://picsum.photos/seed/maya-alvarez/200/200"
          size="lg"
          alt="Maya Alvarez"
        />
        <div>
          <p class="font-semibold text-highlighted">
            Maya Alvarez
          </p>
          <p class="text-xs text-muted">
            Product designer · Lisbon
          </p>
        </div>
      </div>
    </template>

    <div class="space-y-4">
      <p class="text-sm leading-relaxed text-highlighted/90">
        Designing calm, legible interfaces for data-heavy products — and the design
        systems teams actually keep using.
      </p>

      <div class="grid grid-cols-3 gap-2 text-center">
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            128
          </p>
          <p class="text-xs text-muted">
            Projects
          </p>
        </div>
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            9.4k
          </p>
          <p class="text-xs text-muted">
            Followers
          </p>
        </div>
        <div class="rounded-xl bg-default/40 py-2">
          <p class="text-lg font-semibold text-highlighted">
            312
          </p>
          <p class="text-xs text-muted">
            Following
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full gap-2">
        <UButton
          label="Follow"
          class="flex-1 justify-center"
        />
        <UButton
          label="Message"
          color="neutral"
          variant="soft"
          class="flex-1 justify-center"
        />
      </div>
    </template>
  </MGlassPanel>
</template>
```
::

### Custom surface

Reach for the `ui` prop when the default frost is not enough — here a darker tint keeps
the text legible over a busy photo.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glass-panel-tint" />
  :::
#code
```vue
<template>
  <MGlassPanel
    background-image="https://picsum.photos/seed/neon-alley/1200/800"
    :ui="{ card: 'backdrop-blur-2xl bg-black/45 border border-white/20' }"
    class="w-full max-w-md rounded-3xl"
  >
    <div class="space-y-3 text-white">
      <p class="text-xs font-medium uppercase tracking-widest text-white/70">
        Custom surface
      </p>
      <h3 class="text-xl font-semibold">
        Tint the frost
      </h3>
      <p class="text-sm leading-relaxed text-white/80">
        The <code>ui</code> prop retargets the inner card, so blur, tint and border can
        be tuned per instance — darker here, so the text stays legible over a busy photo.
      </p>
      <UButton
        label="Read the theming guide"
        color="neutral"
        variant="solid"
      />
    </div>
  </MGlassPanel>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glass-panel-custom" />
  :::
#code
  <PlaygroundCode name="GlassPanel" />
::

## Props

::component-props
  ::component-prop{name="backgroundImage" type="string"}
  Source for the image behind the frost. It is always `object-cover`, always scaled to
  `110%`, and always given `alt=""` — it is decoration behind a translucent surface,
  not content. Without it the panel is a frosted card on nothing, which is fine if the
  page behind it already has something to show.
  ::
  ::component-prop{name="parallax" type="boolean" default="true"}
  Whether the image follows the pointer. The offset is `(pointer - 0.5) * 20` on each
  axis, so it spans `-10px` to `10px` across the panel, eased over `200ms`. Setting
  false also skips the `getBoundingClientRect` call on every move and pins the image at
  `scale(1.1)`.
  ::
  ::component-prop{name="ui" type="CardProps['ui']" default="undefined"}
  Passed straight to the inner `UCard`, so you can retarget its `root`, `header`,
  `body`, `footer` and padding slots. The component's own `backdrop-blur-md`,
  translucency and border classes are set as a `class` on the card and are not part of
  this object.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the outer wrapper, which is `relative overflow-hidden` and holds both the
  image and the card. Set `rounded-*` here and the image will be clipped by it.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The card body. Falls through to Nuxt UI `UCard`'s default slot with the component's
  own padding and translucency applied.
  ::
  ::component-slot-row{name="header"}
  Rendered in `UCard`'s `header` slot, above the default slot. The slot is only
  forwarded when you actually provide one, so an empty card gets no header padding.
  ::
  ::component-slot-row{name="footer"}
  Rendered in `UCard`'s `footer` slot, below the default slot. Same forwarding rule as
  `header`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glassPanel` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative overflow-hidden`
  ::
  ::component-slot-row{name="card"}
  `relative z-10 backdrop-blur-md bg-default/10 dark:bg-default/30 border border-default/20 dark:border-default/10`
  ::
  ::component-slot-row{name="background"}
  `absolute inset-0 z-0 transition-transform duration-200 ease-out`
  ::
  ::component-slot-row{name="backgroundImage"}
  `w-full h-full object-cover scale-110`
  ::
::

## Accessibility

The component contributes no roles, no ARIA attributes and no keyboard behaviour — the
parallax is a pointer-only decoration. `mousemove` and `mouseleave` are bound on the
wrapper and the pointer state is never exposed, so a keyboard or screen-reader user
simply sees the un-translated image, which is the intended resting state.

The background image is rendered with `alt=""`, which is correct here: it carries no
information that is not already in your slot content.

There is no `prefers-reduced-motion` handling. The movement is a two-axis translate of
a single decorative layer capped at 20px and eased over 200ms, so it is unlikely to be
problematic — but if your page needs a hard guarantee, render with
`parallax: false`.

## Performance

- The parallax is one reactive `transform` string on a single `div`, transitioned by
  CSS over `200ms`. No animation library, no rAF loop, no per-frame Vue update.
- `mousemove` is only bound when the component has `parallax` on, and the handler
  returns before touching the DOM when it is off.
- The image is `object-cover` at `scale-110` inside `overflow-hidden`, so the over-scan
  is a transform rather than extra layout — nothing reflows as the pointer moves.
- Both the card and the image are painted every frame the transform changes, but the
  card's `backdrop-blur-md` sits above the image, which is the compositing that makes
  this effect expensive. One panel is nothing; a grid of them is not.

