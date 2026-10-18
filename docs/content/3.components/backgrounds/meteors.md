---
title: Meteors
description: Animated meteor shower effect with customizable density and timing.
---

The Meteors component creates an animated meteor shower effect with customizable density and timing. It's perfect for adding dynamic background animations to your UI.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="meteors-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors :count="30" />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-4">
      <h3 class="text-2xl font-bold text-white mb-2">
        Meteor Shower
      </h3>
      <p class="text-dimmed">
        Animated meteor shower effect
      </p>
    </div>
  </div>
</template>
```
::

## Examples

### Basic Meteor Shower

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="meteors-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-gradient-to-br from-gray-900 to-black">
    <MMeteors />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sparkles"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        Meteor Shower
      </h2>
      <p class="text-dimmed max-w-md mb-8 text-lg">
        Create stunning meteor effects that streak across your interface for a cosmic user experience
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Launch Experience
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          View Demo
        </UButton>
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
    <component-example name="meteors-custom" />
  :::
#code
  <PlaygroundCode name="Meteors" />
::

## Props

::component-props
  ::component-prop{name="count" type="number" default="10"}
  Number of meteors to display in the shower.
  ::

  ::component-prop{name="speed" type="number" default="1"}
  Multiplier for the fall speed. Higher values make the meteors fall faster, `2` is twice as fast.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container. The container fills its parent, so give the parent a height.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.meteors` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="meteor"}
  `meteor`
  ::
::

