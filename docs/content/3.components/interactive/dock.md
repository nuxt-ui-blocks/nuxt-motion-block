---
title: Dock
description: macOS-style dock with magnification effects and smooth animations.
---

The Dock component provides a macOS-style dock with magnification effects and smooth animations. It's highly customizable and supports multiple orientations and sizes.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dock-example" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-6 py-10">
    <MDock
      position="inline"
      variant="bottom"
      :magnification="72"
      :distance="140"
      :panel-height="64"
    >
      <MDockItem
        v-for="app in apps"
        :key="app.name"
        v-slot="{ width, isHovered, scale }"
        :aria-label="app.name"
        @click="lastOpened = app.name"
      >
        <MDockLabel :is-hovered="isHovered">
          {{ app.name }}
        </MDockLabel>
        <MDockIcon
          :width="width"
          :scale="scale"
          :name="app.icon"
          class="text-highlighted"
        />
      </MDockItem>
    </MDock>

    <p class="text-sm text-muted">
      {{ lastOpened ? `Opening ${lastOpened}\u2026` : 'Hover to magnify, click to launch.' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const apps = [
  { name: 'Home', icon: 'i-lucide-home' },
  { name: 'Products', icon: 'i-lucide-package' },
  { name: 'Messages', icon: 'i-lucide-message-circle' },
  { name: 'Mail', icon: 'i-lucide-mail' },
  { name: 'Photos', icon: 'i-lucide-image' },
  { name: 'Music', icon: 'i-lucide-music' },
  { name: 'Settings', icon: 'i-lucide-settings' },
]

const lastOpened = ref<string | null>(null)
</script>
```
::

A macOS-style dock that magnifies items near the pointer.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="dock-custom" />
  :::
#code
  <PlaygroundCode name="Dock" />
::

## Props

### Dock

::component-props
  ::component-prop{name="distance" type="number" default="150"}
  How far the pointer travels from an item before its magnification falls back
  to normal, in pixels.
  ::
  ::component-prop{name="panelHeight" type="number" default="64"}
  Height of the dock panel in pixels.
  ::
  ::component-prop{name="magnification" type="number" default="80"}
  Peak width, in pixels, an icon grows to as the pointer approaches. Icons rest
  at the base size and reach this width at the centre of the pointer's reach.
  ::
  ::component-prop{name="spring" type="SpringOptions" default="{ mass: 0.1, stiffness: 150, damping: 12 }"}
  Spring options used when `animation="spring"`.
  ::
  ::component-prop{name="variant" type="'bottom' | 'top' | 'left' | 'right' | 'floating' | 'compact'" default="'bottom'"}
  Where the dock is fixed and how it is laid out. `left` and `right` orient the
  dock vertically; the rest are horizontal.
  ::
  ::component-prop{name="size" type="'sm' | 'md' | 'lg'" default="'md'"}
  Preset for the dock's gap and padding.
  ::
  ::component-prop{name="position" type="'fixed' | 'inline'" default="'fixed'"}
  Whether the dock is pinned to a viewport edge (`fixed`) or sits in normal
  flow (`inline`). Use `inline` to embed it inside a page or container; the
  `variant` then only sets the orientation.
  ::
  ::component-prop{name="ariaLabel" type="string" default="'Application dock'"}
  Accessible name for the toolbar element.
  ::
  ::component-prop{name="showLabels" type="boolean" default="true"}
  Reserved for suppressing `DockLabel` tooltips; currently labels follow each
  item's hover state regardless of this flag.
  ::
  ::component-prop{name="background" type="'glass' | 'solid' | 'none'" default="'glass'"}
  Panel background: frosted glass, opaque, or nothing.
  ::
  ::component-prop{name="animation" type="'spring' | 'ease' | 'none'" default="'spring'"}
  Declared for the resize behaviour, but sizing currently always runs through
  the rAF loop described under Performance.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the dock panel.
  ::
::

### DockItem

::component-props
  ::component-prop{name="ariaLabel" type="string"}
  Accessible name for the item.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the item wrapper.
  ::
::

### DockIcon

::component-props
  ::component-prop{name="width" type="number" default="48"}
  Current magnified width, supplied by the item. Icon size derives from it.
  ::
  ::component-prop{name="scale" type="number" default="1"}
  Current magnification scale.
  ::
  ::component-prop{name="name" type="string" default="'i-lucide-home'"}
  Nuxt UI icon name.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the icon.
  ::
::

### DockLabel

::component-props
  ::component-prop{name="isHovered" type="boolean" default="false"}
  Whether the tooltip is visible. Passed in by the item's scoped slot.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the tooltip.
  ::
::

## Events

::component-events
  ::component-event{name="click" type="() => void"}
  Emitted by `DockItem` when it is activated by pointer or keyboard.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The dock's items — `DockItem` elements, each typically wrapping a
  `DockLabel` and a `DockIcon`.
  ::
  ::component-slot-row{name="default (DockItem)" type="{ width: number, isHovered: boolean, scale: number }"}
  Scoped slot on `DockItem`, exposing the live magnified `width`, `isHovered`
  and `scale` so the label and icon can track the animation.
  ::
::

## Accessibility

The panel renders as `role="toolbar"` with `aria-orientation` derived from
`variant`. Arrow keys move focus between items (respecting orientation),
Home and End jump to the first and last item, and Escape clears the focused
item and blurs the dock — all through the shared `useKeyboardNavigation`
composable. Every `DockItem` should carry an `ariaLabel`.

Magnification is pointer-driven only: keyboard focus highlights an item
without resizing the dock, so the interaction never depends on the animation.

## Performance

- The dock's `mousemove` handler is throttled to 16ms (one frame at 60fps),
  so magnification recomputes at most once per frame regardless of pointer
  event rate.
- Each `DockItem` sizes itself inside its own `requestAnimationFrame` loop
  that starts when the pointer (or keyboard focus) reaches it and subscribes
  to the shared mouse-motion value — items outside `distance` settle at the
  minimum size without touching layout.
