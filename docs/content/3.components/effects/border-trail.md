---
title: Border Trail
description: Animated border effect with trailing particles.
---

The BorderTrail component creates an animated border effect with trailing particles. It's perfect for adding visual interest to cards, buttons, or any container element.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-trail-example" />
  :::
#code
```vue
<template>
  <UCard
    class="relative overflow-hidden max-w-md mx-auto"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-blue-500 to-purple-600"
      :size="40"
      :transition="{ duration: 3, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-xl font-bold text-highlighted">
          New Message
        </h3>
        <UBadge color="primary">
          3
        </UBadge>
      </div>
    </template>
    <div class="space-y-3">
      <div class="flex items-start space-x-3">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="User"
          size="md"
        />
        <div>
          <h4 class="font-medium text-highlighted">
            Alex Johnson
          </h4>
          <p class="text-sm text-muted">
            Hey, are we still meeting tomorrow?
          </p>
          <p class="text-xs text-muted mt-1">
            2 min ago
          </p>
        </div>
      </div>

      <div class="flex items-start space-x-3">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/2?v=4"
          alt="User"
          size="md"
        />
        <div>
          <h4 class="font-medium text-highlighted">
            Sam Wilson
          </h4>
          <p class="text-sm text-muted">
            Check out this new design I made
          </p>
          <p class="text-xs text-muted mt-1">
            15 min ago
          </p>
        </div>
      </div>
    </div>

    <template #footer>
      <UButton
        color="primary"
        variant="solid"
        size="sm"
        class="w-full"
      >
        View All Messages
      </UButton>
    </template>
  </UCard>
</template>
```
::

## Examples

### Profile Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-trail-profile" />
  :::
#code
```vue
<template>
  <UCard
    class="relative overflow-hidden max-w-sm"
    :ui="{ body: 'rounded-lg' }"
  >
    <MBorderTrail
      class="bg-gradient-to-r from-cyan-500 to-blue-500"
      :size="50"
      :transition="{ duration: 4, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex flex-col items-center">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/1?v=4"
          alt="Profile"
          size="xl"
          class="mb-4 ring-2 ring-cyan-500"
        />
        <h3 class="text-xl font-bold">
          John Doe
        </h3>
        <p class="text-muted">
          Senior Developer
        </p>
      </div>
    </template>
    <div class="flex gap-2 justify-center">
      <UButton color="neutral">
        Message
      </UButton>
      <UButton color="primary">
        Connect
      </UButton>
    </div>
  </UCard>
</template>
```
::

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="border-trail-custom" />
  :::
#code
  <PlaygroundCode name="BorderTrail" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the trail element.
  ::
  
  ::component-prop{name="size" type="number" default="60"}
  Size of the trail element in pixels.
  ::
  
  ::component-prop{name="transition" type="object" default="{ repeat: Infinity, duration: 5, ease: 'linear' }"}
  Animation transition options.
  ::
  
  ::component-prop{name="onAnimationComplete" type="function" default="undefined"}
  Callback function when animation completes.
  ::
  
  ::component-prop{name="style" type="object" default="undefined"}
  Custom styles to apply to the trail element.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.borderTrail` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]`
  ::
  ::component-slot-row{name="trail"}
  `absolute aspect-square bg-accented`
  ::
::

