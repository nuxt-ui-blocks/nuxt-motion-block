---
title: Image Metadata Preview
description: A photo preview whose metadata panel rises from the bottom, lifting the image clear as the panel opens.
---

A small preview for a photograph and the facts behind it. The image sits above a
row of controls; pressing the chevron reveals a panel with the filename, a
description and a metadata table, and the image lifts by exactly the panel's
height so the two never overlap.

The component anchors itself to the bottom centre of the nearest positioned
ancestor. Give it a stage with a fixed height and `overflow-hidden`, as the
examples below do, and the image always opens into a predictable frame.

## Usage

Pass the image, a filename and the metadata fields. The panel starts closed, and
the image only moves once the panel has been measured.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="image-metadata-preview-basic" />
  :::
#code
```vue
<template>
  <div class="relative mx-auto h-[600px] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-b from-elevated to-muted">
    <MImageMetadataPreview
      alt="Sunrise over the coast"
      description="Sunrise over the west coast"
      filename="coast-sunrise.jpg"
      image-src="https://picsum.photos/seed/imagemeta-basic/300/437"
      :metadata="metadata"
    />
  </div>
</template>

<script setup lang="ts">
const metadata = {
  by: 'Avery Cole',
  created: '12 Aug 2025',
  source: '/library/coast/coast-sunrise.jpg',
  updated: '04 Sep 2025',
}
</script>
```

::

The Share button is disabled until the component receives an `onShare` callback,
so a read-only gallery never offers an action that does nothing.

## Customize

The metadata values are plain strings, so dates can stay in whatever format the
rest of the app uses, and a long source path truncates instead of widening the
panel. An `onShare` handler turns the first button on; the example copies the
current URL.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="image-metadata-preview-custom" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <div class="relative mx-auto h-[600px] w-full max-w-sm overflow-hidden rounded-3xl bg-muted">
      <MImageMetadataPreview
        alt="A studio desk"
        description="Desk setup photographed for the launch post"
        filename="studio-desk-final-v3.png"
        image-src="https://picsum.photos/seed/imagemeta-custom/300/437"
        :metadata="metadata"
        :on-share="handleShare"
      />
    </div>

    <p
      aria-live="polite"
      class="h-5 text-sm text-muted"
    >
      {{ status }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const metadata = {
  by: 'Studio North',
  created: '02 Mar 2024',
  source: '/library/studio/2024/studio-desk-final-v3.png',
  updated: '18 Jan 2026',
}

const status = ref('')

async function handleShare() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    status.value = 'Link copied'
  }
  catch {
    status.value = 'Sharing unavailable'
  }
}
</script>
```
::

## Props

::component-props
  ::component-prop{name="imageSrc" type="string"}
  Image to preview. Rendered at a fixed 300 by 437 pixels so the frame does not
  reflow while the file loads.
  ::
  ::component-prop{name="metadata" type="ImageMetadata"}
  Fields listed in the panel: `created`, `updated`, `by` and `source`.
  ::
  ::component-prop{name="alt" type="string" default="'Image preview'"}
  Alt text for the image.
  ::
  ::component-prop{name="filename" type="string" default="'screenshot.png'"}
  Name shown at the top of the panel.
  ::
  ::component-prop{name="description" type="string" default="'No description'"}
  One-line description under the filename.
  ::
  ::component-prop{name="onShare" type="() => void"}
  Called when Share is pressed. While it is missing the button stays disabled.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the anchored root.
  ::
::

## Accessibility

- The icon-only buttons carry `aria-label` values: Share, Open metadata preview
  and Close metadata preview.
- The panel is a labelled group and the metadata is a real table with a
  visually hidden caption and row headers, so every value keeps its label when
  read out of context.
- Opening moves focus to the close button; closing returns focus to the chevron,
  which mounts again on the same tick.
- Escape closes the panel from anywhere inside it, and the close button is always
  reachable with Tab.
- Clicking anywhere in the panel also closes it as a shortcut; that is never the
  only way out.
- Share is a disabled button rather than a hidden one while no handler is
  supplied, so its absence reads as "not available" rather than a layout jump.
- Under `prefers-reduced-motion` the image lift and the panel fade are switched
  off, and the panel appears and disappears in place.

## Performance

- The image has explicit width and height, so the stage reserves its space before
  the file arrives and the panel opening never shifts the page.
- The panel unmounts when closed; nothing is kept hidden or blurred in the DOM.
- The panel height is measured with one `ResizeObserver` while it is open, and
  the image moves with a CSS transform, so opening does not trigger layout.
- All animation is CSS. There is no animation frame loop and no timer in the
  component.
