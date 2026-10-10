---
title: Draggable Card
description: Interactive card that can be dragged around with 3D tilt effects.
navigation:
  icon: i-lucide-move-3d
---

# Draggable Card

The DraggableCard component creates an interactive card that can be dragged around with 3D tilt effects. It combines drag functionality with dynamic 3D transformations for a playful, engaging user experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-example" />
  :::
#code
```vue
<template>
  <MDraggableCard>
    <template #header>
      <h3 class="text-lg font-semibold">Draggable Card</h3>
    </template>
    <p>This card can be dragged around the screen.</p>
  </MDraggableCard>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the card content.
  ::
  
  ::field{name="containerClass" type="string" default="''"}
  CSS classes to apply to the card container.
  ::
  
  ::field{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

## Examples

### Basic Draggable Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-basic" />
  :::
#code
```vue
<template>
  <MDraggableCard>
    <template #header>
      <h3 class="text-lg font-semibold">Basic Draggable Card</h3>
    </template>
    <p>Drag me around! I'll snap back to my original position when released.</p>
  </MDraggableCard>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-styled" />
  :::
#code
```vue
<template>
  <MDraggableCard 
    class="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0"
  >
    <template #header>
      <h3 class="text-lg font-semibold">Styled Draggable Card</h3>
    </template>
    <p>This card has custom gradient styling.</p>
  </MDraggableCard>
</template>
```
::

### With Container Class

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-container" />
  :::
#code
```vue
<template>
  <MDraggableCard container-class="mx-auto">
    <template #header>
      <h3 class="text-lg font-semibold">Centered Draggable Card</h3>
    </template>
    <p>This card is centered within its container.</p>
  </MDraggableCard>
</template>
```
::

### With Custom Content

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-content" />
  :::
#code
```vue
<template>
  <MDraggableCard>
    <template #header>
      <div class="flex items-center space-x-2">
        <UIcon name="i-lucide-image" class="w-5 h-5" />
        <h3 class="text-lg font-semibold">Media Card</h3>
      </div>
    </template>
    <div class="space-y-2">
      <img 
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
        alt="Mountain" 
        class="w-full h-32 object-cover rounded"
      />
      <p class="text-gray-600 dark:text-gray-400">Beautiful mountain landscape</p>
    </div>
  </MDraggableCard>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.draggableCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'[perspective:3000px] w-fit h-fit'` |
| `card` | `'w-full h-full'` |
| `cardRoot` | `'relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d'` |
| `cardBody` | `'relative z-10'` |
| `cardHeader` | `'relative z-10'` |
| `cardFooter` | `'relative z-10'` |
| `glare` | `'pointer-events-none absolute inset-0 bg-white select-none z-20'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.draggableCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `[perspective:3000px] w-fit h-fit` |
| `card` | `w-full h-full` |
| `cardRoot` | `relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d` |
| `cardBody` | `relative z-10` |
| `cardHeader` | `relative z-10` |
| `cardFooter` | `relative z-10` |
| `glare` | `pointer-events-none absolute inset-0 bg-white select-none z-20` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.draggableCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `[perspective:3000px] w-fit h-fit` |
| `card` | `w-full h-full` |
| `cardRoot` | `relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d` |
| `cardBody` | `relative z-10` |
| `cardHeader` | `relative z-10` |
| `cardFooter` | `relative z-10` |
| `glare` | `pointer-events-none absolute inset-0 bg-white select-none z-20` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.draggableCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `[perspective:3000px] w-fit h-fit` |
| `card` | `w-full h-full` |
| `cardRoot` | `relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d` |
| `cardBody` | `relative z-10` |
| `cardHeader` | `relative z-10` |
| `cardFooter` | `relative z-10` |
| `glare` | `pointer-events-none absolute inset-0 bg-white select-none z-20` |
