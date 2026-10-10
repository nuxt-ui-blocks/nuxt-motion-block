---
title: Variable Proximity
description: Text effect that responds to mouse proximity with variable font properties.
navigation:
  icon: i-lucide-type
---

# Variable Proximity

The VariableProximity component creates a text effect that responds to mouse proximity with variable font properties. It requires a font with variable axes (like Inter) to work properly.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Variable Proximity</h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      ref="containerRef"
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover me! Nuxt Motion Block"
        class="text-4xl"
        from-font-variation-settings="'wght' 400, 'opsz' 9"
        to-font-variation-settings="'wght' 1000, 'opsz' 40"
        :radius="120"
        falloff="linear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
```
::

## Props

::field-group
  ::field{name="label" type="string" required}
  The text to display with proximity effects.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to each character.
  ::
  
  ::field{name="fromFontVariationSettings" type="string" default="'wght' 400, 'opsz' 9"}
  Starting font variation settings.
  ::
  
  ::field{name="toFontVariationSettings" type="string" default="'wght' 1000, 'opsz' 40"}
  Ending font variation settings.
  ::
  
  ::field{name="containerRef" type="object" default="null"}
  Reference to the container element.
  ::
  
  ::field{name="radius" type="number" default="100"}
  Radius of the proximity effect in pixels.
  ::
  
  ::field{name="falloff" type="string" default="'linear'"}
  Type of falloff: 'linear', 'exponential', or 'gaussian'.
  ::
::

## Examples

### Basic Variable Proximity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-basic" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Basic Variable Proximity</h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      ref="containerRef"
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Hover Text"
        class="text-3xl"
        :radius="80"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
```
::

### Custom Variable Proximity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="variable-proximity-custom" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Custom Variable Proximity</h3>
    <link
      rel="stylesheet"
      href="https://rsms.me/inter/inter.css"
    >
    <div
      ref="containerRef"
      class="relative"
      style="font-family: 'Inter var', 'Inter', sans-serif;"
    >
      <MVariableProximity
        label="Custom Proximity"
        class="text-5xl font-bold"
        from-font-variation-settings="'wght' 300, 'opsz' 12"
        to-font-variation-settings="'wght' 800, 'opsz' 36"
        :radius="150"
        falloff="linear"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const containerRef = ref(null)
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.variableProximity` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative inline-block'` |
| `char` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.variableProximity` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `char` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.variableProximity` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `char` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.variableProximity` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block` |
| `char` |  |
