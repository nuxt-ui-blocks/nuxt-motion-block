---
title: useFluidCursor
description: Fluid cursor effects with particle systems.
navigation:
  icon: i-lucide-droplets
---

# useFluidCursor

The useFluidCursor composable provides advanced fluid simulation cursor effects using WebGL. It creates realistic fluid dynamics for cursor interactions with customizable colors and physics.

## Usage

```vue
<template>
  <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
</template>

<script setup>
import { ref } from 'vue'
import { useFluidCursor } from '#imports'

const canvasRef = ref()
useFluidCursor(canvasRef, { color: 'secondary' })
</script>
```

## Preview

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="fluid-cursor-example" />
  :::
#code
```vue
<template>
  <div class="min-h-screen relative overflow-hidden">
    <canvas
      ref="canvasRef"
      class="absolute inset-0 w-full h-full"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFluidCursor } from '#imports'

const canvasRef = ref()

useFluidCursor(canvasRef, { color: 'primary' })
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
  Color of the fluid effect. Can be a theme color name.
  ::
::

## Configuration

The composable uses the following internal configuration:

```ts
const config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1440,
  CAPTURE_RESOLUTION: 512,
  DENSITY_DISSIPATION: 3.5,
  VELOCITY_DISSIPATION: 2,
  PRESSURE: 0.1,
  PRESSURE_ITERATIONS: 20,
  CURL: 3,
  SPLAT_RADIUS: 0.2,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BACK_COLOR: { r: 0.5, g: 0, b: 0 },
  TRANSPARENT: true
}
```