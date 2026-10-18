---
title: Wobble Card
description: Card with a wobble effect that responds to cursor movement.
---

The WobbleCard component creates a card with a wobble effect that responds to cursor movement. It's perfect for creating interactive cards with fluid, organic animations.

The card tilts in 3D toward the cursor. `intensity` controls how far it tilts, and `speed` controls how quickly it settles back when the cursor leaves.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-basic" />
  :::
#code
```vue
<template>
  <MWobbleCard
    class="h-56"
    :ui="{ wrapper: 'mx-auto max-w-sm' }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <UIcon
            name="i-lucide-sparkles"
            class="h-5 w-5 text-primary"
          />
        </div>
        <div>
          <h3 class="font-semibold text-highlighted">
            Motion Primitives
          </h3>
          <p class="text-xs text-muted">
            Hover to tilt the card
          </p>
        </div>
      </div>
    </template>

    <p class="text-sm text-muted">
      The surface leans toward your cursor in 3D, then eases back to rest when the pointer leaves.
    </p>

    <template #footer>
      <UButton
        size="sm"
        color="primary"
        trailing-icon="i-lucide-arrow-right"
      >
        Get started
      </UButton>
    </template>
  </MWobbleCard>
</template>
```
::

## Examples

### Intensity and Speed

Vary `intensity` to control the tilt and `speed` to control how long the card takes to settle back.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="wobble-card-intensity" />
  :::
#code
```vue
<template>
  <div class="grid w-full gap-6 sm:grid-cols-2">
    <MWobbleCard
      class="h-44"
      :intensity="4"
      :speed="400"
    >
      <template #header>
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          intensity=4
        </p>
      </template>

      <h3 class="font-semibold text-highlighted">
        Subtle
      </h3>
      <p class="mt-1 text-sm text-muted">
        A gentle tilt that suits dense layouts and lists of cards.
      </p>
    </MWobbleCard>

    <MWobbleCard
      class="h-44"
      :intensity="16"
      :speed="600"
    >
      <template #header>
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          intensity=16
        </p>
      </template>

      <h3 class="font-semibold text-highlighted">
        Playful
      </h3>
      <p class="mt-1 text-sm text-muted">
        A pronounced lean that spotlights a single hero card.
      </p>
    </MWobbleCard>
  </div>
</template>
```
::

### Custom Surface

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="wobble-card-gradient" />
  :::
#code
```vue
<template>
  <MWobbleCard
    class="h-52 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ring-0"
    :ui="{ wrapper: 'mx-auto max-w-sm', body: 'h-full' }"
  >
    <div class="flex h-full flex-col justify-between">
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium text-white/90">
          Pro plan
        </p>
        <UIcon
          name="i-lucide-rocket"
          class="h-5 w-5 text-white/80"
        />
      </div>

      <div>
        <p class="text-3xl font-semibold text-white">
          $12<span class="text-base font-normal text-white/80">/mo</span>
        </p>
        <p class="mt-1 text-sm text-white/80">
          Everything you need to ship motion-rich interfaces.
        </p>
      </div>

      <UButton
        size="sm"
        class="w-fit bg-white text-neutral-900 hover:bg-white/90"
      >
        Start free trial
      </UButton>
    </div>
  </MWobbleCard>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="wobble-card-custom" />
  :::
#code
  <PlaygroundCode name="WobbleCard" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::

  ::component-prop{name="intensity" type="number" default="10"}
  Maximum tilt in degrees at the edge of the card.
  ::

  ::component-prop{name="speed" type="number" default="300"}
  Duration in milliseconds of the return animation when the cursor leaves.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.wobbleCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="wrapper"}
  `relative`
  ::
  ::component-slot-row{name="card"}
  `h-full`
  ::
::

