---
title: Animated Group
description: Animate multiple elements in sequence with staggered delays.
---

The AnimatedGroup component allows you to animate multiple elements in sequence with staggered delays. It's perfect for creating cascading animations, loading sequences, and other staggered effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-group-basic" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-highlighted mb-2">
        Basic Animated Group
      </h3>
      <p class="text-muted text-sm">
        Items animate in sequence with staggered delays
      </p>
    </div>

    <div class="bg-default rounded-lg p-6 shadow">
      <MAnimatedGroup
        :stagger-children="0.1"
        :variants="{
          item: {
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          },
        }"
        class="flex flex-wrap gap-2"
      >
        <div
          v-for="i in 6"
          :key="i"
          class="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-white font-bold m-1"
        >
          {{ i }}
        </div>
      </MAnimatedGroup>
    </div>

    <div class="mt-4 text-center">
      <UButton
        color="primary"
        variant="outline"
        size="sm"
        class="flex items-center mx-auto"
        @click="refresh"
      >
        <UIcon
          name="i-lucide-refresh-cw"
          class="w-4 h-4 mr-1"
        />
        Refresh Animation
      </UButton>
    </div>
  </div>
</template>

<script setup>
const refresh = () => {
  // This will trigger a re-render and restart the animation
  window.location.reload()
}
</script>
```
::

## Examples

### With Preset Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-group-preset" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl max-w-md mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-xl font-bold text-highlighted mb-2">
        Preset Animation
      </h3>
      <p class="text-muted text-sm">
        Using built-in animation presets
      </p>
    </div>

    <div class="bg-default rounded-lg p-6 shadow">
      <MAnimatedGroup
        :key="currentPreset"
        :preset="currentPreset"
        :stagger-children="0.05"
        class="flex flex-wrap gap-2"
      >
        <UBadge
          v-for="i in 8"
          :key="i"
          color="primary"
          variant="solid"
          size="lg"
          class="m-1 inline-block"
        >
          Item {{ i }}
        </UBadge>
      </MAnimatedGroup>
    </div>

    <div class="mt-4 flex justify-center gap-3">
      <UButton
        :color="currentPreset === 'bounce' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('bounce')"
      >
        Bounce
      </UButton>
      <UButton
        :color="currentPreset === 'slide' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('slide')"
      >
        Slide
      </UButton>
      <UButton
        :color="currentPreset === 'scale' ? 'primary' : 'gray'"
        size="xs"
        @click="changePreset('scale')"
      >
        Scale
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentPreset = ref('bounce')

const changePreset = (preset) => {
  currentPreset.value = preset
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
    <component-example name="animated-group-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedGroup" />
::

## Props

::component-props
  ::component-prop{name="as" type="string" default="'div'"}
  HTML element to render as the container.
  ::
  
  ::component-prop{name="asChild" type="string" default="'div'"}
  HTML element to render as each child item.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="variants" type="object"}
  Animation variants for container and items.
  ::
  
  ::component-prop{name="preset" type="string"}
  Predefined animation presets ('fade', 'slide', 'scale', 'blur', 'blur-slide', 'zoom', 'flip', 'bounce', 'rotate', 'swing').
  ::
  
  ::component-prop{name="initial" type="string" default="'hidden'"}
  Initial animation state.
  ::
  
  ::component-prop{name="animate" type="string" default="'visible'"}
  Target animation state.
  ::
  
  ::component-prop{name="staggerChildren" type="number" default="0.1"}
  Delay between each child animation in seconds.
  ::
  
  ::component-prop{name="staggerDirection" type="number" default="1"}
  Direction of stagger (1 for forward, -1 for reverse).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedGroup` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

