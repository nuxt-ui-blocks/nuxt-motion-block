---
title: Drawer
description: A slide-in panel with animated content and optional handle.
---

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
      <UButton
        label="Open Drawer"
        @click="open = true"
      />
      <MDrawer
        v-model:open="open"
        title="Drawer"
        description="A simple drawer example"
      >
        <template #body>
          <div class="flex flex-col gap-2">
            <p class="text-sm text-muted">
              This is the drawer body content.
            </p>
            <UButton
              label="Close"
              @click="open = false"
            />
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

## Direction

The `direction` prop slides the panel in from any edge. The drag handle is only rendered for the `bottom` direction, so the other directions show a plain edge.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full"}
    <component-example name="drawer-directions" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4">
    <div class="flex flex-wrap justify-center gap-3">
      <UButton
        v-for="item in directions"
        :key="item.value"
        :label="item.label"
        color="neutral"
        variant="soft"
        @click="openFrom(item.value)"
      />
    </div>

    <MDrawer
      v-model:open="open"
      :direction="direction"
      :title="`${activeLabel} drawer`"
      :description="`This panel slides in from the ${direction}.`"
    >
      <template #body>
        <div class="flex flex-col gap-3">
          <p class="text-sm text-muted">
            One component, four directions. Choose another button to watch the
            panel slide in from a different edge.
          </p>
          <UButton
            label="Close"
            color="neutral"
            variant="soft"
            @click="open = false"
          />
        </div>
      </template>
    </MDrawer>
  </div>
</template>

<script setup lang="ts">
type Direction = 'bottom' | 'top' | 'left' | 'right'

const directions = [
  { label: 'Bottom', value: 'bottom' as Direction },
  { label: 'Top', value: 'top' as Direction },
  { label: 'Left', value: 'left' as Direction },
  { label: 'Right', value: 'right' as Direction },
]

const open = ref(false)
const direction = ref<Direction>('bottom')

const activeLabel = computed(
  () => directions.find(item => item.value === direction.value)?.label ?? '',
)

const openFrom = (value: Direction) => {
  direction.value = value
  open.value = true
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="drawer-custom" />
  :::
#code
  <PlaygroundCode name="Drawer" />
::

## Props

::component-props
  ::component-prop{name="open" type="boolean" default="undefined"}
  Controlled open state. Use with `v-model:open`.
  ::
  ::component-prop{name="defaultOpen" type="boolean" default="undefined"}
  Initial open state when uncontrolled.
  ::
  ::component-prop{name="direction" type="'bottom' | 'top' | 'left' | 'right'" default="'bottom'"}
  The direction from which the drawer slides in.
  ::
  ::component-prop{name="title" type="string" default="undefined"}
  Title text for the default header.
  ::
  ::component-prop{name="description" type="string" default="undefined"}
  Description text for the default header.
  ::
  ::component-prop{name="inset" type="boolean" default="false"}
  Whether the drawer is inset (not full width/height).
  ::
  ::component-prop{name="overlay" type="boolean" default="true"}
  Whether to show the backdrop overlay.
  ::
  ::component-prop{name="handle" type="boolean" default="true"}
  Whether to show the drawer handle.
  ::
  ::component-prop{name="animatedHandle" type="boolean" default="true"}
  Whether to animate the handle with a pulsing effect (only applies when direction is 'bottom').
  ::
  ::component-prop{name="portal" type="string | boolean | HTMLElement" default="true"}
  Whether to render the drawer in a portal.
  ::
  ::component-prop{name="nested" type="boolean" default="false"}
  Whether this is a nested drawer.
  ::
  ::component-prop{name="close" type="boolean | object" default="false"}
  Whether to show the close button.
  ::
  ::component-prop{name="closeIcon" type="string" default="undefined"}
  Icon name for the close button.
  ::
  ::component-prop{name="dismissible" type="boolean" default="true"}
  Whether the drawer can be dismissed by clicking overlay or pressing Escape.
  ::
  ::component-prop{name="modal" type="boolean" default="true"}
  Whether to trap focus in the drawer.
  ::
  ::component-prop{name="fixed" type="boolean" default="undefined"}
  Whether the drawer has fixed positioning.
  ::
  ::component-prop{name="handleOnly" type="boolean" default="false"}
  Whether to only show the handle.
  ::
  ::component-prop{name="snapPoints" type="(string | number)[]" default="undefined"}
  Snap points for the drawer (for bottom/top directions).
  ::
  ::component-prop{name="activeSnapPoint" type="string | number | null" default="undefined"}
  Currently active snap point.
  ::
  ::component-prop{name="closeThreshold" type="number" default="undefined"}
  Threshold for closing the drawer when dragging.
  ::
  ::component-prop{name="shouldScaleBackground" type="boolean" default="undefined"}
  Whether to scale the background when drawer is open (bottom direction).
  ::
  ::component-prop{name="setBackgroundColorOnScale" type="boolean" default="true"}
  Whether to set background color when scaling.
  ::
  ::component-prop{name="noBodyStyles" type="boolean" default="undefined"}
  Whether to prevent modifying body styles.
  ::
  ::component-prop{name="preventScrollRestoration" type="boolean" default="undefined"}
  Whether to prevent scroll restoration.
  ::
  ::component-prop{name="ui" type="Record<string, any>" default="() => ({})"}
  Custom UI configuration passed to UDrawer.
  ::
::

## Events

::component-events
  ::component-event{name="update:open" type="(value: boolean) => void"}
  Emitted when the open state changes.
  ::
  ::component-event{name="close" type="() => void"}
  Emitted when the drawer is closed.
  ::
  ::component-event{name="drag" type="(percentageDragged: number) => void"}
  Emitted during dragging.
  ::
  ::component-event{name="release" type="(open: boolean) => void"}
  Emitted on drag release.
  ::
  ::component-event{name="animationEnd" type="(open: boolean) => void"}
  Emitted when animations end.
  ::
  ::component-event{name="update:activeSnapPoint" type="(val: string | number) => void"}
  Emitted when active snap point changes.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Default slot content inside the drawer.
  ::
  ::component-slot-row{name="header"}
  Custom header content. Overrides `title`/`description`.
  ::
  ::component-slot-row{name="title"}
  Custom title slot.
  ::
  ::component-slot-row{name="description"}
  Custom description slot.
  ::
  ::component-slot-row{name="actions"}
  Actions slot (typically for buttons).
  ::
  ::component-slot-row{name="body"}
  Main body content of the drawer.
  ::
  ::component-slot-row{name="footer"}
  Footer content (typically for actions).
  ::
  ::component-slot-row{name="close" type="(props: { ui: any }) => void"}
  Custom close button slot.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.drawer` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="overlay"}
  `bg-default/50 backdrop-blur-sm`
  ::
  ::component-slot-row{name="content"}
  `flex flex-1 flex-col`
  ::
  ::component-slot-row{name="handle"}
  `mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-accented`
  ::
  ::component-slot-row{name="header"}
  `px-6 py-4 border-b border-default`
  ::
  ::component-slot-row{name="body"}
  `flex-1 overflow-y-auto px-6 py-4`
  ::
  ::component-slot-row{name="footer"}
  `px-6 py-4 border-t border-default`
  ::
  ::component-slot-row{name="headerContent"}
  `flex flex-col gap-1`
  ::
  ::component-slot-row{name="title"}
  `text-lg font-semibold text-highlighted`
  ::
  ::component-slot-row{name="description"}
  `text-sm text-muted`
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

