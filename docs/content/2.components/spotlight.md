---
title: Spotlight
description: Component that creates a spotlight effect following the cursor.
navigation:
  icon: i-lucide-sun
---

# Spotlight

The Spotlight component creates a spotlight effect following the cursor. It's perfect for creating engaging hover effects and interactive elements that respond to cursor movement.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spotlight-example" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight class="bg-gradient-to-br from-emerald-500 to-teal-600" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold text-white">Spotlight Effect</h3>
    </div>
  </div>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="'bg-primary-300/20 dark:bg-primary-600/20'"}
  CSS classes to apply to the spotlight element.
  ::
  
  ::field{name="size" type="number" default="200"}
  Size of the spotlight in pixels.
  ::
  
  ::field{name="springOptions" type="SpringOptions" default="{ bounce: 0 }"}
  Spring animation options.
  ::
::

## Examples

### Basic Spotlight

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spotlight-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold">Basic Spotlight</h3>
    </div>
  </div>
</template>
```
::

### With Custom Gradient

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spotlight-gradient" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight class="bg-gradient-to-br from-emerald-500 to-teal-600" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold text-white">Gradient Spotlight</h3>
    </div>
  </div>
</template>
```
::

### With Custom Size

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spotlight-size" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight :size="300" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold">Large Spotlight</h3>
    </div>
  </div>
</template>
```
::

### With Custom Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="spotlight-styled" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight class="bg-rose-500/30" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold text-rose-600">Styled Spotlight</h3>
    </div>
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
    <component-example name="spotlight-spring" />
  :::
#code
```vue
<template>
  <div class="relative h-64 bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
    <MSpotlight :spring-options="{ bounce: 0.5, stiffness: 300 }" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold">Bouncy Spotlight</h3>
    </div>
  </div>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spotlight` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.spotlight` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.spotlight` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spotlight` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200` |
