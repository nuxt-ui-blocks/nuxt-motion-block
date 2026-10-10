---
title: In View
description: Component that triggers animations when it comes into view.
navigation:
  icon: i-lucide-eye
---

# In View

The InView component triggers animations when it comes into view. It uses the Intersection Observer API to detect when an element enters or leaves the viewport, allowing you to create engaging scroll-based animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-with-custom-animation" />
  :::
#code
```vue
<template>
  <MInView>
    <div class="p-6 bg-primary rounded-lg">
      <h3 class="text-xl font-bold mb-2">In View Component</h3>
      <p class="text-gray-600 dark:text-gray-400">This content is animated when it comes into view.</p>
    </div>
  </MInView>
</template>
```
::

## Props

::field-group
  ::field{name="threshold" type="number" default="0.1"}
  Visibility threshold (0-1).
  ::
  
  ::field{name="once" type="boolean" default="true"}
  Trigger only once.
  ::
  
  ::field{name="rootMargin" type="string" default="'0px'"}
  Root margin for intersection.
  ::
  
  ::field{name="delay" type="number" default="0"}
  Delay before triggering.
  ::
::

## Events

::field-group
  ::field{name="inView" type="(inView: boolean) => void"}
  Emitted when visibility changes.
  ::
::

## Slots

::field-group
  ::field{name="default" type="{ inView: boolean }"}
  Default slot with visibility state.
  ::
::

## Examples

### Basic In View

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-basic" />
  :::
#code
```vue
<template>
  <MInView>
    <div class="p-4 bg-secondary rounded">
      <p>This content fades in when it comes into view.</p>
    </div>
  </MInView>
</template>
```
::

### With Custom Threshold

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-threshold" />
  :::
#code
```vue
<template>
  <MInView :threshold="0.5">
    <div class="p-4 bg-tertiary rounded">
      <p>This content triggers when 50% is in view.</p>
    </div>
  </MInView>
</template>
```
::

### With Repeat Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-repeat" />
  :::
#code
```vue
<template>
  <MInView :once="false">
    <div class="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded">
      <p>This content animates every time it comes into view.</p>
    </div>
  </MInView>
</template>
```
::

### With Custom Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="in-view-custom" />
  :::
#code
```vue
<template>
  <MInView 
    :transition="{ duration: 0.8, ease: 'easeInOut' }"
    :variants="{
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 }
    }"
  >
    <div class="p-4 bg-primary rounded">
      <p>This content has a custom animation.</p>
    </div>
  </MInView>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.inView` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.inView` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.inView` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.inView` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
