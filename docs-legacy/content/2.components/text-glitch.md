---
title: Text Glitch
description: Glitch effect for text elements.
navigation:
  icon: i-lucide-zap
---

# Text Glitch

The TextGlitch component creates a glitch effect for text elements. It's perfect for creating eye-catching headings and animated text effects with a digital distortion style.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-custom-colors" />
  :::
#code
```vue
<template>
  <MTextGlitch text="GLITCH" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" :required="true"}
  Text to glitch.
  ::
  
  ::field{name="trigger" type="'hover' | 'auto' | 'inView' | 'manual'" default="'hover'"}
  How to trigger the glitch effect.
  ::
  
  ::field{name="intensity" type="'low' | 'medium' | 'high' | 'extreme' | number" default="'medium'"}
  Intensity of the glitch effect.
  ::
  
  ::field{name="duration" type="number" default="2"}
  Duration of glitch effect in seconds.
  ::
  
  ::field{name="interval" type="number" default="3"}
  Interval between auto glitches in seconds.
  ::
  
  ::field{name="speed" type="number" default="500"}
  Animation speed in milliseconds.
  ::
  
  ::field{name="colors" type="string[]" default="['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']"}
  Colors for glitch layers.
  ::
  
  ::field{name="showScanLines" type="boolean" default="true"}
  Show scan lines effect.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="autoStart" type="boolean" default="false"}
  Automatically start glitch effect.
  ::
::

## Examples

### Basic Text Glitch

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-basic" />
  :::
#code
```vue
<template>
  <MTextGlitch text="CYBER" />
</template>
```
::

### Auto Trigger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-auto" />
  :::
#code
```vue
<template>
  <MTextGlitch text="AUTO" trigger="auto" />
</template>
```
::

### Extreme Intensity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-extreme" />
  :::
#code
```vue
<template>
  <MTextGlitch text="EXTREME" intensity="extreme" :speed="200" />
</template>
```
::

### Hands-on control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-glitch-manual" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <UButton @click="glitchRef?.glitch()">Glitch</UButton>
      <UButton @click="glitchRef?.stop()">Stop</UButton>
    </div>
    <MTextGlitch 
      ref="glitchRef"
      text="MANUAL CONTROL" 
      trigger="manual"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const glitchRef = ref()
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGlitch` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `text-glitch-container relative inline-block select-none` |
| `main` | `text-glitch-main relative z-10` |
| `layer` | `text-glitch-layer absolute top-0 left-0 w-full h-full pointer-events-none` |
| `scanLines` | `absolute inset-0 pointer-events-none` |
| `scanLine` | `absolute bg-(--ui-bg-inverted)/20 h-px left-0 right-0` |
