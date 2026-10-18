---
title: Lamp Container
description: Animated lamp effect container with customizable gradient colors and lighting effects.
---

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
    <Motion
      as="h1"
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
    </Motion>
  </MLampContainer>
</template>

<script setup>
import { Motion } from 'motion-v'
</script>
```
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
  <MLampContainer class="rounded-xl overflow-hidden">
    <div class="text-center max-w-3xl mx-auto p-10">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sun"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h2 class="text-4xl font-bold text-white mb-6">
        Lamp Effect
      </h2>
      <p class="text-dimmed text-lg mb-8 max-w-2xl mx-auto">
        Create dramatic lighting effects with our lamp container that adds depth and atmosphere to your content
      </p>
      <div class="flex flex-wrap justify-center gap-5">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Get Started
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          size="lg"
        >
          Learn More
        </UButton>
      </div>
    </div>
  </MLampContainer>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="lamp-container-custom" />
  :::
#code
  <PlaygroundCode name="LampContainer" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="fromColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Starting color for the left gradient.
  ::
  
  ::component-prop{name="toColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Ending color for the right gradient.
  ::
  
  ::component-prop{name="centerColor" type="string" default="'var(--color-primary-500, #0ea5e9)'"}
  Color for the center glow effect.
  ::
  
  ::component-prop{name="glowColor" type="string" default="'var(--color-primary-400, #38bdf8)'"}
  Color for the glow effect.
  ::
  
  ::component-prop{name="lineColor" type="string" default="'var(--color-primary-400, #38bdf8)'"}
  Color for the line effect.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.lampContainer` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-default w-full rounded-md z-0`
  ::
  ::component-slot-row{name="inner"}
  `relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0`
  ::
  ::component-slot-row{name="leftGradient"}
  `absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] text-highlighted [--conic-position:from_70deg_at_center_top]`
  ::
  ::component-slot-row{name="leftMaskTop"}
  `absolute w-[100%] left-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]`
  ::
  ::component-slot-row{name="leftMaskSide"}
  `absolute w-40 h-[100%] left-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]`
  ::
  ::component-slot-row{name="rightGradient"}
  `absolute inset-auto left-1/2 h-56 w-[30rem] text-highlighted [--conic-position:from_290deg_at_center_top]`
  ::
  ::component-slot-row{name="rightMaskSide"}
  `absolute w-40 h-[100%] right-0 bg-default bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]`
  ::
  ::component-slot-row{name="rightMaskTop"}
  `absolute w-[100%] right-0 bg-default h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]`
  ::
  ::component-slot-row{name="bgBlur"}
  `absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-default blur-2xl`
  ::
  ::component-slot-row{name="bgOverlay"}
  `absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md`
  ::
  ::component-slot-row{name="centerGlow"}
  `absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl`
  ::
  ::component-slot-row{name="glow"}
  `absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full blur-2xl`
  ::
  ::component-slot-row{name="line"}
  `absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem]`
  ::
  ::component-slot-row{name="cover"}
  `absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-default`
  ::
  ::component-slot-row{name="content"}
  `relative z-50 flex -translate-y-80 flex-col items-center px-5`
  ::
::

