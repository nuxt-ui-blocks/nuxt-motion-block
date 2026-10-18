---
title: Collision
description: Collision detection system with animated beams and explosion effects.
---

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
      <div class="bg-default p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">
          Target Area
        </h3>
        <p class="text-muted">
          Beams will collide here
        </p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

## Examples

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
        repeatDelay: 2,
      },
      {
        initialX: 400,
        translateX: 400,
        duration: 6,
        delay: 2,
        repeatDelay: 4,
        className: 'h-8',
      },
      {
        initialX: 650,
        translateX: 650,
        duration: 4,
        delay: 0,
        repeatDelay: 3,
        rotate: 15,
      },
    ]"
    class="h-64 w-full rounded-lg overflow-hidden"
  >
    <div class="relative z-10 flex items-center justify-center h-full">
      <div class="bg-default p-6 rounded-lg shadow-lg text-center">
        <h3 class="font-bold text-lg mb-2">
          Custom Timing
        </h3>
        <p class="text-muted">
          Beams with custom timing and rotation
        </p>
      </div>
    </div>
  </MCollisionBackgroundBeams>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="collision-custom" />
  :::
#code
  <PlaygroundCode name="CollisionBackgroundBeams" />
::
## Props

### MCollisionBackgroundBeams Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="beams" type="BeamOptions[]" default="7 beams with default settings"}
  Array of beam configuration objects.
  ::
::

### BeamOptions

::component-props
  ::component-prop{name="initialX" type="number"}
  Initial X position of the beam.
  ::
  
  ::component-prop{name="translateX" type="number"}
  X translation distance for the beam animation.
  ::
  
  ::component-prop{name="initialY" type="number"}
  Initial Y position of the beam.
  ::
  
  ::component-prop{name="translateY" type="number"}
  Y translation distance for the beam animation.
  ::
  
  ::component-prop{name="rotate" type="number"}
  Rotation angle of the beam in degrees.
  ::
  
  ::component-prop{name="className" type="string"}
  Additional CSS classes to apply to the beam.
  ::
  
  ::component-prop{name="duration" type="number"}
  Duration of the beam animation in seconds.
  ::
  
  ::component-prop{name="delay" type="number"}
  Delay before starting the beam animation in seconds.
  ::
  
  ::component-prop{name="repeatDelay" type="number"}
  Delay between animation repeats in seconds.
  ::
  
  ::component-prop{name="fromColor" type="string" default="'from-indigo-500'"}
  Starting color of the beam gradient.
  ::
  
  ::component-prop{name="viaColor" type="string" default="'via-purple-500'"}
  Middle color of the beam gradient.
  ::
  
  ::component-prop{name="toColor" type="string" default="'to-transparent'"}
  Ending color of the beam gradient.
  ::
::

