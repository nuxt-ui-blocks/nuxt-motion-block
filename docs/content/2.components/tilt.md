---
title: Tilt
description: Component that creates a 3D tilt effect based on cursor movement.
navigation:
  icon: i-lucide-move-3d
---

# Tilt

The Tilt component creates a 3D tilt effect based on cursor movement. It's perfect for creating interactive cards and elements that respond to cursor proximity with realistic 3D transformations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-card" />
  :::
#code
```vue
<template>
  <MTilt>
    <div class="p-6 bg-primary rounded-lg shadow-lg">
      <h3 class="text-xl font-bold mb-2">Tilt Card</h3>
      <p class="text-gray-600 dark:text-gray-400">Move your cursor over this card to see the tilt effect.</p>
    </div>
  </MTilt>
</template>
```
::

## Props

::field-group
  ::field{name="rotationFactor" type="number" default="15"}
  Rotation factor for tilt effect.
  ::
  
  ::field{name="isReverse" type="boolean" default="false"}
  Reverse tilt direction.
  ::
  
  ::field{name="springOptions" type="SpringOptions" default="{}"}
  Spring animation options.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="style" type="object" default="{}"}
  CSS styles to apply to the container.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Tilted content.
  ::
::

## Examples

### Basic Tilt

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-basic" />
  :::
#code
```vue
<template>
  <MTilt>
    <div class="p-6 bg-secondary rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">Basic Tilt</h3>
      <p class="text-gray-600 dark:text-gray-400">This card has a basic tilt effect.</p>
    </div>
  </MTilt>
</template>
```
::

### With Custom Rotation Factor

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-rotation" />
  :::
#code
```vue
<template>
  <MTilt :rotation-factor="25">
    <div class="p-6 bg-tertiary rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">High Rotation</h3>
      <p class="text-gray-600 dark:text-gray-400">This card has a more pronounced tilt effect.</p>
    </div>
  </MTilt>
</template>
```
::

### With Reverse Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-reverse" />
  :::
#code
```vue
<template>
  <MTilt :rotation-factor="20" :is-reverse="true">
    <div class="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">Reverse Tilt</h3>
      <p>This card tilts in the opposite direction.</p>
    </div>
  </MTilt>
</template>
```
::

### With Custom Spring Options

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-spring" />
  :::
#code
```vue
<template>
  <MTilt :rotation-factor="15" :spring-options="{ stiffness: 200, damping: 15 }">
    <div class="p-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg shadow-md">
      <h3 class="text-lg font-semibold mb-2">Custom Spring</h3>
      <p>This card has custom spring animation properties.</p>
    </div>
  </MTilt>
</template>
```
::

### Manual Control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="tilt-manual" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <UButton @click="tiltEnabled = !tiltEnabled">
        {{ tiltEnabled ? 'Disable' : 'Enable' }} Tilt
      </UButton>
    </div>
    <MTilt v-model:enabled="tiltEnabled">
      <div class="p-6 bg-primary rounded-lg shadow-lg">
        <h3 class="text-xl font-bold mb-2">Manual Control</h3>
        <p class="text-gray-600 dark:text-gray-400">Tilt effect can be toggled on/off.</p>
      </div>
    </MTilt>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tiltEnabled = ref(true)
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.tilt` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
