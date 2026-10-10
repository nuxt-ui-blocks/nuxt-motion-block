---
title: Pixelated Canvas
description: Interactive pixelated image rendering with distortion effects and customizable cell sizes.
navigation:
  icon: i-lucide-grid-3x3
---

# Pixelated Canvas

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
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Pixelated Canvas</h3>
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

## Props

::field-group
  ::field{name="src" type="string" required}
  Source URL of the image to pixelate.
  ::
  
  ::field{name="width" type="number" default="400"}
  Width of the canvas in pixels.
  ::
  
  ::field{name="height" type="number" default="500"}
  Height of the canvas in pixels.
  ::
  
  ::field{name="cellSize" type="number" default="3"}
  Size of each pixelated cell in pixels.
  ::
  
  ::field{name="dotScale" type="number" default="0.9"}
  Scale factor for the dots within cells (0-1).
  ::
  
  ::field{name="shape" type="string" default="'square'"}
  Shape of the pixels: 'circle' or 'square'.
  ::
  
  ::field{name="backgroundColor" type="string" default="'#000000'"}
  Background color of the canvas.
  ::
  
  ::field{name="grayscale" type="boolean" default="false"}
  Whether to render the image in grayscale.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the canvas element.
  ::
  
  ::field{name="responsive" type="boolean" default="false"}
  Whether the canvas should resize with its container.
  ::
  
  ::field{name="dropoutStrength" type="number" default="0.4"}
  Strength of edge dropout effect (0-1).
  ::
  
  ::field{name="interactive" type="boolean" default="true"}
  Whether the canvas should respond to mouse interactions.
  ::
  
  ::field{name="distortionStrength" type="number" default="3"}
  Strength of the distortion effect.
  ::
  
  ::field{name="distortionRadius" type="number" default="80"}
  Radius of the distortion effect in pixels.
  ::
  
  ::field{name="distortionMode" type="string" default="'swirl'"}
  Type of distortion: 'repel', 'attract', or 'swirl'.
  ::
  
  ::field{name="followSpeed" type="number" default="0.2"}
  Speed at which the effect follows the cursor (0-1).
  ::
  
  ::field{name="sampleAverage" type="boolean" default="true"}
  Whether to average neighboring pixels for smoother results.
  ::
  
  ::field{name="tintColor" type="string" default="'#FFFFFF'"}
  Color to tint the image with.
  ::
  
  ::field{name="tintStrength" type="number" default="0.2"}
  Strength of the tint effect (0-1).
  ::
  
  ::field{name="maxFps" type="number" default="60"}
  Maximum frames per second for animation.
  ::
  
  ::field{name="objectFit" type="string" default="'cover'"}
  How the image should fit within the canvas: 'cover', 'contain', 'fill', or 'none'.
  ::
  
  ::field{name="jitterStrength" type="number" default="4"}
  Strength of the jitter effect.
  ::
  
  ::field{name="jitterSpeed" type="number" default="4"}
  Speed of the jitter effect.
  ::
  
  ::field{name="fadeOnLeave" type="boolean" default="true"}
  Whether the effect should fade out when the cursor leaves.
  ::
  
  ::field{name="fadeSpeed" type="number" default="0.1"}
  Speed of the fade effect (0-1).
  ::
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
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Basic Pixelated Canvas</h3>
    <MPixelatedCanvas
      src="https://picsum.photos/300/200"
      :width="300"
      :height="200"
      :cell-size="4"
      class="rounded-lg"
    />
  </div>
</template>
```
::

### Interactive Pixelated Canvas

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="pixelated-canvas-interactive" />
  :::
#code
```vue
<template>
  <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-gray-900 dark:text-white">Interactive Pixelated Canvas</h3>
    <MPixelatedCanvas
      src="https://picsum.photos/400/300?random=1"
      :width="400"
      :height="300"
      :cell-size="6"
      :distortion-strength="5"
      :distortion-radius="100"
      distortion-mode="swirl"
      :jitter-strength="3"
      class="rounded-lg border border-gray-200 dark:border-gray-700"
    />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.pixelatedCanvas` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.pixelatedCanvas` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.pixelatedCanvas` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.pixelatedCanvas` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
