---
title: Magnetic
description: Component that creates a magnetic effect, attracting elements toward the cursor.
---

The Magnetic component creates a magnetic effect, attracting elements toward the cursor. It's perfect for creating interactive buttons and elements that respond to cursor proximity with smooth, physics-based animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MMagnetic>
      <UButton color="primary">
        Magnetic Button
      </UButton>
    </MMagnetic>
  </div>
</template>
```
::

## Examples

### Basic Magnetic

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="magnetic-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-2xl">
      <h2 class="text-3xl font-bold text-highlighted mb-4">
        Interactive Experience
      </h2>
      <p class="text-muted mb-8">
        Move your cursor around to feel the magnetic attraction effect on these interactive elements.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <MMagnetic
        :intensity="0.8"
        :range="120"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary/10 dark:bg-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-primary"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Blazing quick
            </h3>
            <p class="text-muted text-sm">
              Experience blazing fast performance with our optimized solutions.
            </p>
          </div>
        </UCard>
      </MMagnetic>

      <MMagnetic
        :intensity="1.2"
        :range="150"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Beautiful Effects
            </h3>
            <p class="text-muted text-sm">
              Create stunning interfaces with our collection of animated components.
            </p>
          </div>
        </UCard>
      </MMagnetic>

      <MMagnetic
        :intensity="0.6"
        :range="100"
      >
        <UCard class="h-full cursor-pointer hover:shadow-lg transition-shadow">
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              Plug-in ready
            </h3>
            <p class="text-muted text-sm">
              Quick to add with clean, well-documented code.
            </p>
          </div>
        </UCard>
      </MMagnetic>
    </div>

    <div class="mt-8">
      <MMagnetic
        :intensity="1.5"
        :range="200"
      >
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3 text-lg font-semibold"
        >
          Get Started Now
        </UButton>
      </MMagnetic>
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
    <component-example name="magnetic-custom" />
  :::
#code
  <PlaygroundCode name="Magnetic" />
::

## Props

::component-props
  ::component-prop{name="intensity" type="number" default="0.6"}
  Magnetic intensity/strength.
  ::
  
  ::component-prop{name="range" type="number" default="100"}
  Activation range in pixels.
  ::
  
  ::component-prop{name="actionArea" type="string" default="'self'"}
  Area that triggers the effect ('self', 'parent', 'global').
  ::
  
  ::component-prop{name="springOptions" type="object" default="{ stiffness: 26.7, damping: 4.1, mass: 0.2 }"}
  Spring physics options.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.magnetic` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
::

