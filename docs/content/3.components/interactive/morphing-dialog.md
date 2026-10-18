---
title: Shape-shift dialog
description: A modal dialog that morphs from its trigger using shared layout animations.
---

A morphing dialog built with a shared-layout animation. When triggered, the dialog content morphs from the trigger element's position and size using `layoutId`, creating a smooth shape-shift transition instead of a plain fade-in.

## Usage

Use `MMorphingDialogTrigger` as the element that triggers the dialog, and provide the dialog content via the `content` slot. By default, `layoutId` is enabled, causing the dialog to morph from the trigger. You can control the dialog state with `v-model:open`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-dialog-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <div class="flex flex-col items-center gap-6">
      <MMorphingDialog layout-id>
        <MMorphingDialogTrigger class="rounded-lg bg-primary px-4 py-2 text-inverted">
          Open Dialog
        </MMorphingDialogTrigger>
        <template #content="{ close }">
          <div class="flex flex-col gap-4 p-6">
            <h3 class="text-lg font-semibold">
              Shape-shift dialog
            </h3>
            <p class="text-sm text-muted">
              This dialog morphs from its trigger with a smooth layout animation.
            </p>
            <div class="flex justify-end">
              <UButton
                label="Close"
                @click="close"
              />
            </div>
          </div>
        </template>
      </MMorphingDialog>
    </div>
  </div>
</template>
```
::


## Examples

### Product card

Grow a card into a detail view while the artwork and price stay anchored to the
morphing element. This is the shape used most often for a catalogue or storefront.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-dialog-product" />
  :::
#code
```vue
<script setup lang="ts">
const product = {
  name: 'Bauhaus Table Lamp',
  price: '$349',
  description:
    'A sculptural brass table lamp with an adjustable shade, produced in small batches and inspired by 1920s Bauhaus design.',
  image:
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
}
</script>

<template>
  <MMorphingDialog layout-id>
    <MMorphingDialogTrigger
      class="w-64 overflow-hidden rounded-2xl border border-default bg-elevated text-left"
    >
      <img
        :src="product.image"
        :alt="product.name"
        class="h-40 w-full object-cover"
      >
      <div class="flex items-center justify-between gap-2 p-4">
        <span class="text-sm font-medium text-highlighted">{{ product.name }}</span>
        <span class="text-sm text-muted">{{ product.price }}</span>
      </div>
    </MMorphingDialogTrigger>

    <template #content="{ close }">
      <div class="w-full">
        <img
          :src="product.image"
          :alt="product.name"
          class="h-56 w-full object-cover"
        >
        <div class="flex flex-col gap-4 p-6">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ product.name }}
            </h3>
            <span class="text-lg font-medium text-muted">{{ product.price }}</span>
          </div>
          <p class="text-sm text-muted">
            {{ product.description }}
          </p>
          <div class="flex justify-end gap-2">
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
            <UButton
              label="Add to cart"
              @click="close"
            />
          </div>
        </div>
      </div>
    </template>
  </MMorphingDialog>
</template>
```
::

### Reading panel

A compact row can expand into a scrollable panel. The dialog content is a plain
container, so an `overflow-y-auto` child scrolls on its own without moving the
backdrop.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-dialog-book" />
  :::
#code
```vue
<script setup lang="ts">
const books = [
  {
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    excerpt:
      'I was thirty-seven then, strapped in my seat as the huge 747 plunged through dense cloud cover on approach to Hamburg airport. Cold November rains drenched the earth and lent everything the gloomy air of a Flemish landscape: the ground crew in rain gear, a flag atop a squat airport building, a BMW billboard. So Germany again. Once the plane was on the ground, soft music began to flow from the ceiling speakers.',
  },
  {
    title: 'The Wind-Up Bird Chronicle',
    author: 'Haruki Murakami',
    excerpt:
      'When the phone rang I was in the kitchen, boiling a potful of spaghetti and whistling along with an FM broadcast of the overture to Rossini\'s The Thieving Magpie, which has to be the perfect music for cooking pasta. I wanted to ignore the phone, not only because the spaghetti was nearly done, but because Claudio Abbado was bringing the London Symphony to its musical climax.',
  },
  {
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    excerpt:
      'Cash isn\'t the only thing you can have too much of. Money finds its way into your pocket and out again, but solitude is a different matter. It settles in. It has weight. The kind of weight that makes the air in a room feel thicker, until you are sure you can see the shape of it when you breathe out.',
  },
]
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-2">
    <MMorphingDialog
      v-for="book in books"
      :key="book.title"
      layout-id
    >
      <MMorphingDialogTrigger class="flex w-full items-center gap-3 rounded-xl border border-default bg-elevated p-3 text-left">
        <span class="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
          {{ book.title.charAt(0) }}
        </span>
        <span class="min-w-0">
          <span class="block truncate text-sm font-medium">{{ book.title }}</span>
          <span class="block truncate text-xs text-muted">{{ book.author }}</span>
        </span>
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <div class="flex max-h-[70vh] flex-col">
          <div class="border-b border-default p-6">
            <h3 class="text-lg font-semibold text-highlighted">
              {{ book.title }}
            </h3>
            <p class="text-sm text-muted">
              {{ book.author }}
            </p>
          </div>
          <div class="overflow-y-auto p-6 text-sm leading-relaxed text-muted">
            <p>{{ book.excerpt }}</p>
          </div>
          <div class="flex justify-end border-t border-default p-4">
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </div>
        </div>
      </template>
    </MMorphingDialog>
  </div>
