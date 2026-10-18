---
title: Drawer
description: A slide-in panel with animated content and optional handle.
navigation:
  icon: i-lucide-panel-right
---

# Drawer

A slide-in drawer built on Nuxt UI's `UDrawer` with animated entrance/exit transitions and staggered child animations. The drawer slides in from the specified direction and animates its header, body, and footer content with motion effects.

## Usage

Use `v-model:open` to control the drawer's visibility. You can provide `title` and `description` for a default header, or use the `header` slot for custom content. The `body` slot contains the main content.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="drawer-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md justify-center">
    <div class="flex flex-col gap-3">
      <UButton label="Open Drawer" @click="open = true" />
      <MDrawer v-model:open="open" title="Drawer" description="A simple drawer example">
        <template #body>
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted">This is the drawer body content.</p>
            <UButton label="Close" @click="open = false" />
          </div>
        </template>
      </MDrawer>
    </div>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
```
::

## Props

::field-group
  ::field{name="open" type="boolean" default="undefined"}
  Controlled open state. Use with `v-model:open`.
  ::
  ::field{name="defaultOpen" type="boolean" default="undefined"}
  Initial open state when uncontrolled.
  ::
  ::field{name="direction" type="'bottom' | 'top' | 'left' | 'right'" default="'bottom'"}
  The direction from which the drawer slides in.
  ::
  ::field{name="title" type="string" default="undefined"}
  Title text for the default header.
  ::
  ::field{name="description" type="string" default="undefined"}
  Description text for the default header.
  ::
  ::field{name="inset" type="boolean" default="false"}
  Whether the drawer is inset (not full width/height).
  ::
  ::field{name="overlay" type="boolean" default="true"}
  Whether to show the backdrop overlay.
  ::
  ::field{name="handle" type="boolean" default="true"}
  Whether to show the drawer handle.
  ::
  ::field{name="animatedHandle" type="boolean" default="true"}
  Whether to animate the handle with a pulsing effect (only applies when direction is 'bottom').
  ::
  ::field{name="portal" type="string | boolean | HTMLElement" default="true"}
  Whether to render the drawer in a portal.
  ::
  ::field{name="nested" type="boolean" default="false"}
  Whether this is a nested drawer.
  ::
  ::field{name="close" type="boolean | object" default="false"}
  Whether to show the close button.
  ::
  ::field{name="closeIcon" type="string" default="undefined"}
  Icon name for the close button.
  ::
  ::field{name="dismissible" type="boolean" default="true"}
  Whether the drawer can be dismissed by clicking overlay or pressing Escape.
  ::
  ::field{name="modal" type="boolean" default="true"}
  Whether to trap focus in the drawer.
  ::
  ::field{name="fixed" type="boolean" default="undefined"}
  Whether the drawer has fixed positioning.
  ::
  ::field{name="handleOnly" type="boolean" default="false"}
  Whether to only show the handle.
  ::
  ::field{name="snapPoints" type="(string | number)[]" default="undefined"}
  Snap points for the drawer (for bottom/top directions).
  ::
  ::field{name="activeSnapPoint" type="string | number | null" default="undefined"}
  Currently active snap point.
  ::
  ::field{name="closeThreshold" type="number" default="undefined"}
  Threshold for closing the drawer when dragging.
  ::
  ::field{name="shouldScaleBackground" type="boolean" default="undefined"}
  Whether to scale the background when drawer is open (bottom direction).
  ::
  ::field{name="setBackgroundColorOnScale" type="boolean" default="true"}
  Whether to set background color when scaling.
  ::
  ::field{name="noBodyStyles" type="boolean" default="undefined"}
  Whether to prevent modifying body styles.
  ::
  ::field{name="preventScrollRestoration" type="boolean" default="undefined"}
  Whether to prevent scroll restoration.
  ::
  ::field{name="ui" type="Record<string, any>" default="() => ({})"}
  Custom UI configuration passed to UDrawer.
  ::
::

## Events

::field-group
  ::field{name="update:open" type="(value: boolean) => void"}
  Emitted when the open state changes.
  ::
  ::field{name="close" type="() => void"}
  Emitted when the drawer is closed.
  ::
  ::field{name="drag" type="(percentageDragged: number) => void"}
  Emitted during dragging.
  ::
  ::field{name="release" type="(open: boolean) => void"}
  Emitted on drag release.
  ::
  ::field{name="animationEnd" type="(open: boolean) => void"}
  Emitted when animations end.
  ::
  ::field{name="update:activeSnapPoint" type="(val: string | number) => void"}
  Emitted when active snap point changes.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Default slot content inside the drawer.
  ::
  ::field{name="header"}
  Custom header content. Overrides `title`/`description`.
  ::
  ::field{name="title"}
  Custom title slot.
  ::
  ::field{name="description"}
  Custom description slot.
  ::
  ::field{name="actions"}
  Actions slot (typically for buttons).
  ::
  ::field{name="body"}
  Main body content of the drawer.
  ::
  ::field{name="footer"}
  Footer content (typically for actions).
  ::
  ::field{name="close" type="(props: { ui: any }) => void"}
  Custom close button slot.
  ::
::

## Accessibility

The drawer uses Nuxt UI's `UDrawer` under the hood, which provides proper focus trapping (when `modal` is true), ARIA attributes, and keyboard support (Escape to dismiss when `dismissible`). The animated handle is marked `aria-hidden="true"` as a decorative element. Content animations respect `prefers-reduced-motion` via `useReducedMotion()` - when reduced motion is preferred, opacity transitions are skipped or made instant while preserving functionality.

## Performance

- Uses `AnimatePresence` for enter/exit animations with reduced-motion-aware transitions.
- Content (header, body, footer) animates with staggered delays (base 120ms + 50ms per child) for a polished entrance, but disabled under reduced motion.
- Handle pulses with a 2-second loop when animated and direction is bottom; disabled under reduced motion.
- Overlay fade duration is 200ms (or 0 under reduced motion).
- Transforms are used sparingly; child animations use small y-offsets for natural motion.
- All motion values are computed reactively with `useReducedMotion()` checks to avoid unnecessary animations for accessibility.

::tip
Set `animatedHandle` to `false` if you prefer a static handle. For side drawers, the handle is hidden regardless of this prop.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.drawer` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `overlay` | `bg-default/50 backdrop-blur-sm` |
| `content` | `flex flex-1 flex-col` |
| `handle` | `mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-accented` |
| `header` | `px-6 py-4 border-b border-default` |
| `body` | `flex-1 overflow-y-auto px-6 py-4` |
| `footer` | `px-6 py-4 border-t border-default` |
| `headerContent` | `flex flex-col gap-1` |
| `title` | `text-lg font-semibold text-highlighted` |
| `description` | `text-sm text-muted` |
