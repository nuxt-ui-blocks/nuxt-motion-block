---
title: Vortex
description: Animated particle vortex effect with customizable colors, speed, and density.
navigation:
  icon: i-lucide-tornado
---

# Vortex

The Vortex component creates an animated particle vortex effect using canvas-based rendering. It features customizable particle count, colors, speed, and radius with smooth animations and glow effects.

::warning
This component requires the `simplex-noise` package to be installed in your project.
::

::code-group

```bash [pnpm]
pnpm add simplex-noise
```

```bash [yarn]
yarn add simplex-noise
```

```bash [npm]
npm install simplex-noise
```

```bash [bun]
bun add simplex-noise
```

::


## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="vortex-example" />
  :::
#code
```vue
<template>
  <MVortex
    :particle-count="1000"
    :base-hue="200"
    :base-speed="0.1"
    :range-speed="2.0"
    :base-radius="1"
    :range-radius="3"
    background-color="transparent"
    class="rounded-xl h-64"
  >
    <div class="text-center space-y-4">
      <h2 class="text-3xl font-bold text-white">
        Vortex Effect
      </h2>
      <p class="text-lg text-gray-300">
        Animated particle vortex with customizable parameters
      </p>
    </div>
  </MVortex>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container element.
  ::
  
  ::field{name="containerClass" type="string" default="''"}
  CSS classes to apply to the outer container.
  ::
  
  ::field{name="particleCount" type="number" default="700"}
  Number of particles in the vortex.
  ::
  
  ::field{name="rangeY" type="number" default="100"}
  Vertical range for particle positioning.
  ::
  
  ::field{name="baseHue" type="number" default="220"}
  Base hue value for particle colors.
  ::
  
  ::field{name="baseSpeed" type="number" default="0.0"}
  Base speed of particle movement.
  ::
  
  ::field{name="rangeSpeed" type="number" default="1.5"}
  Range of speed variation for particles.
  ::
  
  ::field{name="baseRadius" type="number" default="1"}
  Base radius of particle trails.
  ::
  
  ::field{name="rangeRadius" type="number" default="2"}
  Range of radius variation for particles.
  ::
  
  ::field{name="backgroundColor" type="string" default="'#000000'"}
  Background color of the canvas.
  ::
::

## Examples

### Basic Vortex

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="vortex-basic" />
  :::
#code
```vue
<template>
  <MVortex class="rounded-xl h-64">
    <div class="text-center space-y-4">
      <h2 class="text-2xl font-bold text-white">
        Basic Vortex
      </h2>
      <p class="text-gray-300">
        Default vortex effect
      </p>
    </div>
  </MVortex>
</template>
```
::

### Custom Vortex

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="vortex-custom" />
  :::
#code
```vue
<template>
  <MVortex
    :particle-count="500"
    :base-hue="300"
    :base-speed="0.5"
    :range-speed="1.0"
    :base-radius="2"
    :range-radius="4"
    background-color="transparent"
    class="rounded-xl h-64"
  >
    <div class="text-center space-y-4">
      <h2 class="text-2xl font-bold text-white">
        Purple Vortex
      </h2>
      <p class="text-gray-300">
        Custom purple color scheme
      </p>
    </div>
  </MVortex>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.vortex` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'relative h-full w-full'` |
| `background` | `'absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent'` |
| `canvas` | `''` |
| `content` | `'relative z-10'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.vortex` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full` |
| `background` | `absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent` |
| `canvas` |  |
| `content` | `relative z-10` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.vortex` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full` |
| `background` | `absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent` |
| `canvas` |  |
| `content` | `relative z-10` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.vortex` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative h-full w-full` |
| `background` | `absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent` |
| `canvas` |  |
| `content` | `relative z-10` |
