---
title: Mask Container
description: Dims its content behind a configurable overlay driven by a show prop.
navigation:
  icon: i-lucide-eye
---

# Mask Container

The MaskContainer component dims the content you put in it behind a configurable overlay. You control the overlay with the `show` prop, so the masked content stays mounted and interactive state is preserved across toggles.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
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
        <h2 class="text-3xl font-bold text-black dark:text-white">
          Mask Reveal Effect
        </h2>
        <p class="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Drive the mask with the <code>show</code> prop.
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

## Props

::field-group
  ::field{name="show" type="boolean" default="false"}
  Whether the mask is covering the content. When `false` the overlay fades out and stops intercepting pointer events.
  ::

  ::field{name="color" type="string" default="'rgba(0,0,0,0.5)'"}
  Background colour of the overlay. Any CSS colour value.
  ::

  ::field{name="icon" type="string" default="''"}
  Icon name rendered in the default mask content. Requires a `label` to be visible.
  ::

  ::field{name="label" type="string" default="''"}
  Text rendered under the `icon` in the default mask content.
  ::

  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container. Give it a height, since the overlay is positioned against the container.
  ::
::

## Slots

::field-group
  ::field{name="default" type="slot"}
  The content to mask. Always mounted, regardless of `show`.
  ::

  ::field{name="mask" type="slot"}
  Content rendered inside the overlay. Falls back to the `icon` and `label` props.
  ::
::

## Examples

### Basic Mask Container

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
  <MMaskContainer
    :show="show"
    icon="i-lucide-eye"
    label="Interactive Reveal"
    class="relative h-64 rounded-xl border"
  >
    <div class="flex h-full items-center justify-center">
      <span class="text-3xl font-bold text-primary">Masked Content</span>
    </div>
  </MMaskContainer>
</template>
```
::

### Custom Mask Colour

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="mask-container-custom" />
  :::
#code
```vue
<template>
  <MMaskContainer
    :show="show"
    color="rgba(76, 29, 149, 0.75)"
    icon="i-lucide-lock"
    label="Members Only"
    class="relative min-h-96 rounded-lg"
  >
    <div class="flex min-h-96 items-center justify-center p-8 text-center">
      <h3 class="text-3xl font-bold text-black dark:text-white">
        Custom Mask Colour
      </h3>
    </div>
  </MMaskContainer>
</template>
```
::
