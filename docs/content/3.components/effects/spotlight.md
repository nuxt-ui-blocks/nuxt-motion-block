---
title: Spotlight
description: Component that creates a spotlight effect following the cursor.
---

The Spotlight component creates a spotlight effect following the cursor. It's perfect for creating engaging hover effects and interactive elements that respond to cursor movement.

## Usage

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
  <div class="relative h-96 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-xl overflow-hidden">
    <MSpotlight />
    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
      <div class="mb-8">
        <div class="w-20 h-20 rounded-full bg-default/10 backdrop-blur-sm flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-search"
            class="w-10 h-10 text-white"
          />
        </div>
      </div>
      <h3 class="text-4xl font-bold text-white mb-6">
        Spotlight Effect
      </h3>
      <p class="text-dimmed max-w-md mb-8 text-lg">
        Focus attention on key elements with our spotlight effect that guides users through your interface
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
          Learn More
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

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
  <div class="relative h-64 bg-muted rounded-lg overflow-hidden">
    <MSpotlight class="bg-gradient-to-br from-emerald-500 to-teal-600" />
    <div class="absolute inset-0 flex items-center justify-center">
      <h3 class="text-2xl font-bold text-white">
        Gradient Spotlight
      </h3>
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
    <component-example name="spotlight-custom" />
  :::
#code
  <PlaygroundCode name="Spotlight" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="'bg-primary-300/20 dark:bg-primary-600/20'"}
  CSS classes to apply to the spotlight element.
  ::
  
  ::component-prop{name="size" type="number" default="200"}
  Size of the spotlight in pixels.
  ::
  
  ::component-prop{name="springOptions" type="SpringOptions" default="{ bounce: 0 }"}
  Spring animation options.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spotlight` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none absolute rounded-full blur-xl transition-opacity duration-200`
  ::
::

