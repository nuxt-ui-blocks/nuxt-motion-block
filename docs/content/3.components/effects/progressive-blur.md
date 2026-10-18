---
title: Progressive Blur
description: Component that creates a progressive blur effect in a specified direction.
---

The ProgressiveBlur component creates a progressive blur effect in a specified direction. It's perfect for creating visually appealing overlays and transitions with smooth gradient blur effects.

## Usage

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
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Progressive Blur
      </h3>
      <p class="text-muted">
        Create depth and focus effects with progressive blur that intensifies towards the edges
      </p>
    </div>

    <div class="relative h-80 rounded-xl overflow-hidden shadow-lg">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        alt="Mountain Landscape"
        class="w-full h-full object-cover"
      >
      <MProgressiveBlur
        class="absolute inset-0"
        :intensity="20"
      />

      <div class="absolute bottom-4 left-4 right-4">
        <div class="bg-black/50 backdrop-blur-sm rounded-lg p-3">
          <h4 class="font-bold text-white">
            Mountain Landscape
          </h4>
          <p class="text-dimmed text-sm">
            Focus effect with progressive blur
          </p>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-sliders"
          class="w-4 h-4 mr-2"
        />
        Adjust Blur
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

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
    >
    <MProgressiveBlur
      :blur-intensity="0.5"
      :blur-layers="12"
      class="absolute inset-0"
    />
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
    <component-example name="progressive-blur-custom" />
  :::
#code
  <PlaygroundCode name="ProgressiveBlur" />
::

## Props

::component-props
  ::component-prop{name="direction" type="'top' | 'right' | 'bottom' | 'left'" default="'bottom'"}
  Direction of the blur effect.
  ::
  
  ::component-prop{name="blurLayers" type="number" default="8"}
  Number of blur layers.
  ::
  
  ::component-prop{name="className" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="blurIntensity" type="number" default="0.25"}
  Intensity of the blur effect.
  ::
  
  ::component-prop{name="animate" type="string | object" default="undefined"}
  Animation configuration.
  ::
  
  ::component-prop{name="variants" type="object" default="undefined"}
  Animation variants.
  ::
  
  ::component-prop{name="transition" type="object" default="undefined"}
  Transition configuration.
  ::
  
  ::component-prop{name="initial" type="string | object" default="undefined"}
  Initial state configuration.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.progressiveBlur` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="layer"}
  `pointer-events-none absolute inset-0 rounded-[inherit]`
  ::
::

