---
title: Pixelated Canvas
description: Interactive pixelated image rendering with distortion effects and customizable cell sizes.
---

The PixelatedCanvas component creates an interactive pixelated rendering of images with distortion effects that respond to mouse movement. It features customizable cell sizes, shapes, colors, and interactive behaviors.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pixelated-canvas-example" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Pixelated Canvas
    </h3>
    <MPixelatedCanvas
      src="https://picsum.photos/400/300"
      :width="400"
      :height="300"
      :cell-size="8"
      class="rounded-lg"
    />
  </div>
</template>
```
::

## Examples

### Basic Pixelated Canvas

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pixelated-canvas-basic" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Pixelated Canvas
      </h3>
      <p class="text-muted">
        Retro-style pixelated images with customizable pixel sizes for nostalgic effects
      </p>
    </div>

    <div class="bg-default rounded-lg p-4 shadow flex justify-center">
      <MPixelatedCanvas
        src="https://picsum.photos/400/300"
        :width="400"
        :height="300"
        :cell-size="6"
        class="rounded-lg"
      />
    </div>

    <div class="mt-6 grid grid-cols-3 gap-3">
      <UButton
        v-for="size in [2, 4, 6]"
        :key="size"
        :color="size === 6 ? 'primary' : 'gray'"
        variant="solid"
        size="sm"
        @click="updatePixelSize(size)"
      >
        {{ size }}px Pixels
      </UButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const pixelSize = ref(6)

const updatePixelSize = (size) => {
  pixelSize.value = size
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
    <component-example name="pixelated-canvas-custom" />
  :::
#code
  <PlaygroundCode name="PixelatedCanvas" />
::

## Props

::component-props
  ::component-prop{name="src" type="string" required}
  Source URL of the image to pixelate.
  ::
  
  ::component-prop{name="width" type="number" default="400"}
  Width of the canvas in pixels.
  ::
  
  ::component-prop{name="height" type="number" default="500"}
  Height of the canvas in pixels.
  ::
  
  ::component-prop{name="cellSize" type="number" default="3"}
  Size of each pixelated cell in pixels.
  ::
  
  ::component-prop{name="dotScale" type="number" default="0.9"}
  Scale factor for the dots within cells (0-1).
  ::
  
  ::component-prop{name="shape" type="string" default="'square'"}
  Shape of the pixels: 'circle' or 'square'.
  ::
  
  ::component-prop{name="backgroundColor" type="string" default="'#000000'"}
  Background color of the canvas. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="grayscale" type="boolean" default="false"}
  Whether to render the image in grayscale.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the canvas element.
  ::
  
  ::component-prop{name="responsive" type="boolean" default="false"}
  Whether the canvas should resize with its container.
  ::
  
  ::component-prop{name="dropoutStrength" type="number" default="0.4"}
  Strength of edge dropout effect (0-1).
  ::
  
  ::component-prop{name="interactive" type="boolean" default="true"}
  Whether the canvas should respond to mouse interactions.
  ::
  
  ::component-prop{name="distortionStrength" type="number" default="3"}
  Strength of the distortion effect.
  ::
  
  ::component-prop{name="distortionRadius" type="number" default="80"}
  Radius of the distortion effect in pixels.
  ::
  
  ::component-prop{name="distortionMode" type="string" default="'swirl'"}
  Type of distortion: 'repel', 'attract', or 'swirl'.
  ::
  
  ::component-prop{name="followSpeed" type="number" default="0.2"}
  Speed at which the effect follows the cursor (0-1).
  ::
  
  ::component-prop{name="sampleAverage" type="boolean" default="true"}
  Whether to average neighboring pixels for smoother results.
  ::
  
  ::component-prop{name="tintColor" type="string" default="'#FFFFFF'"}
  Color to tint the image with. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="tintStrength" type="number" default="0.2"}
  Strength of the tint effect (0-1).
  ::
  
  ::component-prop{name="maxFps" type="number" default="60"}
  Maximum frames per second for animation.
  ::
  
  ::component-prop{name="objectFit" type="string" default="'cover'"}
  How the image should fit within the canvas: 'cover', 'contain', 'fill', or 'none'.
  ::
  
  ::component-prop{name="jitterStrength" type="number" default="4"}
  Strength of the jitter effect.
  ::
  
  ::component-prop{name="jitterSpeed" type="number" default="4"}
  Speed of the jitter effect.
  ::
  
  ::component-prop{name="fadeOnLeave" type="boolean" default="true"}
  Whether the effect should fade out when the cursor leaves.
  ::
  
  ::component-prop{name="fadeSpeed" type="number" default="0.1"}
  Speed of the fade effect (0-1).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.pixelatedCanvas` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

