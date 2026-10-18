---
title: Cursor
description: Custom animated cursor with various styles and interactive effects.
navigation:
  icon: i-lucide-move
---

# Cursor

The Cursor component creates a custom animated cursor with various styles and interactive effects. It replaces the default browser cursor with a customizable animated element that can have different appearances and behaviors.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cursor-basic" />
  :::
#code
```vue
<template>
  <div class="flex items-center justify-center h-full w-full p-4">
    <div class="w-full max-w-md mx-auto">
      <div class="text-center mb-4">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Basic Cursor Example
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Move your cursor in the box below
        </p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div class="h-48 w-full rounded bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center relative">
          <!-- Simple cursor component -->
          <MCursor>
            <div class="w-3 h-3 rounded-full bg-blue-500"></div>
          </MCursor>

          <div class="text-center">
            <p class="text-gray-700 dark:text-gray-300 text-sm">
              Move your cursor here to see the custom cursor
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is the most basic example of using the MCursor component
// Just wrap any element with MCursor to replace the default cursor
</script>
```

## Props

::field-group
  ::field{name="variants"}
  CVariants for controlling the animation states with specific properties for initial, animate, and exit states.
  ::
  
  ::field{name="springConfig" type="SpringOptions" default=""}
Configuration for the spring physics used in the cursor's movement.
  ::
  
  ::field{name="trail" type="boolean" default="false"}
  Enable trailing effect.
  ::
  
  ::field{name="transition" type="Transition" default=""}
 Transition settings from motion for animation effects.
  ::
  
  ::field{name="attachToParent" type="boolean" default="false"}
  If true, the cursor will only be visible when hovering over its parent component.
  ::
  ::field{name="onPositionChange" type="function" default=""}
  Callback function that is called when the cursor position changes.
  ::
::

## Examples

### Ring Variant

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cursor-basic-pink" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MCursor 
      :attach-to-parent="true"
    >
      <UIcon name="i-lucide-circle-dot-dashed" class="text-pink-600 dark:text-pink-400"></UIcon>
    </MCursor>
  </div>
</template>
```
::

### Cursor Green

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
  <div class="p-4">
    <MCursor 
      :attach-to-parent="true"
    >
      <div class="p-2 bg-emerald-500 rounded-full"></div>
    </MCursor>
  </div>
</template>
```
::

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
    <MCursor
      attach-to-parent
      :variants="{
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.3, opacity: 0 }
      }"
      :spring-config="{ bounce: 0.001 }"
      :transition="{ ease: 'easeInOut', duration: 0.15 }"
      :on-position-change="handlePositionChange"
    >
      <motion.div
        :animate="{
          width: isHovering ? 80 : 16,
          height: isHovering ? 32 : 16
        }"
        class="flex items-center justify-center rounded-[24px] bg-neutral-500/40 backdrop-blur-md dark:bg-neutral-300/40"
      >
        <AnimatePresence>
          <motion.div
            v-if="isHovering"
            :initial="{ opacity: 0, scale: 0.6 }"
            :animate="{ opacity: 1, scale: 1 }"
            :exit="{ opacity: 0, scale: 0.6 }"
            class="inline-flex w-full items-center justify-center"
          >
            <div class="inline-flex items-center text-sm text-white dark:text-black">
              More
              <UIcon
                name="i-lucide-plus"
                class="ml-1 h-4 w-4"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </MCursor>

    <div ref="targetRef">
      <UCard>
        <UCard>
          <template #header>
            <h1>custom cursor</h1>
          </template>

          Cursor with spring effect 
        </UCard>
      </UCard>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'

const isHovering = ref(false)
</script>
```
::

### Cursor with Image

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="cursor-with-image" />
  :::
#code
```vue

<script setup>
const variants = {
  initial: { height: 0, opacity: 0, scale: 0.3 },
  animate: { height: 'auto', opacity: 1, scale: 1 },
  exit: { height: 0, opacity: 0, scale: 0.3 }
}

const transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0.1
}

const springConfig = {
  bounce: 0.01
}
</script>

<template>
  <div>
    <div class="p-4">
      <MCursor
        :attach-to-parent="true"
        :variants="variants"
        :transition="transition"
        class="overflow-hidden"
        :spring-config="springConfig"
      >
        <img
          src="/hingol-national-park.jpg"
          alt="Hingol National Park"
          class="h-40 w-40"
        >
      </MCursor>
      Hingol National Park a beautiful place to explore in Pakistan
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.cursor` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none fixed left-0 top-0 z-50` |
