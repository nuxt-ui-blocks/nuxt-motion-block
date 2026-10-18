---
title: Collision
description: Collision detection system with animated beams and explosion effects.
navigation:
  icon: i-lucide-zap
---

# Collision

The Collision component system creates animated beams that travel across the screen and explode when they collide with a target element. It features realistic physics-based animations, customizable colors, and smooth transitions.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-example" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams class="h-64 w-full rounded-lg overflow-hidden">
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">Target Area</h3>
        <p class="text-gray-600 dark:text-gray-400">Beams will collide here</p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

## Props

### MCollisionBackgroundBeams Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="beams" type="BeamOptions[]" default="7 beams with default settings"}
  Array of beam configuration objects.
  ::
::

### BeamOptions

::field-group
  ::field{name="initialX" type="number"}
  Initial X position of the beam.
  ::
  
  ::field{name="translateX" type="number"}
  X translation distance for the beam animation.
  ::
  
  ::field{name="initialY" type="number"}
  Initial Y position of the beam.
  ::
  
  ::field{name="translateY" type="number"}
  Y translation distance for the beam animation.
  ::
  
  ::field{name="rotate" type="number"}
  Rotation angle of the beam in degrees.
  ::
  
  ::field{name="className" type="string"}
  Additional CSS classes to apply to the beam.
  ::
  
  ::field{name="duration" type="number"}
  Duration of the beam animation in seconds.
  ::
  
  ::field{name="delay" type="number"}
  Delay before starting the beam animation in seconds.
  ::
  
  ::field{name="repeatDelay" type="number"}
  Delay between animation repeats in seconds.
  ::
  
  ::field{name="fromColor" type="string" default="'from-indigo-500'"}
  Starting color of the beam gradient.
  ::
  
  ::field{name="viaColor" type="string" default="'via-purple-500'"}
  Middle color of the beam gradient.
  ::
  
  ::field{name="toColor" type="string" default="'to-transparent'"}
  Ending color of the beam gradient.
  ::
::

## Examples

### Basic Collision Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-basic" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams class="h-96 w-full rounded-xl overflow-hidden">
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-xl text-center max-w-md mx-4">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-lucide-zap" class="w-10 h-10 text-white" />
        </div>
        <h3 class="font-bold text-3xl mb-4 text-gray-900 dark:text-white">Collision Effect</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-8">
          Experience dynamic beam collisions that create stunning visual interactions as they intersect
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton color="primary" variant="solid" size="lg">Watch Beams Collide</UButton>
          <UButton color="neutral" variant="outline" size="lg">Learn More</UButton>
        </div>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
::

### Custom Beam Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-custom-colors" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams 
    :beams="[
      { 
        initialX: 100, 
        translateX: 100, 
        duration: 5, 
        fromColor: 'from-red-500', 
        viaColor: 'via-orange-500', 
        toColor: 'to-transparent' 
      },
      { 
        initialX: 300, 
        translateX: 300, 
        duration: 7, 
        fromColor: 'from-blue-500', 
        viaColor: 'via-cyan-500', 
        toColor: 'to-transparent' 
      },
      { 
        initialX: 500, 
        translateX: 500, 
        duration: 4, 
        fromColor: 'from-green-500', 
        viaColor: 'via-emerald-500', 
        toColor: 'to-transparent' 
      }
    ]" 
    class="h-64 w-full rounded-lg overflow-hidden"
  >
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">Custom Colors</h3>
        <p class="text-gray-600 dark:text-gray-400">Beams with custom gradients</p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

### Custom Beam Configuration

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-custom-config" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams 
    :beams="[
      { 
        initialX: 150, 
        translateX: 150, 
        duration: 3, 
        delay: 1, 
        repeatDelay: 2 
      },
      { 
        initialX: 400, 
        translateX: 400, 
        duration: 6, 
        delay: 2, 
        repeatDelay: 4, 
        className: 'h-8' 
      },
      { 
        initialX: 650, 
        translateX: 650, 
        duration: 4, 
        delay: 0, 
        repeatDelay: 3, 
        rotate: 15 
      }
    ]" 
    class="h-64 w-full rounded-lg overflow-hidden"
  >
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-white dark:bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">Custom Timing</h3>
        <p class="text-gray-600 dark:text-gray-400">Beams with custom timing and rotation</p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

### Dark Theme Collision

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-dark-theme" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams class="h-64 w-full rounded-lg overflow-hidden bg-gradient-to-b from-neutral-900 to-neutral-950">
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-neutral-800 p-6 rounded-lg shadow-lg text-center border border-neutral-700">
        <h3 class="font-bold text-lg mb-2 text-white">Dark Theme</h3>
        <p class="text-gray-400">Collision system in dark mode</p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

### Multiple Targets

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="collision-multiple-targets" />
  :::
#code
```vue
<template>
  <MCollisionBackgroundBeams class="h-64 w-full rounded-lg overflow-hidden">
    <div class="relative z-10 flex items-center justify-between h-full px-8">
      <div class="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-sm mb-1">Target 1</h3>
      </div>
      <div class="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-sm mb-1">Target 2</h3>
      </div>
      <div class="bg-white dark:bg-neutral-900 p-4 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-sm mb-1">Target 3</h3>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::
