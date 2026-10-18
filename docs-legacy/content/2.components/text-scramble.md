---
title: Text Scramble
description: Text that scrambles through random characters before revealing the final text.
navigation:
  icon: i-lucide-zap
---

# Text Scramble

The TextScramble component creates text that scrambles through random characters before revealing the final text. It's perfect for creating engaging text transitions and dynamic content displays.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-manual" />
  :::
#code
```vue
<template>
  <MTextScramble text="Scramble Text" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" default="''"}
  Text to scramble.
  ::
  
  ::field{name="duration" type="number" default="0.8"}
  Animation duration in seconds.
  ::
  
  ::field{name="speed" type="number" default="0.04"}
  Speed of character transitions.
  ::
  
  ::field{name="characterSet" type="string" default="'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'"}
  Characters to use for scrambling.
  ::
  
  ::field{name="as" type="string" default="'p'"}
  HTML element to render as.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="trigger" type="boolean" default="true"}
  Enable/disable the scrambling.
  ::
  
  ::field{name="onScrambleComplete" type="function" default="undefined"}
  Callback when scramble completes.
  ::
::

## Examples

### Basic Text Scramble

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-basic" />
  :::
#code
```vue
<template>
  <MTextScramble text="Basic Scramble" />
</template>
```
::

### Fast Scramble

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-fast" />
  :::
#code
```vue
<template>
  <MTextScramble text="Fast Scramble" :duration="0.5" :speed="0.02" />
</template>
```
::

### Symbol Scramble

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-symbol" />
  :::
#code
```vue
<template>
  <MTextScramble text="Symbol Scramble" character-set="!@#$%^&*()_+-=[]{}|;:,.<>?" />
</template>
```
::

### As Heading

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-heading" />
  :::
#code
```vue
<template>
  <MTextScramble text="Heading Scramble" as="h1" class="text-3xl font-bold" />
</template>
```
::

### Manual Trigger

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-scramble-manual" />
  :::
#code
```vue
<template>
  <div class="p-4 space-y-4">
    <MTextScramble text="Click to scramble" :trigger="scrambleTrigger" />
    <button 
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      @click="triggerScramble"
    >
      Scramble Text
    </button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const scrambleTrigger = ref(true)

const triggerScramble = () => {
  // Toggle the trigger to initiate scramble
  scrambleTrigger.value = false
  nextTick(() => {
    scrambleTrigger.value = true
  })
}
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textScramble` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
