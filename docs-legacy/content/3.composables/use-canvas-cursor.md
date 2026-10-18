---
title: useCanvasCursor
description: Custom cursor implementation with canvas-based effects.
navigation:
  icon: i-lucide-mouse-pointer-2
---

# useCanvasCursor

The useCanvasCursor composable provides a custom cursor implementation with canvas-based effects. It creates fluid, animated cursor trails that follow mouse movements.

## Usage

```vue
<template>
    <canvas
      ref="canvasRef"
      class="absolute w-full h-full inset-0"
    />
</template>

<script setup>
import { ref } from 'vue'
import { useCanvasCursor } from '#imports'

const canvasRef = ref()

useCanvasCursor(canvasRef, { color: 'primary' })
</script>
```

## Preview

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

## Parameters

::field-group
  ::field{name="canvasRef" type="Ref<HTMLCanvasElement>"}
  Reference to the canvas element.
  ::
  
  ::field{name="options" type="object" default="{}"}
  Configuration options.
  ::
  
  ::field{type="object" name="options.color" default="undefined"}
  Color of the cursor trail. Can be a theme color name or 'random'.
  ::
::

## Configuration

The composable uses the following internal configuration:

```ts
const config = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98
}
```