---
title: Background Gradient Animation
description: Animated background with customizable gradient colors and interactive effects.
navigation:
  icon: i-lucide-paintbrush
---

# Background Gradient Animation

The BackgroundGradientAnimation component creates an animated background with customizable gradient colors and interactive effects. It features multiple animated radial gradients that blend together to create a dynamic, visually appealing background.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-gradient-animation-example" />
  :::
#code
```vue
<template>
  <div class="h-96 w-full rounded-lg overflow-hidden relative">
    <MBackgroundGradientAnimation>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <h2 class="text-3xl font-bold mb-4">Gradient Animation</h2>
        <p class="text-lg mb-6 text-center max-w-md">
          Beautiful animated gradient background with interactive effects
        </p>
        <button class="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
          Explore
        </button>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="gradientBackgroundStart" type="string" default="'rgb(108, 0, 162)'"}
  Starting color for the background gradient.
  ::
  
  ::field{name="gradientBackgroundEnd" type="string" default="'rgb(0, 17, 82)'"}
  Ending color for the background gradient.
  ::
  
  ::field{name="firstColor" type="string" default="'18, 113, 255'"}
  First radial gradient color (RGB values).
  ::
  
  ::field{name="secondColor" type="string" default="'221, 74, 255'"}
  Second radial gradient color (RGB values).
  ::
  
  ::field{name="thirdColor" type="string" default="'100, 220, 255'"}
  Third radial gradient color (RGB values).
  ::
  
  ::field{name="fourthColor" type="string" default="'200, 50, 50'"}
  Fourth radial gradient color (RGB values).
  ::
  
  ::field{name="fifthColor" type="string" default="'180, 180, 50'"}
  Fifth radial gradient color (RGB values).
  ::
  
  ::field{name="pointerColor" type="string" default="'140, 100, 255'"}
  Pointer color for interactive effects (RGB values).
  ::
  
  ::field{name="size" type="string" default="'80%'"}
  Size of the radial gradients.
  ::
  
  ::field{name="blendingValue" type="string" default="'hard-light'"}
  Blending mode for the gradients.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the content container.
  ::
  
  ::field{name="interactive" type="boolean" default="true"}
  Enable interactive mouse effects.
  ::
  
  ::field{name="containerClass" type="string" default="''"}
  CSS classes to apply to the container.
  ::
::

## Examples

### Basic Gradient Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-gradient-animation-basic" />
  :::
#code
```vue
<template>
  <div class="h-64 w-full rounded-lg overflow-hidden relative">
    <MBackgroundGradientAnimation>
      <div class="relative z-10 h-full flex items-center justify-center text-white">
        <h3 class="text-xl font-bold">Basic Gradient Animation</h3>
      </div>
    </MBackgroundGradientAnimation>
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
    <component-example name="background-gradient-animation-custom-colors" />
  :::
#code
```vue
<template>
  <div class="h-64 w-full rounded-lg overflow-hidden relative">
    <MBackgroundGradientAnimation
      gradient-background-start="rgb(255, 110, 110)"
      gradient-background-end="rgb(0, 17, 82)"
      first-color="255, 100, 100"
      second-color="100, 255, 200"
      third-color="200, 100, 255"
      :interactive="true"
    >
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white space-y-4">
        <h3 class="text-2xl font-bold">Custom Colors</h3>
        <p class="text-center max-w-md">
          Gradient animation with custom color scheme
        </p>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundGradientAnimation` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `h-full w-full overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]` |
| `content` |  |
| `gradients` | `gradients-container h-full w-full blur-lg` |
| `first` | `${BLOB} [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [transform-origin:center_center] animate-first opacity-100` |
| `second` | `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-400px)] animate-second opacity-100` |
| `third` | `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [transform-origin:calc(50%+400px)] animate-third opacity-100` |
| `fourth` | `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-200px)] animate-fourth opacity-70` |
| `fifth` | `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100` |
| `pointer` | `absolute [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] opacity-70` |