</template>
```
::

### Image lightbox

For a gallery, each thumbnail morphs into a larger view of the same image. Because
every dialog gets its own shared `layoutId`, a grid of them stays independent.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="morphing-dialog-image" />
  :::
#code
```vue
<script setup lang="ts">
const photos = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    alt: 'Mountain ridge at dawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    alt: 'Snow-covered peaks',
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
    alt: 'Forest canopy',
  },
]
</script>

<template>
  <div class="grid grid-cols-3 gap-3">
    <MMorphingDialog
      v-for="photo in photos"
      :key="photo.src"
      layout-id
    >
      <MMorphingDialogTrigger class="overflow-hidden rounded-xl border border-default">
        <img
          :src="photo.src"
          :alt="photo.alt"
          class="h-24 w-full object-cover"
        >
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <figure class="w-full">
          <img
            :src="photo.src"
            :alt="photo.alt"
            class="max-h-[65vh] w-full object-cover"
          >
          <figcaption class="flex items-center justify-between gap-4 p-4">
            <span class="text-sm text-muted">{{ photo.alt }}</span>
            <UButton
              label="Close"
              color="neutral"
              variant="outline"
              @click="close"
            />
          </figcaption>
        </figure>
      </template>
    </MMorphingDialog>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="morphing-dialog-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center">
    <MMorphingDialog layout-id>
      <MMorphingDialogTrigger class="w-64 overflow-hidden rounded-2xl border bg-elevated text-left">
        <div class="h-28 bg-gradient-to-br from-primary to-secondary" />
        <div class="flex items-center gap-3 p-4">
          <span class="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-inverted">
            AM
          </span>
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold">
              Ada Lovelace
            </p>
            <p class="truncate text-xs text-muted">
              Mathematician
            </p>
          </div>
        </div>
      </MMorphingDialogTrigger>

      <template #content="{ close }">
        <div class="w-full">
          <div class="h-40 bg-gradient-to-br from-primary to-secondary" />
          <div class="flex flex-col gap-4 p-6">
            <div class="flex items-center gap-3">
              <div class="flex size-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-inverted">
                AL
              </div>
              <div>
                <p class="text-base font-semibold">
                  Ada Lovelace
                </p>
                <p class="text-sm text-muted">
                  Mathematician · London
                </p>
              </div>
            </div>
            <p class="text-sm text-muted">
              The dialog shares the trigger's layout id, so it grows out of the card
              instead of fading in.
            </p>
            <div class="flex justify-end gap-2">
              <UButton
                label="Close"
                color="neutral"
                variant="outline"
                @click="close"
              />
            </div>
          </div>
        </div>
      </template>
    </MMorphingDialog>
  </div>
