---
title: Border Trail
description: Animated border effect with trailing particles.
navigation:
  icon: i-lucide-square
---

# Border Trail

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
 <!-- MBorderTrail inherits parent's rounded class so it matches the card's border radius by setting rounded-lg in body ui property -->
  <UCard class="relative overflow-hidden" :ui="{ body: 'rounded-lg' }">
    <MBorderTrail 
      class="bg-gradient-to-r from-green-500 to-teal-500" 
      :size="40"
      :transition="{ duration: 3, ease: 'easeInOut' }"
    />
    <template #header>
      <h3 class="text-xl font-bold">Notification Card</h3>
    </template>
    <p class="text-gray-600 dark:text-gray-400">You have 3 new messages</p>
  </UCard>
</template>
```
::

## Props

::field-group
  ::field{name="class" type="string" default="undefined"}
  CSS classes to apply to the trail element.
  ::
  
  ::field{name="size" type="number" default="60"}
  Size of the trail element in pixels.
  ::
  
  ::field{name="transition" type="object" default="{ repeat: Infinity, duration: 5, ease: 'linear' }"}
  Animation transition options.
  ::
  
  ::field{name="onAnimationComplete" type="function" default="undefined"}
  Callback function when animation completes.
  ::
  
  ::field{name="style" type="object" default="undefined"}
  Custom styles to apply to the trail element.
  ::
::

## Examples

### Notification Badge

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-trail-notification" />
  :::
#code
```vue
<template>
  <UCard class="relative overflow-hidden max-w-sm" :ui="{ body: 'rounded-lg' }">
    <MBorderTrail 
      class="bg-gradient-to-r from-red-500 to-orange-500" 
      :size="30"
      :transition="{ duration: 2, ease: 'easeInOut' }"
    />
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">Alert</h3>
        <UBadge variant="solid" color="red">!</UBadge>
      </div>
    </template>
    <p class="text-gray-600 dark:text-gray-400">System maintenance scheduled</p>
  </UCard>
</template>
```
::

### Interactive Button

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-trail-button" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-6">
    <UButton 
      color="primary"
      size="lg"
      class="relative overflow-hidden"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <MBorderTrail 
        v-if="isHovered"
        class="bg-white/30" 
        :size="20"
        :transition="{ duration: 1.5, ease: 'easeInOut' }"
      />
      <span class="relative z-10">Hover Me</span>
    </UButton>
    
    <p class="text-gray-600 dark:text-gray-400 text-sm max-w-xs text-center">
      This button shows the border trail effect only on hover, creating a subtle interactive experience.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>
```
::

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
  <UCard class="relative overflow-hidden max-w-sm" :ui="{ body: 'rounded-lg' }">
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
        <h3 class="text-xl font-bold">John Doe</h3>
        <p class="text-gray-600 dark:text-gray-400">Senior Developer</p>
      </div>
    </template>
    <div class="flex gap-2 justify-center">
      <UButton color="white">Message</UButton>
      <UButton color="primary">Connect</UButton>
    </div>
  </UCard>
</template>
```
::

### Loading State

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="border-trail-loading" />
  :::
#code
```vue
<template>
  <UCard class="relative overflow-hidden max-w-sm" :ui="{ body: 'rounded-lg' }">
    <MBorderTrail 
      class="bg-gradient-to-r from-amber-500 to-orange-500" 
      :size="35"
      :transition="{ duration: 2.5, ease: 'easeInOut' }"
    />
    <div class="flex flex-col items-center text-center">
      <div class="mb-4">
        <UIcon name="i-lucide-loader" class="w-12 h-12 text-amber-500 animate-spin" />
      </div>
      <h3 class="text-lg font-bold">Processing</h3>
      <p class="text-gray-600 dark:text-gray-400 mt-2">
        Your request is being processed. This usually takes a few seconds.
      </p>
    </div>
  </UCard>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.borderTrail` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]'` |
| `trail` | `'absolute aspect-square bg-accented'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.borderTrail` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]` |
| `trail` | `absolute aspect-square bg-accented` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.borderTrail` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]` |
| `trail` | `absolute aspect-square bg-accented` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.borderTrail` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]` |
| `trail` | `absolute aspect-square bg-accented` |
