---
title: Tilt
description: Component that creates a 3D tilt effect based on cursor movement.
---

The Tilt component creates a 3D tilt effect based on cursor movement. It's perfect for creating interactive cards and elements that respond to cursor proximity with realistic 3D transformations.

## Usage

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
  <div class="p-8">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-highlighted mb-4">
          Interactive Cards
        </h2>
        <p class="text-muted">
          Experience our 3D tilt effects that respond to your cursor movements
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/70 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-zap"
                  class="w-8 h-8 text-primary"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Blazing quick
              </h3>
              <p class="text-muted text-sm">
                Experience blazing performance with our optimized solution
              </p>
            </div>
          </UCard>
        </MTilt>

        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-sparkles"
                  class="w-8 h-8 text-purple-600 dark:text-purple-400"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Beautiful Effects
              </h3>
              <p class="text-muted text-sm">
                Stunning animations that captivate your audience
              </p>
            </div>
          </UCard>
        </MTilt>

        <MTilt>
          <UCard class="h-full">
            <div class="text-center p-6">
              <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
                <UIcon
                  name="i-lucide-code"
                  class="w-8 h-8 text-green-600 dark:text-green-400"
                />
              </div>
              <h3 class="text-lg font-semibold mb-2">
                Plug-in ready
              </h3>
              <p class="text-muted text-sm">
                Quick to add with clean documentation
              </p>
            </div>
          </UCard>
        </MTilt>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Hands-on control

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
  <div class="p-4 space-y-4">
    <MTilt
      :key="tiltKey"
      :rotation-factor="rotationFactor"
    >
      <div class="p-6 bg-gradient-to-br from-[#0d9488] to-[#14b8a6] text-white rounded-xl shadow-xl">
        <h3 class="text-xl font-bold mb-2">
          Manual Tilt
        </h3>
        <p>Click the button to reset the tilt effect</p>
      </div>
    </MTilt>
    <button
      class="px-4 py-2 bg-primary/70 text-white rounded-lg hover:bg-primary transition-colors"
      @click="resetTilt"
    >
      Reset Tilt
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const rotationFactor = ref(15)
const tiltKey = ref(0)

const resetTilt = () => {
  tiltKey.value++
}
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="tilt-custom" />
  :::
#code
  <PlaygroundCode name="Tilt" />
::

## Props

::component-props
  ::component-prop{name="rotationFactor" type="number" default="15"}
  Rotation factor for tilt effect.
  ::
  
  ::component-prop{name="isReverse" type="boolean" default="false"}
  Reverse tilt direction.
  ::
  
  ::component-prop{name="springOptions" type="SpringOptions" default="{}"}
  Spring animation options.
  ::
  
  ::component-prop{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="style" type="object" default="{}"}
  CSS styles to apply to the container.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Tilted content.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.tilt` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

