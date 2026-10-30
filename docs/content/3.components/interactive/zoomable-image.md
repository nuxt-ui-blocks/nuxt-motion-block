---
title: Zoomable Image
description: A thumbnail that opens into a full-size overlay when you click it.
---

Zoomable Image keeps the grid intact: the thumbnail sits in the page at whatever size the layout gives it, and clicking it opens the same file in a fixed overlay above everything. The overlay is a real dialog, so Escape closes it, the page behind it stops scrolling, and focus goes to the close button and comes back to the thumbnail afterwards.

The thumbnail also zooms slightly on hover, which is the only cue that it is clickable. Both the hover and the overlay honour reduced motion.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="zoomable-image-example" />
  :::
#code
```vue
<template>
  <MZoomableImage
    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
    alt="A snow-covered mountain ridge at sunrise"
    class="h-64 w-full max-w-md"
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
    <component-example name="zoomable-image-custom" />
  :::
#code
  <PlaygroundCode name="ZoomableImage" />
::

## Props

::component-props
  ::component-prop{name="src" type="string"}
  Image to show. The same source is used for the thumbnail and the overlay, so there is nothing to preload twice.
  ::

  ::component-prop{name="alt" type="string" default="''"}
  Alternative text. It also becomes the accessible name of the dialog.
  ::

  ::component-prop{name="disabled" type="boolean" default="false"}
  Keep the thumbnail but stop it from opening. Useful while a page is still loading.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the thumbnail button. Give it a height, or the image decides the size.
  ::
::

## Events

::component-events
  ::component-event{name="open"}
  Fired after the overlay has been asked to open.
  ::
  ::component-event{name="close"}
  Fired after the overlay has been dismissed, whether by click or by Escape.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.zoomableImage` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `group relative block cursor-zoom-in overflow-hidden rounded-xl`
  ::
  ::component-slot-row{name="image"}
  `size-full object-cover transition-transform duration-500 ease-out group-hover:scale-105`
  ::
  ::component-slot-row{name="overlay"}
  `fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm`
  ::
  ::component-slot-row{name="zoomed"}
  `max-h-full max-w-full cursor-zoom-out rounded-lg object-contain shadow-2xl`
  ::
  ::component-slot-row{name="close"}
  `absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white`
  ::
::

## Accessibility

The thumbnail is a `<button>`, not a click handler on an `<img>`, so it is reachable with Tab and fires on Enter and Space. The overlay is a `role="dialog"` with `aria-modal`, and its label is the image's alt text, which means the dialog announces what it contains. The close control is a labelled button and takes focus on open; closing returns focus to the thumbnail, so keyboard position is never lost. Escape closes the dialog from anywhere, and the page behind it is scroll-locked while it is open.
