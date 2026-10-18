---
title: Draggable Card
description: Interactive card that can be dragged around with 3D tilt effects.
---

The DraggableCard component creates an interactive card that can be dragged around with 3D tilt effects. It combines drag functionality with dynamic 3D transformations for a playful, engaging user experience.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-example" />
  :::
#code
```vue
<template>
  <MDraggableCard>
    <template #header>
      <h3 class="text-lg font-semibold">
        Draggable Card
      </h3>
    </template>
    <p>This card can be dragged around the screen.</p>
  </MDraggableCard>
</template>
```
::

## Examples

### Basic Draggable Card

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="draggable-card-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center p-6">
    <MDraggableCard class="w-full max-w-md">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-2xl font-bold text-highlighted">
            Interactive Widget
          </h3>
          <UBadge
            color="primary"
            variant="soft"
          >
            Drag Me
          </UBadge>
        </div>
      </template>
      <div class="space-y-6">
        <p class="text-muted">
          This draggable card can be moved around the screen. Try dragging it to reposition it anywhere!
        </p>
        <div class="flex items-center p-4 bg-primary/5 dark:bg-primary/30 rounded-lg">
          <UIcon
            name="i-lucide-info"
            class="w-6 h-6 text-primary mr-4"
          />
          <span class="text-sm text-primary">Release to snap back to position</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <UButton
            color="primary"
            variant="solid"
            size="sm"
            block
          >
            Action
          </UButton>
          <UButton
            color="neutral"
            variant="outline"
            size="sm"
            block
          >
            Options
          </UButton>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between">
          <span class="text-xs text-muted">Drag handle in top right</span>
          <UIcon
            name="i-lucide-move"
            class="w-5 h-5 text-dimmed"
          />
        </div>
      </template>
    </MDraggableCard>
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
    <component-example name="draggable-card-custom" />
  :::
#code
  <PlaygroundCode name="DraggableCard" />
::

## Props

::component-props
  ::component-prop{name="class" type="string" default="''"}
  CSS classes to apply to the card content.
  ::
  
  ::component-prop{name="containerClass" type="string" default="''"}
  CSS classes to apply to the card container.
  ::
  
  ::component-prop{name="ui" type="object" default="{}"}
  UI configuration for the underlying UCard component.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.draggableCard` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `[perspective:3000px] w-fit h-fit`
  ::
  ::component-slot-row{name="card"}
  `w-full h-full`
  ::
  ::component-slot-row{name="cardRoot"}
  `relative min-h-96 w-80 overflow-hidden rounded-md bg-default dark:bg-default p-6 shadow-2xl transform-3d`
  ::
  ::component-slot-row{name="cardBody"}
  `relative z-10`
  ::
  ::component-slot-row{name="cardHeader"}
  `relative z-10`
  ::
  ::component-slot-row{name="cardFooter"}
  `relative z-10`
  ::
  ::component-slot-row{name="glare"}
  `pointer-events-none absolute inset-0 bg-default select-none z-20`
  ::
::

