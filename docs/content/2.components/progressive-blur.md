---
title: Progressive Blur
description: Component that creates a progressive blur effect in a specified direction.
navigation:
  icon: i-lucide-triangle-dashed
---

# Progressive Blur

The ProgressiveBlur component creates a progressive blur effect in a specified direction. It's perfect for creating visually appealing overlays and transitions with smooth gradient blur effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Mountain" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur class="absolute inset-0" />
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="direction" type="'top' | 'right' | 'bottom' | 'left'" default="'bottom'"}
  Direction of the blur effect.
  ::
  
  ::field{name="blurLayers" type="number" default="8"}
  Number of blur layers.
  ::
  
  ::field{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="blurIntensity" type="number" default="0.25"}
  Intensity of the blur effect.
  ::
  
  ::field{name="animate" type="string | object" default="undefined"}
  Animation configuration.
  ::
  
  ::field{name="variants" type="object" default="undefined"}
  Animation variants.
  ::
  
  ::field{name="transition" type="object" default="undefined"}
  Transition configuration.
  ::
  
  ::field{name="initial" type="string | object" default="undefined"}
  Initial state configuration.
  ::
::

## Examples

### Basic Progressive Blur

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Mountain" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur class="absolute inset-0" />
  </div>
</template>
```
::

### Top Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-top" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Ocean" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur direction="top" class="absolute inset-0" />
  </div>
</template>
```
::

### Right Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-right" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Forest" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur direction="right" class="absolute inset-0" />
  </div>
</template>
```
::

### Bottom Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-bottom" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="City" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur direction="bottom" class="absolute inset-0" />
  </div>
</template>
```
::

### Left Direction

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-left" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Nature" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur direction="left" class="absolute inset-0" />
  </div>
</template>
```
::

### With Custom Intensity

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="progressive-blur-intensity" />
  :::
#code
```vue
<template>
  <div class="relative h-64">
    <img 
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
      alt="Beach" 
      class="w-full h-full object-cover"
    />
    <MProgressiveBlur :blur-intensity="0.5" :blur-layers="12" class="absolute inset-0" />
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.progressiveBlur` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `layer` | `pointer-events-none absolute inset-0 rounded-[inherit]` |
