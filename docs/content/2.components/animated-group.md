---
title: Animated Group
description: Animate multiple elements in sequence with staggered delays.
navigation:
  icon: i-lucide-layers
---

# Animated Group

The AnimatedGroup component allows you to animate multiple elements in sequence with staggered delays. It's perfect for creating cascading animations, loading sequences, and other staggered effects.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-group-basic" />
  :::
#code
```vue
<template>
  <MAnimatedGroup 
    :stagger-children="0.1"
    :variants="{
      item: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }
    }"
  >
    <div
      v-for="i in 6"
      :key="i"
      class="h-12 w-12 rounded-lg bg-primary flex items-center justify-center text-white font-bold"
    >
      {{ i }}
    </div>
  </MAnimatedGroup>
</template>
```
::

## Props

::field-group
  ::field{name="as" type="string" default="'div'"}
  HTML element to render as the container.
  ::
  
  ::field{name="asChild" type="string" default="'div'"}
  HTML element to render as each child item.
  ::
  
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="variants" type="object"}
  Animation variants for container and items.
  ::
  
  ::field{name="preset" type="string"}
  Predefined animation presets ('fade', 'slide', 'scale', 'blur', 'blur-slide', 'zoom', 'flip', 'bounce', 'rotate', 'swing').
  ::
  
  ::field{name="initial" type="string" default="'hidden'"}
  Initial animation state.
  ::
  
  ::field{name="animate" type="string" default="'visible'"}
  Target animation state.
  ::
  
  ::field{name="staggerChildren" type="number" default="0.1"}
  Delay between each child animation in seconds.
  ::
  
  ::field{name="staggerDirection" type="number" default="1"}
  Direction of stagger (1 for forward, -1 for reverse).
  ::
::

## Examples

### With Preset Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-group-preset" />
  :::
#code
```vue
<template>
  <MAnimatedGroup 
    preset="bounce"
    :stagger-children="0.05"
  >
    <UBadge 
      v-for="i in 8" 
      :key="i"
      color="primary"
      variant="solid"
      size="lg"
    >
      Item {{ i }}
    </UBadge>
  </MAnimatedGroup>
</template>
```
::

### With Custom Duration

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-group-duration" />
  :::
#code
```vue
<template>
  <MAnimatedGroup 
    :stagger-children="0.15"
    :variants="{
      item: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: 'easeInOut'
          }
        }
      }
    }"
  >
    <div
      v-for="i in 8"
      :key="i"
      class="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold"
    >
      {{ i }}
    </div>
  </MAnimatedGroup>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.animatedGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedGroup` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
