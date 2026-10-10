---
title: Glowing Stars Card
description: Card component with animated glowing stars effect and customizable colors.
navigation:
  icon: i-lucide-star
---

# Glowing Stars Card

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
        ÃƒÆ’Ã‚Â¢Ãƒâ€¦Ã¢â‚¬Å“Ãƒâ€šÃ‚Â¨ Cosmic Dashboard
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

## Props

::field-group
  ::field{name="starBgClass" type="string" default="'bg-primary-400 dark:bg-primary-500 shadow-primary-400/50 dark:shadow-primary-500/50'"}
  CSS classes to apply to the glowing stars for custom colors.
  ::
  
  ::field{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
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
  <MGlowingStarsCard>
    <template #header>
      <h2 class="font-bold text-xl text-[#eaeaea]">
        Glowing Stars Card
      </h2>
    </template>
    <div class="text-center py-4">
      <p class="text-white/80">
        Card with animated glowing stars
      </p>
    </div>
  </MGlowingStarsCard>
</template>
```
::

### Custom Star Colors

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="glowing-stars-card-custom" />
  :::
#code
```vue
<template>
  <MGlowingStarsCard star-bg-class="bg-purple-400 dark:bg-purple-500 shadow-purple-400/50 dark:shadow-purple-500/50">
    <template #header>
      <h2 class="font-bold text-xl text-[#eaeaea]">
        ÃƒÆ’Ã‚Â°Ãƒâ€¦Ã‚Â¸Ãƒâ€¦Ã¢â‚¬â„¢Ãƒâ€¦Ã‚Â¸ Purple Stars
      </h2>
    </template>
    <div class="text-center py-4">
      <p class="text-white/80">
        Custom purple star colors
      </p>
    </div>
  </MGlowingStarsCard>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowingStarsCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `''` |
| `stars` | `'flex-1 flex items-center justify-center'` |
| `grid` | `'h-48 w-full grid grid-cols-18 gap-px'` |
| `cell` | `'relative flex items-center justify-center'` |
| `star` | `'h-px w-px rounded-full relative z-20'` |
| `glow` | `'absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl'` |
| `content` | `''` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.glowingStarsCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `stars` | `flex-1 flex items-center justify-center` |
| `grid` | `h-48 w-full grid grid-cols-18 gap-px` |
| `cell` | `relative flex items-center justify-center` |
| `star` | `h-px w-px rounded-full relative z-20` |
| `glow` | `absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl` |
| `content` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.glowingStarsCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `stars` | `flex-1 flex items-center justify-center` |
| `grid` | `h-48 w-full grid grid-cols-18 gap-px` |
| `cell` | `relative flex items-center justify-center` |
| `star` | `h-px w-px rounded-full relative z-20` |
| `glow` | `absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl` |
| `content` |  |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.glowingStarsCard` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `stars` | `flex-1 flex items-center justify-center` |
| `grid` | `h-48 w-full grid grid-cols-18 gap-px` |
| `cell` | `relative flex items-center justify-center` |
| `star` | `h-px w-px rounded-full relative z-20` |
| `glow` | `absolute left-1/2 -translate-x-1/2 z-10 h-1 w-1 rounded-full blur-[1px] shadow-2xl` |
| `content` |  |
