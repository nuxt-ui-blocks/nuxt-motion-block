---
title: Lamp Container
description: Animated lamp effect container with customizable gradient colors and lighting effects.
navigation:
  icon: i-lucide-lamp
---

# Lamp Container

The LampContainer component creates an animated lamp effect with gradient lighting, glow effects, and customizable colors. It's perfect for creating eye-catching hero sections and visual dividers.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="lamp-container-example" />
  :::
#code
```vue
<template>
  <MLampContainer>
    <motion.h1
      :initial="{ opacity: 0.5, y: 100 }"
      :while-in-view="{ opacity: 1, y: 0 }"
      :transition="{
        delay: 0.3,
        duration: 0.8,
        ease: 'easeInOut',
      }"
      class="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
    >
      Build lamps <br> the right way
    </motion.h1>
  </MLampContainer>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::field{name="fromColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Starting color for the left gradient.
  ::
  
  ::field{name="toColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Ending color for the right gradient.
  ::
  
  ::field{name="centerColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Color for the center glow effect.
  ::
  
  ::field{name="glowColor" type="string" default="'var(--color-primary-400, #38bdf8)'"}
  Color for the glow effect.
  ::
  
  ::field{name="lineColor" type="string" default="'var(--color-primary-400, #38bdf8)'"}
  Color for the line effect.
  ::
::

## Examples

### Basic Lamp Container

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="lamp-container-basic" />
  :::
#code
```vue
<template>
  <MLampContainer>
    <div class="text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Lamp Container</h2>
      <p class="text-gray-300">Basic lamp effect with default colors</p>
    </div>
  </MLampContainer>
</template>
```
::

### Custom Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="lamp-container-custom" />
  :::
#code
```vue
<template>
  <MLampContainer
    from-color="var(--color-purple-500)"
    to-color="var(--color-pink-500)"
    center-color="var(--color-purple-400)"
    glow-color="var(--color-pink-400)"
    line-color="var(--color-purple-300)"
  >
    <div class="text-center">
      <h2 class="text-3xl font-bold text-white mb-4">Custom Lamp</h2>
      <p class="text-gray-300">Lamp effect with custom purple/pink colors</p>
    </div>
  </MLampContainer>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.lampContainer` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-default w-full rounded-md z-0` |
| `inner` | `relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0` |
| `leftGradient` | `absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-highlighted [--conic-position:from_70deg_at_center_top]` |
| `leftMaskTop` | `absolute w-[100%] left-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]` |
| `leftMaskSide` | `absolute w-40 h-[100%] left-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]` |
| `rightGradient` | `absolute inset-auto left-1/2 h-56 w-[30rem] text-highlighted [--conic-position:from_290deg_at_center_top]` |
| `rightMaskSide` | `absolute w-40 h-[100%] right-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]` |
| `rightMaskTop` | `absolute w-[100%] right-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]` |
| `bgBlur` | `absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-default blur-2xl` |
| `bgOverlay` | `absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md` |
| `centerGlow` | `absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl` |
| `glow` | `absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl` |
| `line` | `absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]` |
| `cover` | `absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-default` |
| `content` | `relative z-50 flex -translate-y-80 flex-col items-center px-5` |
