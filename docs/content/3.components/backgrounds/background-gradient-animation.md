---
title: Background Gradient Animation
description: Animated background with customizable gradient colors and interactive effects.
---

The BackgroundGradientAnimation component creates an animated background with customizable gradient colors and interactive effects. It features multiple animated radial gradients that blend together to create a dynamic, visually appealing background.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-gradient-animation-example" />
  :::
#code
```vue
<template>
  <div class="h-96 w-full rounded-lg overflow-hidden relative">
    <MBackgroundGradientAnimation>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-white">
        <h2 class="text-3xl font-bold mb-4">
          Gradient Animation
        </h2>
        <p class="text-lg mb-6 text-center max-w-md">
          Beautiful animated gradient background with interactive effects
        </p>
        <button class="px-6 py-3 bg-default/10 backdrop-blur-sm rounded-full hover:bg-default/20 transition-colors">
          Explore
        </button>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
```
::

## Examples

### Basic Gradient Animation

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="background-gradient-animation-basic" />
  :::
#code
```vue
<template>
  <div class="h-96 w-full rounded-xl overflow-hidden relative">
    <MBackgroundGradientAnimation>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-default/20 backdrop-blur-sm flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-paintbrush"
              class="w-10 h-10 text-white"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4">
          Gradient Magic
        </h2>
        <p class="text-dimmed max-w-md mb-8">
          Bring your interfaces to life with smoothly animated gradient backgrounds that captivate and engage users
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <UButton
            color="primary"
            variant="solid"
            size="lg"
          >
            Start Creating
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="lg"
          >
            View Examples
          </UButton>
        </div>
      </div>
    </MBackgroundGradientAnimation>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="background-gradient-animation-custom" />
  :::
#code
  <PlaygroundCode name="BackgroundGradientAnimation" />
::

## Props

::component-props
  ::component-prop{name="gradientBackgroundStart" type="string" default="'rgb(108, 0, 162)'"}
  Starting color for the background gradient. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="gradientBackgroundEnd" type="string" default="'rgb(0, 17, 82)'"}
  Ending color for the background gradient. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`) or any CSS color.
  ::
  
  ::component-prop{name="firstColor" type="string" default="'18, 113, 255'"}
  First radial gradient color. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="secondColor" type="string" default="'221, 74, 255'"}
  Second radial gradient color. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="thirdColor" type="string" default="'100, 220, 255'"}
  Third radial gradient color. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="fourthColor" type="string" default="'200, 50, 50'"}
  Fourth radial gradient color. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="fifthColor" type="string" default="'180, 180, 50'"}
  Fifth radial gradient color. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="pointerColor" type="string" default="'140, 100, 255'"}
  Pointer color for interactive effects. Accepts a [Nuxt UI color token](/getting-started/theming) (e.g. `primary`), any CSS color, or an `'R, G, B'` triplet.
  ::
  
  ::component-prop{name="size" type="string" default="'80%'"}
  Size of the radial gradients.
  ::
  
  ::component-prop{name="blendingValue" type="string" default="'hard-light'"}
  Blending mode for the gradients.
  ::
  
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the content container.
  ::
  
  ::component-prop{name="interactive" type="boolean" default="true"}
  Enable interactive mouse effects.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes to apply to the container.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.backgroundGradientAnimation` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `h-full w-full overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]`
  ::
  ::component-slot-row{name="content"}
  ::
  ::component-slot-row{name="gradients"}
  `gradients-container h-full w-full blur-lg`
  ::
  ::component-slot-row{name="first"}
  `${BLOB} [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [transform-origin:center_center] animate-first opacity-100`
  ::
  ::component-slot-row{name="second"}
  `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-400px)] animate-second opacity-100`
  ::
  ::component-slot-row{name="third"}
  `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [transform-origin:calc(50%+400px)] animate-third opacity-100`
  ::
  ::component-slot-row{name="fourth"}
  `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-200px)] animate-fourth opacity-70`
  ::
  ::component-slot-row{name="fifth"}
  `${BLOB} [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-100`
  ::
  ::component-slot-row{name="pointer"}
  `absolute [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] opacity-70`
  ::
::

