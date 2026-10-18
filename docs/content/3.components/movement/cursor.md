---
title: Cursor
description: Custom animated cursor with various styles and interactive effects.
---

The Cursor component creates a custom animated cursor with various styles and interactive effects. It replaces the default browser cursor with a customizable animated element that can have different appearances and behaviors.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cursor-example" />
  :::
#code
```vue
<template>
  <div class="min-h-screen relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute w-full h-full inset-0"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCanvasCursor } from '#imports'

const canvasRef = ref()

useCanvasCursor(canvasRef, { color: 'primary' })
</script>
```
::

## Examples

### Cursor with spring

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cursor-interactive-example" />
  :::
#code
```vue
<template>
  <div class="min-h-screen p-8">
    <!-- Global Cursor -->
    <MCursor
      v-if="!attachToParent"
      :spring-config="springConfig"
    >
      <div class="w-8 h-8 rounded-full bg-elevated flex items-center justify-center">
        <div class="w-2 h-2 rounded-full" />
      </div>
    </MCursor>

    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div
          class="relative p-8 border-2 border-dashed border-primary/30 rounded-xl h-64"
          @mouseover="activeContainer = 'blue'"
          @mouseout="activeContainer = ''"
        >
          <MCursor
            v-if="attachToParent && activeContainer === 'blue'"
            :attach-to-parent="true"
            :spring-config="springConfig"
          >
            <div class="w-8 h-8 rounded-full bg-primary/70 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full" />
            </div>
          </MCursor>
          <h3 class="text-xl font-semibold mb-2">
            Blue Container
          </h3>
          <p>Custom cursor appears only in this area</p>
        </div>

        <div
          class="relative p-8 border-2 border-dashed border-red-300 rounded-xl h-64"
          @mouseover="activeContainer = 'red'"
          @mouseout="activeContainer = ''"
        >
          <MCursor
            v-if="attachToParent && activeContainer === 'red'"
            :attach-to-parent="true"
            :spring-config="springConfig"
          >
            <div class="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
              <div class="w-2 h-2 rounded-full" />
            </div>
          </MCursor>
          <h3 class="text-xl font-semibold mb-2">
            Red Container
          </h3>
          <p>Custom cursor appears only in this area</p>
        </div>
      </div>

      <div class="p-6 rounded-xl">
        <h2 class="text-2xl font-semibold mb-4">
          Control Panel
        </h2>

        <div class="space-y-4">
          <UFormField
            label="Cursor Mode"
            name="cursorMode"
          >
            <URadioGroup
              v-model="attachToParent"
              :options="[
                { value: false, label: 'Global Cursor' },
                { value: true, label: 'Container-Specific Cursor' },
              ]"
            />
          </UFormField>

          <UFormField
            label="Spring Stiffness"
            name="stiffness"
          >
            <USlider
              v-model="springConfig.stiffness"
              :min="50"
              :max="500"
            />
            <span class="text-sm text-muted ml-2">{{ springConfig.stiffness }}</span>
          </UFormField>

          <UFormField
            label="Spring Damping"
            name="damping"
          >
            <USlider
              v-model="springConfig.damping"
              :min="5"
              :max="50"
            />
            <span class="text-sm text-muted ml-2">{{ springConfig.damping }}</span>
          </UFormField>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const attachToParent = ref(true)
const springConfig = ref({
  stiffness: 200,
  damping: 15,
  mass: 0.1,
})
const activeContainer = ref('')
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="cursor-custom" />
  :::
#code
  <PlaygroundCode name="Cursor" />
::

## Props

::component-props
  ::component-prop{name="variants"}
  CVariants for controlling the animation states with specific properties for initial, animate, and exit states.
  ::
  
  ::component-prop{name="springConfig" type="SpringOptions" default=""}
Configuration for the spring physics used in the cursor's movement.
  ::
  
  ::component-prop{name="trail" type="boolean" default="false"}
  Enable trailing effect.
  ::
  
  ::component-prop{name="transition" type="Transition" default=""}
 Transition settings from motion for animation effects.
  ::
  
  ::component-prop{name="attachToParent" type="boolean" default="false"}
  If true, the cursor will only be visible when hovering over its parent component.
  ::
  ::component-prop{name="onPositionChange" type="function" default=""}
  Callback function that is called when the cursor position changes.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cursor` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none fixed left-0 top-0 z-50`
  ::
::

