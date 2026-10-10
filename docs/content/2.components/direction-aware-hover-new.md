---
title: Direction Aware Hover New
description: Enhanced image card with content that slides in from the direction of the cursor.
navigation:
  icon: i-lucide-move-diagonal
---

# Direction Aware Hover New

The DirectionAwareHoverNew component is an enhanced version of the DirectionAwareHover component that creates an image card with content that slides in from the direction of the cursor. It detects the direction of mouse entry and animates the content accordingly for a sophisticated user experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="direction-aware-hover-new-example" />
  :::
#code
```vue
<template>
  <MDirectionAwareHoverNew image-url="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80">
    <template #content>
      <div class="space-y-3">
        <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-amber-400" />
        <h3 class="text-2xl font-bold">Creative Design</h3>
        <p class="text-white/80">Innovative solutions for modern challenges</p>
        <UButton color="neutral" variant="solid" size="sm" class="mt-2">View Project</UButton>
      </div>
    </template>
  </MDirectionAwareHoverNew>
</template>
```
::

## Props

::field-group
  ::field{name="imageUrl" type="string" required}
  URL of the image to display.
  ::
  
  ::field{name="childrenClass" type="string" default="''"}
  CSS classes to apply to the content container.
  ::
  
  ::field{name="imageClass" type="string" default="''"}
  CSS classes to apply to the image.
  ::
  
  ::field{name="class" type="string" default="'md:h-96 w-60 h-60 md:w-96'"}
  CSS classes to apply to the container.
  ::
::

## Examples

### Basic Direction Aware Hover New

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="direction-aware-hover-new-basic" />
  :::
#code
```vue
<template>
  <MDirectionAwareHoverNew image-url="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80">
    <template #content>
      <h3 class="text-xl font-bold">Mountain Landscape</h3>
      <p class="text-white/80">Beautiful scenic mountain view</p>
    </template>
  </MDirectionAwareHoverNew>
</template>
```
::

### Custom Content Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="direction-aware-hover-new-custom-content" />
  :::
#code
```vue
<template>
  <MDirectionAwareHoverNew 
    image-url="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    children-class="text-center"
  >
    <template #content>
      <UIcon name="i-heroicons-camera" class="w-10 h-10 text-white mx-auto" />
      <h3 class="text-2xl font-bold">Ocean Photography</h3>
      <p class="text-white/80">Professional underwater photography</p>
    </template>
  </MDirectionAwareHoverNew>
</template>
```
::

### Custom Image Styling

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="direction-aware-hover-new-custom-image" />
  :::
#code
```vue
<template>
  <MDirectionAwareHoverNew 
    image-url="https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    image-class="object-top"
  >
    <template #content>
      <h3 class="text-xl font-bold">Forest Path</h3>
      <p class="text-white/80">Peaceful walking trail through the woods</p>
    </template>
  </MDirectionAwareHoverNew>
</template>
```
::

### Custom Container Sizing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="direction-aware-hover-new-custom-sizing" />
  :::
#code
```vue
<template>
  <MDirectionAwareHoverNew 
    image-url="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
    class="w-80 h-80"
  >
    <template #content>
      <h3 class="text-2xl font-bold">City Skyline</h3>
      <p class="text-white/80">Urban landscape at dusk</p>
    </template>
  </MDirectionAwareHoverNew>
</template>
```
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.directionAwareHoverNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer'` |
| `inner` | `'relative h-full w-full overflow-hidden'` |
| `imageWrapper` | `'h-full w-full relative z-10'` |
| `image` | `'h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0'` |
| `overlay` | `'absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20'` |
| `content` | `'text-inverted absolute bottom-4 left-4 z-30'` |
| `contentBody` | `'space-y-2'` |
| `title` | `'text-xl font-bold'` |
| `description` | `'text-inverted/80'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.directionAwareHoverNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer` |
| `inner` | `relative h-full w-full overflow-hidden` |
| `imageWrapper` | `h-full w-full relative z-10` |
| `image` | `h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0` |
| `overlay` | `absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20` |
| `content` | `text-inverted absolute bottom-4 left-4 z-30` |
| `contentBody` | `space-y-2` |
| `title` | `text-xl font-bold` |
| `description` | `text-inverted/80` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.directionAwareHoverNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer` |
| `inner` | `relative h-full w-full overflow-hidden` |
| `imageWrapper` | `h-full w-full relative z-10` |
| `image` | `h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0` |
| `overlay` | `absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20` |
| `content` | `text-inverted absolute bottom-4 left-4 z-30` |
| `contentBody` | `space-y-2` |
| `title` | `text-xl font-bold` |
| `description` | `text-inverted/80` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.directionAwareHoverNew` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer` |
| `inner` | `relative h-full w-full overflow-hidden` |
| `imageWrapper` | `h-full w-full relative z-10` |
| `image` | `h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0` |
| `overlay` | `absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20` |
| `content` | `text-inverted absolute bottom-4 left-4 z-30` |
| `contentBody` | `space-y-2` |
| `title` | `text-xl font-bold` |
| `description` | `text-inverted/80` |
