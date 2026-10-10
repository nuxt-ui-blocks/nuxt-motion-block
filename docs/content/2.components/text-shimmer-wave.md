---
title: Text Shimmer Wave
description: Text with a wave-like shimmer animation effect.
navigation:
  icon: i-lucide-audio-waveform
---

# Text Shimmer Wave

The TextShimmerWave component creates text with a wave-like shimmer animation effect. It's perfect for creating eye-catching headings and text elements with dynamic 3D transformations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-styled" />
  :::
#code
```vue
<template>
  <MTextShimmerWave text="Wave Shimmer" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" :required="true"}
  Text to shimmer with wave effect.
  ::
  
  ::field{name="as" type="string" default="'p'"}
  HTML element to render as.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="duration" type="number" default="1"}
  Animation duration in seconds.
  ::
  
  ::field{name="zDistance" type="number" default="10"}
  Z-axis movement distance.
  ::
  
  ::field{name="xDistance" type="number" default="2"}
  X-axis movement distance.
  ::
  
  ::field{name="yDistance" type="number" default="-2"}
  Y-axis movement distance.
  ::
  
  ::field{name="spread" type="number" default="1"}
  Spread of the wave effect.
  ::
  
  ::field{name="scaleDistance" type="number" default="1.1"}
  Scale transformation distance.
  ::
  
  ::field{name="rotateYDistance" type="number" default="10"}
  Y-axis rotation distance.
  ::
  
  ::field{name="transition" type="object" default="{}"}
  Custom transition options.
  ::
::

## Examples

### Manual Control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-manual" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <UButton @click="startAnimation">Start</UButton>
      <UButton @click="stopAnimation">Stop</UButton>
    </div>
    <MTextShimmerWave 
      ref="shimmerRef"
      text="Manual Control" 
      :auto-play="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const shimmerRef = ref()

const startAnimation = () => {
  shimmerRef.value?.play()
}

const stopAnimation = () => {
  shimmerRef.value?.pause()
}
</script>
```
::

### Basic Text Shimmer Wave

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-basic" />
  :::
#code
```vue
<template>
  <MTextShimmerWave text="Basic Wave" />
</template>
```
::

### Slow Wave

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-slow" />
  :::
#code
```vue
<template>
  <MTextShimmerWave :duration="2" text="Slow Wave" />
</template>
```
::

### As Heading

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-heading" />
  :::
#code
```vue
<template>
  <MTextShimmerWave as="h1" class="text-3xl font-bold" text="Heading Wave" />
</template>
```
::

### Big Wave

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-big" />
  :::
#code
```vue
<template>
  <MTextShimmerWave 
    text="Big Wave" 
    :z-distance="20" 
    :x-distance="5" 
    :y-distance="-5" 
    :scale-distance="1.3" 
    :rotate-y-distance="20" 
  />
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-styled" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextShimmerWave 
      text="TEAL WAVE" 
      class="text-2xl font-bold text-[#0d9488]" 
      :z-distance="15"
      :duration="1.5"
    />
  </div>
</template>
```
::

### Manual Trigger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-wave-manual" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <MTextShimmerWave 
      :text="waveText" 
      :key="waveKey"
      class="text-xl font-bold"
    />
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="triggerWave"
    >
      Replay Wave Animation
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const waveText = ref("Click Me")
const waveKey = ref(0)

const triggerWave = () => {
  waveKey.value++
}
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textShimmerWave` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]'` |
| `char` | `'inline-block whitespace-pre [transform-style:preserve-3d]'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textShimmerWave` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]` |
| `char` | `inline-block whitespace-pre [transform-style:preserve-3d]` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.textShimmerWave` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]` |
| `char` | `inline-block whitespace-pre [transform-style:preserve-3d]` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textShimmerWave` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative inline-block [perspective:500px] [--base-color:#a1a1aa] [--base-gradient-color:#000] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]` |
| `char` | `inline-block whitespace-pre [transform-style:preserve-3d]` |
