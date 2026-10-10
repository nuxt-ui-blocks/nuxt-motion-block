---
title: Background Beams
description: Animated SVG background with customizable beam paths and gradient colors.
navigation:
  icon: i-lucide-sun
---

# Background Beams

The BackgroundBeams component creates an animated SVG background with customizable beam paths and gradient colors. It's perfect for creating dynamic background effects with smooth animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-beams-example" />
  :::
#code
```vue
<template>
  <UCard class="relative overflow-hidden">
    <template #header>
      <h2 class="text-xl font-semibold">
        Background Beams
      </h2>
    </template>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Animated background beams effect
    </p>
    <MBackgroundBeams
      class="h-64 w-full"
      :num-paths="25"
      :stroke-opacity="1"
    />
  </UCard>
</template>
```
::

## Props

::field-group
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="gradientColors" type="string[]" default="['#18CCFC', '#18CCFC', '#6344F5', '#AE48FF']"}
  Array of gradient colors for the beams.
  ::
  
  ::field{name="strokeOpacity" type="number" default="0.4"}
  Opacity of the beam strokes (0-1).
  ::
  
  ::field{name="numPaths" type="number" default="50"}
  Number of beam paths to display.
  ::
  
  ::field{name="duration" type="array" default="[10, 20]"}
  Min and max duration for animations.
  ::
::

## Examples

### Basic Background Beams

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-beams-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBackgroundBeams
      class="h-full w-full"
      :num-paths="15"
      :stroke-opacity="0.7"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Basic Background Beams</h3>
    </div>
  </div>
</template>
```
::

### Custom Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-beams-custom" />
  :::
#code
```vue
<template>
  <div class="relative h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
    <MBackgroundBeams
      class="h-full w-full"
      :num-paths="35"
      :stroke-opacity="0.9"
      :gradient-colors="['#ff0000', '#ff0000', '#00ff00', '#0000ff']"
    />
    <div class="relative z-10 h-full flex items-center justify-center">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white">Custom Background Beams</h3>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundBeams` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]'` |
| `svg` | `'pointer-events-none absolute z-0 h-full w-full'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundBeams` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]` |
| `svg` | `pointer-events-none absolute z-0 h-full w-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.backgroundBeams` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]` |
| `svg` | `pointer-events-none absolute z-0 h-full w-full` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundBeams` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `absolute inset-0 flex h-full w-full items-center justify-center [mask-repeat:no-repeat] [mask-size:40px]` |
| `svg` | `pointer-events-none absolute z-0 h-full w-full` |
