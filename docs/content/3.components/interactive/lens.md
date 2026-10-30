---
title: Lens
description: A magnifying circle that follows the pointer across an image.
---

Lens keeps the image at its layout size and moves a circular window over it. Inside the circle the same file is drawn again at `zoom` times the size, offset so the pixel under the pointer sits dead centre — the effect is a real magnifier, not a blurred copy.

Because both layers point at the same `src`, there is one request and the two views can never drift out of sync. The lens is hidden with `opacity`, so moving off the image fades it out instead of popping.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="lens-example" />
  :::
#code
```vue
<template>
  <MLens
    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80"
    alt="A snow-covered mountain ridge at sunrise"
    :zoom="2.4"
    :size="180"
    class="h-64 w-full max-w-lg"
  />
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="lens-custom" />
  :::
#code
  <PlaygroundCode name="Lens" />
::

## Props

::component-props
  ::component-prop{name="src" type="string"}
  Image to magnify. The same file is used for the base image and for the lens, so nothing is fetched twice.
  ::

  ::component-prop{name="alt" type="string" default="''"}
  Alternative text for the image. The lens itself is decorative and takes no label.
  ::

  ::component-prop{name="zoom" type="number" default="2"}
  How much the lens enlarges. `1` shows the image at its own scale, `4` is a strong magnifier.
  ::

  ::component-prop{name="size" type="number" default="160"}
  Diameter of the lens, in pixels. It stays fixed while the frame around it resizes.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame. Give it a height, or the image decides the size.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.lens` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block cursor-zoom-in overflow-hidden rounded-xl`
  ::
  ::component-slot-row{name="image"}
  `block size-full object-cover`
  ::
  ::component-slot-row{name="lens"}
  `pointer-events-none absolute rounded-full border border-white/50 bg-no-repeat shadow-2xl transition-opacity duration-200`
  ::
::

## Accessibility

The image is a real `<img>` with its `alt`, and the lens is `aria-hidden`, so assistive technology sees one described image and no duplicate. Nothing is hidden behind the interaction: the full picture is already visible, the lens only enlarges a detail, which means the effect degrades to a plain image on a keyboard-only or touch visit.

The pointer is hidden while the lens is active, because a second cursor inside the circle is distracting; it comes back as soon as the pointer leaves the frame. The frame keeps its own `cursor-zoom-in` underneath, so the affordance is still there before you hover.
