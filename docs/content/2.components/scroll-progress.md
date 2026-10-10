---
title: Scroll Progress
description: Component that displays a progress bar indicating scroll position.
navigation:
  icon: i-lucide-bar-chart-horizontal
---

# Scroll Progress

The ScrollProgress component displays a progress bar indicating scroll position. It's perfect for creating engaging scroll indicators that help users track their progress through content.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-example" />
  :::
#code
```vue
<template>
  <MScrollProgress class="bg-primary fixed top-0 z-50" />
  <div class="space-y-4 p-4">
    <div v-for="i in 20" :key="i" class="h-32 bg-secondary rounded"></div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="undefined"}
  CSS classes to apply to the progress bar.
  ::
  
  ::field{name="springOptions" type="SpringOptions" default="undefined"}
  Spring animation options.
  ::
  
  ::field{name="containerRef" type="Ref<HTMLElement | null>" default="undefined"}
  Reference to scroll container element.
  ::
::

## Examples

### Basic Scroll Progress

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-basic" />
  :::
#code
```vue
<template>
  <MScrollProgress class="bg-primary fixed top-0 z-50" />
  <div class="space-y-4 p-4">
    <div v-for="i in 10" :key="i" class="h-32 bg-secondary rounded"></div>
  </div>
</template>
```
::

### With Gradient Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-gradient" />
  :::
#code
```vue
<template>
  <MScrollProgress class="bg-gradient-to-r from-purple-500 to-indigo-600" />
  <div class="space-y-4 p-4">
    <div v-for="i in 10" :key="i" class="h-32 bg-tertiary rounded"></div>
  </div>
</template>
```
::

### With Custom Spring Options

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-progress-spring" />
  :::
#code
```vue
<template>
  <MScrollProgress :spring-options="{ stiffness: 100, damping: 30 }" class="bg-gradient-to-r from-emerald-500 to-teal-600" />
  <div class="space-y-4 p-4">
    <div v-for="i in 10" :key="i" class="h-32 bg-primary rounded"></div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollProgress` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inset-x-0 top-0 h-1 origin-left'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.scrollProgress` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inset-x-0 top-0 h-1 origin-left` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.scrollProgress` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inset-x-0 top-0 h-1 origin-left` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollProgress` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inset-x-0 top-0 h-1 origin-left` |
