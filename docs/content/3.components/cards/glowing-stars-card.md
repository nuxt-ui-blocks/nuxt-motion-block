---
title: Glowing Stars Card
description: Card component with animated glowing stars effect and customizable colors.
---

The GlowingStarsCard component creates a card with an animated glowing stars effect. It features interactive stars that glow on hover and automatically animate at random intervals.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-stars-card-example" />
  :::
#code
```vue
<template>
  <MGlowingStarsCard>
    <template #header>
      <h2 class="font-bold text-2xl text-[#eaeaea]">
        ✨ Cosmic Dashboard
      </h2>
    </template>
    <div class="text-center space-y-3">
      <p class="text-white/80 text-sm">
        Interactive starfield visualization
      </p>
      <UBadge
        color="primary"
        variant="soft"
      >
        Active
      </UBadge>
    </div>
    <template #footer>
      <UButton
        icon="i-heroicons-rocket-launch"
        color="neutral"
        variant="solid"
        class="w-full"
      >
        Launch Experience
      </UButton>
    </template>
  </MGlowingStarsCard>
</template>
```
::

## Examples

### Basic Glowing Stars Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-stars-card-basic" />
  :::
#code
```vue
<template>
  <MGlowingStarsCard class="max-w-md mx-auto">
    <template #header>
      <div class="flex items-center justify-between mb-6">
        <h2 class="font-bold text-3xl text-[#eaeaea]">
          Premium Features
        </h2>
        <UBadge
          color="primary"
          variant="soft"
        >
          PRO
        </UBadge>
      </div>
    </template>
    <div class="py-6 space-y-6">
      <div class="flex items-start p-4 bg-default/5 backdrop-blur-sm rounded-lg hover:bg-default/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-zap"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Blazing quick
          </h3>
          <p class="text-dimmed text-sm">
            Optimized performance with instant loading and minimal resource usage
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-default/5 backdrop-blur-sm rounded-lg hover:bg-default/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-shield"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Secure & Private
          </h3>
          <p class="text-dimmed text-sm">
            Enterprise-grade security for your data with end-to-end encryption
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-default/5 backdrop-blur-sm rounded-lg hover:bg-default/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-teal-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-sparkles"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Beautiful Effects
          </h3>
          <p class="text-dimmed text-sm">
            Stunning animations and visual experiences that captivate users
          </p>
        </div>
      </div>
      <div class="flex items-start p-4 bg-default/5 backdrop-blur-sm rounded-lg hover:bg-default/10 transition-colors">
        <div class="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center mr-4 flex-shrink-0">
          <UIcon
            name="i-lucide-globe"
            class="w-5 h-5 text-white"
          />
        </div>
        <div>
          <h3 class="font-semibold text-white mb-1">
            Global Access
          </h3>
          <p class="text-dimmed text-sm">
            Access your data from anywhere with our worldwide CDN network
          </p>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-col sm:flex-row gap-3 mt-6">
        <UButton
          color="primary"
          variant="solid"
          block
          class="flex-1"
        >
          Upgrade Now
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
          class="flex-1"
        >
          View Plans
        </UButton>
      </div>
    </template>
  </MGlowingStarsCard>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="glowing-stars-card-custom" />
  :::
#code
  <PlaygroundCode name="GlowingStarsCard" />
::

## Props

::component-props
  ::component-prop{name="starBgClass" type="string" default="'bg-primary-400 dark:bg-primary-500 shadow-primary-400/50 dark:shadow-primary-500/50'"}
  CSS classes to apply to the glowing stars for custom colors.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowingStarsCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="stars"}
  `flex-1 flex items-center justify-center`
  ::
  ::component-slot-row{name="grid"}
  `h-48 w-full grid grid-cols-18 gap-px`
  ::
  ::component-slot-row{name="cell"}
  `relative flex items-center justify-center`
  ::
  ::component-slot-row{name="star"}
  `h-px w-px rounded-full relative z-20`
  ::
  ::component-slot-row{name="glow"}
  `absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl`
  ::
  ::component-slot-row{name="content"}
  ::
::

