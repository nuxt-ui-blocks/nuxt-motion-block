---
title: Typing Text
description: Typing effect for text content.
navigation:
  icon: i-lucide-type
---

# Typing Text

The TypingText component creates a typing effect for text content. It's perfect for creating dynamic text entrances that simulate typing on a keyboard.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-cycling" />
  :::
#code
```vue
<template>
  <MTypingText text="Typing Text" />
</template>
```
::

## Props

::field-group
  ::field{name="text" type="string" default="''"}
  Text to type.
  ::
  
  ::field{name="texts" type="string[]" default="undefined"}
  Array of texts to cycle through.
  ::
  
  ::field{name="speed" type="number" default="100"}
  Typing speed in milliseconds.
  ::
  
  ::field{name="delay" type="number" default="0"}
  Delay before starting animation.
  ::
  
  ::field{name="showCursor" type="boolean" default="true"}
  Whether to show cursor.
  ::
  
  ::field{name="cursor" type="string" default="'|'"}
  Cursor character.
  ::
  
  ::field{name="cursorClass" type="string" default="''"}
  CSS classes for cursor.
  ::
  
  ::field{name="loop" type="boolean" default="false"}
  Whether to loop through texts.
  ::
  
  ::field{name="pauseDuration" type="number" default="2000"}
  Pause duration between loops.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="onComplete" type="function" default="undefined"}
  Callback when typing completes.
  ::
  
  ::field{name="startOnView" type="boolean" default="true"}
  Start animation when component enters viewport.
  ::
  
  ::field{name="once" type="boolean" default="false"}
  Animate only once.
  ::
  
  ::field{name="animation" type="string" default="'fadeIn'"}
  Animation preset to use.
  ::
  
  ::field{name="inViewMargin" type="string" default="'0px'"}
  Margin for in-view detection.
  ::
::

## Examples

### Basic Typing Text

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-basic" />
  :::
#code
```vue
<template>
  <MTypingText text="Hello World" />
</template>
```
::

### Fast Typing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-fast" />
  :::
#code
```vue
<template>
  <MTypingText text="Fast Typing" :speed="50" />
</template>
```
::

### Custom Cursor

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-cursor" />
  :::
#code
```vue
<template>
  <MTypingText text="Custom Cursor" cursor="???" cursor-class="text-blue-500" />
</template>
```
::

### Rise in Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-slide" />
  :::
#code
```vue
<template>
  <MTypingText text="Rise in" animation="slideUp" />
</template>
```
::

### Styled Typing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-styled" />
  :::
#code
```vue
<template>
  <MTypingText text="Styled Typing" class="text-2xl font-bold text-purple-600" />
</template>
```
::

### Hands-on control

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="typing-text-manual" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <div class="flex space-x-2">
      <UButton @click="typingRef?.start()">Start</UButton>
      <UButton @click="typingRef?.pause()">Pause</UButton>
      <UButton @click="typingRef?.reset()">Reset</UButton>
    </div>
    <MTypingText 
      ref="typingRef"
      text="Hands-on control" 
      :auto-start="false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const typingRef = ref()
</script>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.typingText` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `typing-text-container whitespace-pre-wrap` |
| `text` | `inline-flex items-center` |
| `cursor` | `typing-cursor inline-block ms-1 font-normal select-none w-px` |
