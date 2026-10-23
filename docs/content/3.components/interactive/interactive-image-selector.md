---
title: Interactive Image Selector
description: A photo grid that switches into a selection mode with a floating share and delete bar.
---

A small gallery you can manage in place. Press **Select** and every tile becomes
a toggle: picked photos dim, a check lands in the corner, and a pill rises from
the bottom with a live count plus share and delete actions. Press **Reset** and
the grid wobbles back to the original images with nothing selected.

The component keeps its own copy of the gallery, so deleting a photo is a local
edit rather than a request. Reset restores the `images` you passed in, which
makes the whole thing feel reversible while you try a few combinations.

## Usage

Pass an array of `{ id, src }` objects. Each tile is a button whose `aria-label`
follows the selection state, and the whole grid is disabled until selection mode
is on.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="interactive-image-selector-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full items-center justify-center p-6">
    <MInteractiveImageSelector
      v-model:selected-images="selected"
      :images="images"
      selectable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<number[]>([])

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=400&fit=crop',
  },
]
</script>
```

::

`selectedImages` works with `v-model:selected-images`. Without it the component
owns the list and still emits every change, which is enough for a throwaway
gallery.

## Customize

Listen for `share` and `delete` to wire the bar into your own flow. Deleting is
local and irreversible until Reset, so the event is the moment to revoke a
backend record. Leaving selection mode clears the selection, and the bar animates
out instead of disappearing.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="interactive-image-selector-custom" />
  :::
#code
  <PlaygroundCode name="InteractiveImageSelector" />
::

The reset wobble runs for 200ms before the original gallery returns, so the grid
has time to react to the press. Under `prefers-reduced-motion` the wobble, tile
entrances and bar slide are skipped while the same state changes still happen.

## Props

::component-props
  ::component-prop{name="images" type="ImageData[]"}
  Gallery entries. Each one takes a numeric `id` and a `src` URL.
  ::
  ::component-prop{name="selectedImages" type="number[]"}
  Controlled selection. Leave it out to let the component keep the list itself.
  ::
  ::component-prop{name="selectable" type="boolean" default="false"}
  Start with selection mode already on.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root.
  ::
::

## Events

::component-props
  ::component-prop{name="update:selectedImages" type="(selected: number[]) => void"}
  Fired whenever the selection changes, including when selection mode closes.
  ::
  ::component-prop{name="change" type="(selected: number[]) => void"}
  The same list, for listeners that pair with other `change` events.
  ::
  ::component-prop{name="delete" type="(deleted: number[]) => void"}
  Fired after the chosen photos are removed from the gallery.
  ::
  ::component-prop{name="share" type="(selected: number[]) => void"}
  Fired when the share button is pressed with at least one photo selected.
  ::
::

## Accessibility

- Every tile is a real `<button>` with an `aria-label` that flips between
  "Select gallery item 4" and "Deselect gallery item 4". Selection is also
  exposed with `aria-pressed`, so it is not conveyed by the check icon alone.
- Tiles are disabled until selection mode is on, so the gallery is not a row of
  buttons that silently do nothing.
- The floating count is a polite live region; screen readers hear
  "2 selected" when the number changes.
- Share and delete are disabled at zero selected photos and say so through the
  native disabled state, not just colour.
- The Reset and Select toggles carry labels that describe the next action
  ("Reset selection", "Cancel selection") rather than only the current state.
- The check mark and the share and trash glyphs are decorative; every control
  has a text label and the icons are hidden from assistive technology.
- Under `prefers-reduced-motion` the wobble, tile entrance, removal and bar
  slide are turned off. The selection and deletion still happen immediately.

## Performance

- The gallery is a plain CSS grid with `loading="lazy"` images; there is no
  measuring or per-tile JavaScript.
- Selection is a membership check on a `number[]`, and each toggle emits once.
- Deleting uses Vue's `TransitionGroup`, so the remaining tiles animate into
  place without a layout library.
- All motion is CSS keyframes or transitions, and the reduced-motion branch
  removes them at the stylesheet level rather than re-rendering the tree.
- Reset is one timer cleared on unmount, so leaving the page mid-wobble cannot
  leave work behind.
