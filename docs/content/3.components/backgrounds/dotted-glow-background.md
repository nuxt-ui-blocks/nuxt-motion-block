---
title: Dotted Glow Background
description: Animated dotted background with glowing effects and customizable colors.
---

The DottedGlowBackground component creates an animated dotted background with glowing effects and customizable colors. It's perfect for creating visually appealing backgrounds with subtle animations.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dotted-glow-background-example" />
  :::
#code
```vue
<template>
  <UContainer class="min-h-screen relative">
    <MDottedGlowBackground
      :gap="16"
      :radius="2"
      color-light-var="--color-gray-900"
      color-dark-var="--color-gray-100"
      glow-color-light-var="--color-primary-500"
      glow-color-dark-var="--color-primary-400"
      class="background"
    />

    <div class="relative z-10 py-12">
      <UCard class="max-w-2xl mx-auto backdrop-blur-sm bg-default/80">
        <template #header>
          <div class="flex items-center justify-between">
            <h1 class="text-2xl font-bold text-highlighted">
              Welcome to Nuxt UI
            </h1>
            <UColorModeButton />
          </div>
        </template>
      </UCard>
    </div>
  </UContainer>
</template>
```
::

::note
The `colorLightVar`, `colorDarkVar`, `glowColorLightVar` and `glowColorDarkVar`
props take a CSS variable name **without needing to resolve it yourself**. Drop in
a Nuxt UI token (`--ui-primary`, `--ui-text-muted`) or a palette variable
(`--color-primary-400`) and the component converts it to the concrete colour the
browser paints — so the dots and glow track your brand across light and dark
mode.
::

## Examples

### Basic Dotted Glow Background

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dotted-glow-background-basic" />
  :::
#code
```vue
<template>
  <div class="relative h-80 rounded-xl overflow-hidden border border-default">
    <MDottedGlowBackground
      :gap="15"
      :radius="2"
      class="background absolute inset-0"
    />
    <div class="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
      <div class="mb-6">
        <div class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mx-auto">
          <UIcon
            name="i-lucide-sparkles"
            class="w-8 h-8 text-white"
          />
        </div>
      </div>
      <h2 class="text-3xl font-bold text-highlighted mb-4">
        Dotted Glow
      </h2>
      <p class="text-default max-w-md mb-6">
        Subtle glowing dot patterns that create depth and visual interest in your backgrounds
      </p>
      <UButton
        color="primary"
        variant="solid"
        size="md"
      >
        Customize Pattern
      </UButton>
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
    <component-example name="dotted-glow-background-custom" />
  :::
#code
  <PlaygroundCode name="DottedGlowBackground" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="style" type="object" default="{}"}
  Inline styles to apply to the container.
  ::
  
  ::component-prop{name="gap" type="number" default="12"}
  Gap between dots in pixels.
  ::
  
  ::component-prop{name="radius" type="number" default="2"}
  Radius of each dot in pixels.
  ::
  
  ::component-prop{name="color" type="string" default="'rgba(0,0,0,0.7)'"}
  Color of the dots in light mode.
  ::
  
  ::component-prop{name="darkColor" type="string" default="undefined"}
  Color of the dots in dark mode.
  ::
  
  ::component-prop{name="glowColor" type="string" default="'rgba(0, 170, 255, 0.85)'"}
  Glow color of the dots in light mode.
  ::
  
  ::component-prop{name="darkGlowColor" type="string" default="undefined"}
  Glow color of the dots in dark mode.
  ::
  
  ::component-prop{name="colorLightVar" type="string" default="undefined"}
  CSS variable for dot color in light mode. Pass a Nuxt UI token variable
  (`--ui-text-muted`) or a palette variable (`--color-gray-900`); it is resolved
  to a concrete colour against the container, so it follows the theme.
  ::

  ::component-prop{name="colorDarkVar" type="string" default="undefined"}
  CSS variable for dot color in dark mode, resolved the same way.
  ::

  ::component-prop{name="glowColorLightVar" type="string" default="undefined"}
  CSS variable for glow color in light mode. Pass a token such as `--ui-primary`
  and it resolves through the theme automatically.
  ::

  ::component-prop{name="glowColorDarkVar" type="string" default="undefined"}
  CSS variable for glow color in dark mode, resolved the same way.
  ::
  
  ::component-prop{name="opacity" type="number" default="0.6"}
  Opacity of the dots (0-1).
  ::
  
  ::component-prop{name="backgroundOpacity" type="number" default="0"}
  Opacity of the background gradient (0-1).
  ::
  
  ::component-prop{name="speedMin" type="number" default="0.4"}
  Minimum animation speed.
  ::
  
  ::component-prop{name="speedMax" type="number" default="1.3"}
  Maximum animation speed.
  ::
  
  ::component-prop{name="speedScale" type="number" default="1"}
  Scale factor for animation speed.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dottedGlowBackground` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="canvas"}
  ::
::

