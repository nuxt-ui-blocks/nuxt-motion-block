---
title: Vortex
description: Animated particle vortex effect with customizable colors, speed, and density.
---

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
      <p class="text-lg text-dimmed">
        Animated particle vortex with customizable parameters
      </p>
    </div>
  </MVortex>
</template>
```
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
  <MVortex class="rounded-xl h-80">
    <div class="text-center space-y-6 p-8">
      <div class="mb-4">
        <div class="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-tornado"
            class="w-8 h-8 text-white"
          />
        </div>
      </div>
      <h2 class="text-3xl font-bold text-white">
        Vortex Effect
      </h2>
      <p class="text-dimmed max-w-md mx-auto">
        Create mesmerizing vortex animations that draw users into your content with dynamic spiral motions
      </p>
      <UButton
        color="neutral"
        variant="solid"
        size="md"
      >
        Experience Vortex
      </UButton>
    </div>
  </MVortex>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="vortex-custom" />
  :::
#code
  <PlaygroundCode name="Vortex" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container element.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes to apply to the outer container.
  ::
  
  ::component-prop{name="particleCount" type="number" default="700"}
  Number of particles in the vortex.
  ::
  
  ::component-prop{name="rangeY" type="number" default="100"}
  Vertical range for particle positioning.
  ::
  
  ::component-prop{name="baseHue" type="number" default="220"}
  Base hue value for particle colors.
  ::
  
  ::component-prop{name="baseSpeed" type="number" default="0.0"}
  Base speed of particle movement.
  ::
  
  ::component-prop{name="rangeSpeed" type="number" default="1.5"}
  Range of speed variation for particles.
  ::
  
  ::component-prop{name="baseRadius" type="number" default="1"}
  Base radius of particle trails.
  ::
  
  ::component-prop{name="rangeRadius" type="number" default="2"}
  Range of radius variation for particles.
  ::
  
  ::component-prop{name="backgroundColor" type="string" default="'#000000'"}
  Background color of the canvas. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.vortex` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative h-full w-full`
  ::
  ::component-slot-row{name="background"}
  `absolute inset-0 z-0 flex h-full w-full items-center justify-center bg-transparent`
  ::
  ::component-slot-row{name="canvas"}
  ::
  ::component-slot-row{name="content"}
  `relative z-10`
  ::
::

