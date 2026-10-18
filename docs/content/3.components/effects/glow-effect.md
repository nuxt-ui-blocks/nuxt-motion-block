---
title: Glow Effect
description: Component that adds a dynamic glow effect with customizable colors and animations.
---

The GlowEffect component adds a dynamic glow effect with customizable colors and animations. It's perfect for creating eye-catching elements with vibrant, animated glows.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-example" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center p-8">
    <div class="relative">
      <MGlowEffect />
      <div class="relative z-10 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-xl">
        <h3 class="text-2xl font-bold text-white mb-3">
          Glow Effect
        </h3>
        <p class="text-primary mb-4">
          This element has a beautiful glow effect
        </p>
        <UButton
          variant="solid"
          size="sm"
          class="bg-default text-primary hover:bg-muted"
        >
          Get Started
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### All Animation Modes

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glow-effect-modes" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
    <!-- Rotate Mode -->
    <div class="relative">
      <MGlowEffect
        mode="rotate"
        :colors="['#FF5733', '#33FF57', '#3357FF']"
        blur="medium"
        :scale="1.1"
        :duration="4"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Rotate Mode
        </h3>
        <p class="text-muted">
          Conic gradient that rotates continuously
        </p>
      </div>
    </div>

    <!-- Pulse Mode -->
    <div class="relative">
      <MGlowEffect
        mode="pulse"
        :colors="['#EC4899']"
        blur="strong"
        :scale="1.1"
        :duration="2"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-pink-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Pulse Mode
        </h3>
        <p class="text-muted">
          Pulsing radial gradient with scale animation
        </p>
      </div>
    </div>

    <!-- Breathe Mode -->
    <div class="relative">
      <MGlowEffect
        mode="breathe"
        :colors="['#10B981']"
        blur="medium"
        :scale="1.05"
        :duration="3"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-emerald-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Breathe Mode
        </h3>
        <p class="text-muted">
          Subtle breathing effect with gentle scale changes
        </p>
      </div>
    </div>

    <!-- Color Shift Mode -->
    <div class="relative">
      <MGlowEffect
        mode="colorShift"
        :colors="['#8B5CF6', '#A855F7', '#C084FC']"
        blur="medium"
        :scale="1.05"
        :duration="5"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-purple-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Color Shift
        </h3>
        <p class="text-muted">
          Smooth transitions between multiple colors
        </p>
      </div>
    </div>

    <!-- Flow Horizontal Mode -->
    <div class="relative">
      <MGlowEffect
        mode="flowHorizontal"
        :colors="['#0EA5E9', '#06B6D4']"
        blur="medium"
        :scale="1.05"
        :duration="4"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-cyan-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Flow Horizontal
        </h3>
        <p class="text-muted">
          Horizontal linear gradient flow animation
        </p>
      </div>
    </div>

    <!-- Static Mode -->
    <div class="relative">
      <MGlowEffect
        mode="static"
        :colors="['#F59E0B', '#F97316']"
        blur="medium"
        :scale="1.05"
      />
      <div class="relative z-10 p-6 bg-default rounded-xl shadow-lg border border-default h-full">
        <div class="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg mb-4" />
        <h3 class="text-xl font-bold text-highlighted mb-2">
          Static Mode
        </h3>
        <p class="text-muted">
          Fixed gradient without animation
        </p>
      </div>
    </div>
  </div>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glow-effect-custom" />
  :::
#code
  <PlaygroundCode name="GlowEffect" />
::

## Animation Modes

The GlowEffect component supports several animation modes:

- **rotate**: Creates a rotating conic gradient effect
- **pulse**: Pulsing radial gradient with scale and opacity changes
- **breathe**: Subtle breathing effect with slight scale changes
- **colorShift**: Smooth transitions between colors in a conic gradient
- **flowHorizontal**: Horizontal linear gradient flow
- **static**: Fixed gradient without animation

## Blur Intensities

Choose from predefined blur intensities or specify a custom pixel value:

- **softest**: `blur-xs`
- **soft**: `blur-sm`
- **medium**: `blur-md`
- **strong**: `blur-lg`
- **stronger**: `blur-xl`
- **strongest**: `blur-2xl`
- **none**: `blur-none`
- **Custom**: Any numeric value (e.g., `:blur="10"` for 10px blur)

## Props

::component-props
  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the glow element.
  ::
  
  ::component-prop{name="style" type="Object" default="undefined"}
  Custom styles to apply to the glow element.
  ::
  
  ::component-prop{name="colors" type="string[]" default="['#FF5733', '#33FF57', '#3357FF', '#F1C40F']"}
  Colors for the glow effect. Each value accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="mode" type="| 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static'" default="'rotate'"}
  Animation mode for the glow effect.
  ::
  
  ::component-prop{name="blur" type="| 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none'" default="'medium'"}
  Blur intensity of the glow effect.
  ::
  
  ::component-prop{name="scale" type="number" default="1"}
  Scale factor for the glow effect.
  ::
  
  ::component-prop{name="duration" type="number" default="5"}
  Animation duration in seconds.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowEffect` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none absolute inset-0 h-full w-full transform-gpu`
  ::
::

