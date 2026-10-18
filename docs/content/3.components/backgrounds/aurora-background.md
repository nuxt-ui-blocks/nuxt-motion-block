---
title: Aurora Background
description: Animated background with aurora-like gradient effects.
---

The AuroraBackground component creates an animated background with aurora-like gradient effects. It features smooth color transitions and animated patterns that create a mesmerizing visual experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="aurora-background-example" />
  :::
#code
```vue
<template>
  <div class="relative h-96 w-full overflow-hidden rounded-lg border bg-default">
    <MAuroraBackground>
      <div class="relative z-10 flex h-full flex-col items-center justify-center">
        <h2 class="text-3xl font-bold text-white">
          Aurora Background
        </h2>
        <p class="mt-4 text-lg text-white/90">
          Beautiful animated background effect
        </p>
        <button class="mt-6 rounded-full bg-default/10 px-4 py-2 text-white backdrop-blur-sm hover:bg-default/20 transition-colors">
          Get Started
        </button>
      </div>
    </MAuroraBackground>
  </div>
</template>

<script setup>
// This component will be registered globally in the documentation app
</script>
```
::

## Examples

### Basic Aurora Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="aurora-background-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-96 w-full overflow-hidden rounded-xl border bg-default">
    <MAuroraBackground>
      <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div class="mb-6">
          <div class="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
            <UIcon
              name="i-lucide-sparkles"
              class="w-10 h-10 text-white"
            />
          </div>
        </div>
        <h2 class="text-4xl font-bold text-white mb-4">
          Aurora Experience
        </h2>
        <p class="text-dimmed max-w-md mb-8">
          Create mesmerizing backgrounds with our aurora effect that adds depth and visual interest to your interfaces
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
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
    </MAuroraBackground>
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
    <component-example name="aurora-background-custom" />
  :::
#code
  <PlaygroundCode name="AuroraBackground" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="showRadialGradient" type="boolean" default="true"}
  Whether to show the radial gradient overlay.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.auroraBackground` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `transition-bg relative flex min-h-[100dvh] flex-col items-center justify-center`
  ::
  ::component-slot-row{name="mask"}
  `absolute inset-0 overflow-hidden`
  ::
  ::component-slot-row{name="aurora"}
  `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`
  ::
::

