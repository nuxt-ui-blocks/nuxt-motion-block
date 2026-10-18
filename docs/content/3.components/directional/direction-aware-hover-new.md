---
title: Direction Aware Hover New
description: Enhanced image card with content that slides in from the direction of the cursor.
---

The DirectionAwareHoverNew component is an enhanced version of the DirectionAwareHover component that creates an image card with content that slides in from the direction of the cursor. It detects the direction of mouse entry and animates the content accordingly for a sophisticated user experience.

## Usage

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
  <div class="flex justify-center">
    <MDirectionAwareHoverNew image-url="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80">
      <template #content>
        <h3 class="text-xl font-bold">
          Mountain Landscape
        </h3>
        <p class="text-white/80">
          Beautiful scenic mountain view
        </p>
      </template>
    </MDirectionAwareHoverNew>
  </div>
</template>
```
::

## Examples

### Direction Aware Hover New

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="direction-aware-hover-new-example" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MDirectionAwareHoverNew image-url="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80">
      <template #content>
        <div class="space-y-3">
          <UIcon
            name="i-heroicons-light-bulb"
            class="w-8 h-8 text-amber-400"
          />
          <h3 class="text-2xl font-bold">
            Creative Design
          </h3>
          <p class="text-white/80">
            Innovative solutions for modern challenges
          </p>
          <UButton
            color="neutral"
            variant="solid"
            size="sm"
            class="mt-2"
          >
            View Project
          </UButton>
        </div>
      </template>
    </MDirectionAwareHoverNew>
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
    <component-example name="direction-aware-hover-new-custom" />
  :::
#code
  <PlaygroundCode name="DirectionAwareHoverNew" />
::

## Props

::component-props
  ::component-prop{name="imageUrl" type="string" required}
  URL of the image to display.
  ::
  
  ::component-prop{name="childrenClass" type="string" default="''"}
  CSS classes to apply to the content container.
  ::
  
  ::component-prop{name="imageClass" type="string" default="''"}
  CSS classes to apply to the image.
  ::
  
  ::component-prop{name="class" type="string" default="'md:h-96 w-60 h-60 md:w-96'"}
  CSS classes to apply to the container.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.directionAwareHoverNew` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `bg-transparent rounded-lg overflow-hidden group/card relative cursor-pointer`
  ::
  ::component-slot-row{name="inner"}
  `relative h-full w-full overflow-hidden`
  ::
  ::component-slot-row{name="imageWrapper"}
  `h-full w-full relative z-10`
  ::
  ::component-slot-row{name="image"}
  `h-full w-full object-cover min-w-[110%] min-h-[110%] absolute inset-0`
  ::
  ::component-slot-row{name="overlay"}
  `absolute inset-0 bg-default/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-20`
  ::
  ::component-slot-row{name="content"}
  `text-inverted absolute bottom-4 left-4 z-30`
  ::
  ::component-slot-row{name="contentBody"}
  `space-y-2`
  ::
  ::component-slot-row{name="title"}
  `text-xl font-bold`
  ::
  ::component-slot-row{name="description"}
  `text-inverted/80`
  ::
::

