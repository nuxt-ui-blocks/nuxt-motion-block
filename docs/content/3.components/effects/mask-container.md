---
title: Mask Container
description: Dims its content behind a configurable overlay driven by a show prop.
---

The MaskContainer component dims the content you put in it behind a configurable overlay. You control the overlay with the `show` prop, so the masked content stays mounted and interactive state is preserved across toggles.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mask-container-basic" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <UButton
      :label="show ? 'Reveal' : 'Mask'"
      @click="show = !show"
    />

    <MMaskContainer
      :show="show"
      icon="i-lucide-eye"
      label="Interactive Reveal"
      class="relative h-64 rounded-xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div class="flex h-full items-center justify-center">
        <span class="text-3xl font-bold text-primary">Masked Content</span>
      </div>
    </MMaskContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>
```
::

## Examples

### Mask Container

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="mask-container-example" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <UButton
      :label="show ? 'Hide mask' : 'Show mask'"
      @click="show = !show"
    />

    <MMaskContainer
      :show="show"
      class="relative rounded-lg border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800"
    >
      <div class="flex h-96 flex-col items-center justify-center gap-4 p-8 text-center">
        <h2 class="text-3xl font-bold text-black">
          Mask Reveal Effect
        </h2>
        <p class="max-w-2xl text-lg text-muted">
          Drive the mask with the <code>show</code> prop. The overlay fades and scales
          itself away, so the content underneath is always in the DOM.
        </p>
      </div>

      <template #mask>
        <div class="text-center">
          <h2 class="text-5xl font-bold text-white mb-6">
            Masked
          </h2>
          <p class="text-lg text-white/80">
            The content behind is dimmed.
          </p>
        </div>
      </template>
    </MMaskContainer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(true)
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="mask-container-custom" />
  :::
#code
  <PlaygroundCode name="MaskContainer" />
::

## Props

::component-props
  ::component-prop{name="show" type="boolean" default="false"}
  Whether the mask is covering the content. When `false` the overlay fades out and stops intercepting pointer events.
  ::

  ::component-prop{name="color" type="string" default="'rgba(0,0,0,0.5)'"}
  Background colour of the overlay. Any CSS colour value.
  ::

  ::component-prop{name="icon" type="string" default="''"}
  Icon name rendered in the default mask content. Requires a `label` to be visible.
  ::

  ::component-prop{name="label" type="string" default="''"}
  Text rendered under the `icon` in the default mask content.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. Give it a height, since the overlay is positioned against the container.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default" type="slot"}
  The content to mask. Always mounted, regardless of `show`.
  ::

  ::component-slot-row{name="mask" type="slot"}
  Content rendered inside the overlay. Falls back to the `icon` and `label` props.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.maskContainer` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative overflow-hidden`
  ::
  ::component-slot-row{name="mask"}
  `absolute inset-0 z-10 flex items-center justify-center`
  ::
  ::component-slot-row{name="content"}
  `text-center p-6`
  ::
  ::component-slot-row{name="iconWrapper"}
  `mb-4`
  ::
  ::component-slot-row{name="icon"}
  `w-12 h-12 mx-auto text-white`
  ::
  ::component-slot-row{name="label"}
  `text-white text-lg font-medium`
  ::
::

