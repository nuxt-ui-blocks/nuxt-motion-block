---
title: Content Skeleton
description: A loading overlay that borrows the exact shape of the content it stands in for.
---

A skeleton that does not guess. Instead of drawing grey boxes by hand, wrap the
real component and the loader measures it: the children stay in the document,
invisible but laid out, and a single pulse layer covers their exact footprint.
When the data arrives the overlay disappears and the content is already in the
right place, so nothing shifts.

For places where there is no real markup to borrow, the component also works
without a slot and becomes a plain block you size with classes. The same
`loading` flag drives both modes, which keeps a page's loading state in one
place instead of scattering placeholders through the template.

## Usage

The common case is a card whose data is still in flight. Toggle `loading` and
the outline of the card remains stable while the pulse runs over it.

::code-preview
---
label: Preview
---

  :::div{class="flex justify-center w-full"}
    <component-example name="content-skeleton-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col gap-4 py-6">
    <MContentSkeleton :loading="loading">
      <div class="rounded-xl border border-default bg-elevated p-5">
        <h3 class="text-base font-semibold text-highlighted">
          Quarterly report
        </h3>
        <p class="mt-2 text-sm text-muted">
          Revenue grew 18% against a flat headcount, and churn held below two
          percent for the third quarter running.
        </p>
      </div>
    </MContentSkeleton>

    <div class="flex items-center gap-3">
      <MContentSkeleton class="size-10 rounded-full" />
      <div class="flex flex-1 flex-col gap-2">
        <MContentSkeleton class="h-3 w-2/3" />
        <MContentSkeleton class="h-3 w-1/2" />
      </div>
    </div>

    <UButton
      class="self-start"
      color="neutral"
      variant="outline"
      @click="loading = !loading"
    >
      {{ loading ? 'Show content' : 'Reload' }}
    </UButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(true)
</script>
```

::

Without a slot the block has no intrinsic size, so give it one. The class lands
on the same node as the pulse, which means `h-3 w-2/3` or `size-10 rounded-full`
work exactly as they read.

## Customize

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="content-skeleton-custom" />
  :::
#code
  <PlaygroundCode name="ContentSkeleton" />
::

## Props

::component-props
  ::component-prop{name="loading" type="boolean" default="true"}
  Show the skeleton. When false the slot renders normally.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the wrapper, or for the block when there is no slot.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The content to measure. It stays mounted while loading and is revealed
  unchanged when `loading` turns false.
  ::
::

## Accessibility

- While loading, the wrapper sets `aria-busy="true"` and `aria-live="polite"`,
  so assistive technology knows the region is still filling in.
- The pulse layer is `aria-hidden`; it carries no text of its own.
- A visually hidden `Loading` label names the state for the no-slot block, which
  would otherwise be an unlabelled empty element.
- The hidden children are marked `inert` and `aria-hidden`, so focus and the
  accessibility tree skip content that is not yet meaningful.
- The pulse stops under `prefers-reduced-motion`; the skeleton stays visible as a
  static surface, so the state is still readable without animation.

## Performance

- Children render once and stay mounted. Switching `loading` toggles visibility
  instead of mounting a second copy, so there is no image refetch or remount.
- The overlay is one absolutely positioned layer, so the cost is a single
  compositor animation rather than one per grey box.
- The pulse is a CSS animation with no JavaScript loop; nothing runs per frame in
  the component.
- For very heavy wrapped trees, prefer the no-slot blocks: the preview still has
  to lay out the hidden children to learn their size.
