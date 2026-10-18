---
title: Animated Spotlight
description: Animated spotlight effect with customizable gradients and movement.
---

The AnimatedSpotlight component creates an animated spotlight effect with customizable gradients and movement. It's perfect for adding dynamic lighting effects to your UI.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-spotlight-example" />
  :::
#code
```vue
<template>
  <UCard class="relative">
    <template #header>
      <h2 class="text-xl font-semibold">
        Animated spotlight effect
      </h2>
    </template>
    <p class="text-muted mb-4">
      Animated spotlight effect
    </p>
    <MAnimatedSpotlight />
  </UCard>
</template>
```
::

## Examples

### Basic Animated Spotlight

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="animated-spotlight-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 rounded-xl overflow-hidden border border-default bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
    <MAnimatedSpotlight
      :translate-y="-200"
      :width="400"
      :height="1000"
      class="absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="w-20 h-20 rounded-full bg-default/10 backdrop-blur-sm flex items-center justify-center mb-6">
        <UIcon
          name="i-lucide-search"
          class="w-10 h-10 text-white"
        />
      </div>
      <h3 class="text-3xl font-bold text-white mb-4">
        Spotlight Search
      </h3>
      <p class="text-dimmed max-w-md mb-8">
        Focus attention on key elements with our animated spotlight effect that guides users through your interface
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <UButton
          color="primary"
          variant="solid"
          size="lg"
        >
          Try It Now
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
    <component-example name="animated-spotlight-custom" />
  :::
#code
  <PlaygroundCode name="AnimatedSpotlight" />
::

## Props

::component-props
  ::component-prop{name="gradientFirst" type="string" default="'radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)'"}
  First gradient for the spotlight effect.
  ::
  
  ::component-prop{name="gradientSecond" type="string" default="'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)'"}
  Second gradient for the spotlight effect.
  ::
  
  ::component-prop{name="gradientThird" type="string" default="'radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)'"}
  Third gradient for the spotlight effect.
  ::
  
  ::component-prop{name="translateY" type="number" default="-350"}
  Vertical translation of the spotlight.
  ::
  
  ::component-prop{name="width" type="number" default="560"}
  Width of the spotlight in pixels.
  ::
  
  ::component-prop{name="height" type="number" default="1380"}
  Height of the spotlight in pixels.
  ::
  
  ::component-prop{name="smallWidth" type="number" default="240"}
  Width of the smaller spotlight elements.
  ::
  
  ::component-prop{name="duration" type="number" default="7"}
  Duration of the animation in seconds.
  ::
  
  ::component-prop{name="xOffset" type="number" default="100"}
  Horizontal offset for the animation.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.animatedSpotlight` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none absolute inset-0 h-full w-full`
  ::
  ::component-slot-row{name="left"}
  `absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none`
  ::
  ::component-slot-row{name="leftFirst"}
  `absolute top-0 left-0`
  ::
  ::component-slot-row{name="leftSecond"}
  `absolute top-0 left-0 origin-top-left`
  ::
  ::component-slot-row{name="leftThird"}
  `absolute top-0 left-0 origin-top-left`
  ::
  ::component-slot-row{name="right"}
  `absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none`
  ::
  ::component-slot-row{name="rightFirst"}
  `absolute top-0 right-0`
  ::
  ::component-slot-row{name="rightSecond"}
  `absolute top-0 right-0 origin-top-right`
  ::
  ::component-slot-row{name="rightThird"}
  `absolute top-0 right-0 origin-top-right`
  ::
::

