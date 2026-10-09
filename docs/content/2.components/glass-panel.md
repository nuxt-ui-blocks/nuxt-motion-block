---
title: Glass Panel
description: A frosted card with an optional background image that drifts under the pointer.
navigation:
  icon: i-lucide-panel-bottom
---

# Glass Panel

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
  <div class="w-full max-w-md">
    <MGlassPanel
      background-image="https://picsum.photos/seed/ridgeline-pass/1200/800"
      class="rounded-2xl"
    >
      <template #header>
        <div class="flex items-center gap-3">
          <UIcon
            name="i-lucide-mountain-snow"
            class="size-6 text-primary"
          />
          <div>
            <p class="font-semibold text-highlighted">
              Ridgeline Pass
            </p>
            <p class="text-xs text-muted">
              Conditions updated 4 min ago
            </p>
          </div>
        </div>
      </template>

      <p class="text-sm leading-relaxed text-highlighted/90">
        18 cm of new snow above treeline. The north face stays firm until the sun
        hits it, so the north ridge is the better line before midday.
      </p>

      <template #footer>
        <div class="flex w-full items-center justify-between text-xs">
          <span class="text-muted">Avalanche risk: moderate</span>
          <UButton
            label="Open report"
            size="xs"
            variant="soft"
            icon="i-lucide-arrow-up-right"
          />
        </div>
      </template>
    </MGlassPanel>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="backgroundImage" type="string"}
  Source for the image behind the frost. It is always `object-cover`, always scaled to
  `110%`, and always given `alt=""` — it is decoration behind a translucent surface,
  not content. Without it the panel is a frosted card on nothing, which is fine if the
  page behind it already has something to show.
  ::
  ::field{name="parallax" type="boolean" default="true"}
  Whether the image follows the pointer. The offset is `(pointer - 0.5) * 20` on each
  axis, so it spans `-10px` to `10px` across the panel, eased over `200ms`. Setting
  false also skips the `getBoundingClientRect` call on every move and pins the image at
  `scale(1.1)`.
  ::
  ::field{name="ui" type="CardProps['ui']" default="undefined"}
  Passed straight to the inner `UCard`, so you can retarget its `root`, `header`,
  `body`, `footer` and padding slots. The component's own `backdrop-blur-md`,
  translucency and border classes are set as a `class` on the card and are not part of
  this object.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer wrapper, which is `relative overflow-hidden` and holds both the
  image and the card. Set `rounded-*` here and the image will be clipped by it.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The card body. Falls through to Nuxt UI `UCard`'s default slot with the component's
  own padding and translucency applied.
  ::
  ::field{name="header"}
  Rendered in `UCard`'s `header` slot, above the default slot. The slot is only
  forwarded when you actually provide one, so an empty card gets no header padding.
  ::
  ::field{name="footer"}
  Rendered in `UCard`'s `footer` slot, below the default slot. Same forwarding rule as
  `header`.
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