</template>
```
::

## Props

::component-props
  ::component-prop{name="open" type="boolean" default="undefined"}
  Controlled open state. Use with `v-model:open`.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="false"}
  Initial open state when uncontrolled.
  ::
  ::component-prop{name="layoutId" type="boolean" default="true"}
  Whether to enable layout morphing from trigger. When true, the dialog content uses `layoutId` based on the component's unique ID.
  ::
  ::component-prop{name="title" type="string" default="undefined"}
  Optional title rendered in a header above the content.
  ::
  ::component-prop{name="description" type="string" default="undefined"}
  Optional description rendered under the title in the header.
  ::
  ::component-prop{name="overlay" type="boolean" default="true"}
  Whether to show the dimmed, blurred backdrop behind the dialog.
  ::
  ::component-prop{name="scrollable" type="boolean" default="false"}
  Allows the dialog wrapper to scroll when the content is taller than the viewport.
  ::
  ::component-prop{name="fullscreen" type="boolean" default="false"}
  Stretches the dialog content to fill the entire viewport.
  ::
  ::component-prop{name="portal" type="string | boolean" default="true"}
  Teleport target. `true` renders into `body`, a string targets a selector, and `false` renders the dialog inline.
  ::
  ::component-prop{name="dismissible" type="boolean" default="true"}
  Whether the dialog can be dismissed by clicking the backdrop or pressing Escape.
  ::
  ::component-prop{name="closeIcon" type="string" default="undefined"}
  When set, renders a close button in the corner of the dialog using this icon name.
  ::
  ::component-prop{name="modal" type="boolean" default="true"}
  When true, page scroll is locked while the dialog is open and focus moves into the dialog.
  ::
  ::component-prop{name="class" type="string" default="undefined"}
  Additional classes applied to the dialog content.
  ::
  ::component-prop{name="ui" type="Record<string, any>" default="undefined"}
  Slot-based class overrides for the `wrapper` and `content` elements.
  ::
  ::component-prop{name="scale" type="number" default="0.95"}
  Scale value for the content when `layoutId` is disabled.
  ::
  ::component-prop{name="variants" type="Variants" default="() => ({})"}
  Custom motion variants merged over the content's enter/exit animations.
  ::
  ::component-prop{name="transition" type="Transition" default="() => ({ type: 'spring', bounce: 0.15, duration: 0.4 })"}
  Transition used for the content layout and enter/exit animations.
  ::
::

## Events

::component-events
  ::component-event{name="update:open" type="(open: boolean) => void"}
  Emitted when open state changes.
  ::
  ::component-event{name="enter" type="() => void"}
  Emitted when dialog enters.
  ::
  ::component-event{name="after:enter" type="() => void"}
  Emitted after dialog enters.
  ::
  ::component-event{name="leave" type="() => void"}
  Emitted when dialog leaves.
  ::
  ::component-event{name="after:leave" type="() => void"}
  Emitted after dialog leaves.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default" type="(props: { isOpen: boolean }) => void"}
  The trigger content. Wrap `MMorphingDialogTrigger` here.
  ::
  ::component-slot-row{name="content" type="(props: { close: () => void, isOpen: boolean }) => void"}
  The dialog body. Use the exposed `close` function to close the dialog.
  ::
::

## UI

Two structural elements can be restyled per instance through the `ui` prop, merged
over the built-in classes:

::component-props
  ::component-prop{name="ui" type="object"}
  Per-element class overrides.
  ::
::

::component-slots
  ::component-slot-row{name="wrapper"}
  The fixed, full-viewport overlay container that holds the backdrop and the content.
  ::
  ::component-slot-row{name="content"}
  The morphing content element — the one carrying the shared `layoutId`.
  ::
::

## Accessibility

Renders a `role="dialog"` element with `aria-modal="true"`, moves focus into the dialog on open, and restores focus to the trigger on close. Escape closes the dialog, and page scroll is locked while it is visible. The trigger exposes `aria-haspopup="dialog"` and `aria-expanded` to reflect the state.

## Performance

- Uses `layoutId` to share layout between the trigger and content so the morph is projected on the GPU with `transform`, avoiding DOM reflows.
- `AnimatePresence` drives enter/exit; layout, opacity, and scale run through `transform` only.
- When `layoutId` is enabled, scale is omitted in favor of the layout projection; when disabled, content scales from `scale` (default `0.95`).
- Unique IDs come from `useId()` so multiple dialogs on a page keep independent layout IDs.


::tip
The morphing effect works best when the trigger and dialog content have similar visual structure (same border radius, similar padding). This creates a more seamless transition.
::
