---
title: Toolbar adaptive
description: A pill toolbar that expands in place from a compact icon rail to a wider action bar.
navigation:
  icon: i-lucide-align-justify
---

# Toolbar adaptive

A floating glass toolbar that grows sideways when you press the menu button and
collapses back to its icon rail. Two widths — `collapsedWidth` and `width` — are
animated on the root, and the expanded region fades and widens inside an
`AnimatePresence`.

The collapse is not a separate state you manage: a `mousedown` listener on
`document` closes it whenever the press lands outside the toolbar, so the bar
never stays open behind whatever you just clicked.

## Usage

Put one or more icon buttons in the default slot — those are what stays visible
when collapsed. Put the full set of actions in the `expanded` slot. Listen to
`open` and `close` if you need to pause something while the toolbar is wide.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="toolbar-dynamic-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-6">
    <div class="flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-default text-sm text-muted">
      Last event: {{ lastEvent }}
    </div>

    <MToolbarDynamic
      @open="lastEvent = 'open'"
      @close="lastEvent = 'close'"
    >
      <UButton
        variant="ghost"
        size="sm"
        square
        icon="i-lucide-pen"
      />
      <template #expanded>
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">Editing</span>
          <UButton
            variant="ghost"
            size="sm"
            square
            icon="i-lucide-trash-2"
          />
          <UButton
            variant="ghost"
            size="sm"
            square
            icon="i-lucide-share-2"
          />
        </div>
      </template>
    </MToolbarDynamic>
  </div>
</template>

<script setup lang="ts">
const lastEvent = ref('none')
</script>
```
::

## Props

::field-group
  ::field{name="width" type="string" default="'300px'"}
  Width the toolbar animates to when expanded. Any CSS length the browser can
  resolve, because it is applied straight to the root's inline `style.width` —
  if the content inside the `expanded` slot needs more than this, it will be
  clipped by the root's `overflow-hidden`.
  ::
  ::field{name="collapsedWidth" type="string" default="'98px'"}
  Width when collapsed. Sized to fit the toggle button (`w-12`) plus a small
  padding run of collapsed icons; raise it if your default-slot buttons are
  wider than one or two.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the root toolbar element, after its own classes — useful for
  positioning (`absolute`, `bottom-6`) since the root is otherwise a plain
  static flex row.
  ::
::

## Events

::field-group
  ::field{name="open" type="() => void"}
  Emitted when the toolbar expands, from the toggle button.
  ::
  ::field{name="close" type="() => void"}
  Emitted both when the toggle collapses it and when a click outside the toolbar
  dismisses it. The outside-click path is guarded by the current state, so
  clicking away from an already-closed toolbar does not emit.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The always-visible icon rail. Mounted only while collapsed — `v-if="!isOpen"`
  gates it — so any state it holds is destroyed on expand and re-created on
  collapse.
  ::
  ::field{name="expanded"}
  The wider action region revealed after the toggle. Wrapped in its own
  `AnimatePresence` so it fades and wipes open and closed.
  ::
::

## Accessibility

The toggle is a `UButton` and its icon swaps between `i-lucide-menu` and
`i-lucide-x`, but there is **no** `aria-expanded`, no `aria-controls` and no
`aria-label` on it — a screen reader will announce only "button". If the toolbar
does anything meaningful, label the button and wire `aria-expanded` yourself.

Dismissal is bound to `mousedown` on `document`, not to a focus-out or an Escape
key, so keyboard users cannot close it with Escape. Both are gaps worth covering
in your own wrapper.

There is no `prefers-reduced-motion` handling: the width spring and the
expanded region's fade both play regardless.

## Performance

- Every animation inherits one shared `MotionConfig` transition (`spring`,
  `bounce: 0.1`, `duration: 0.2`), so you cannot tune the two motions
  independently without overriding `MotionConfig`.
- `toolbarWidth` is a `computed` over `isOpen`, so the inline style is
  recomputed only on a state flip, not per frame.
- The root carries `layout`, handing the width change to motion-v's layout
  projection rather than a manual transition on two elements.
- One `mousedown` listener is attached on mount and removed on unmount — no
  `resize` observers and no animation frames owned by the component.

::tip
The expanded region animates `width` from `0` to `auto`. `auto` is not
interpolatable, so motion-v measures the natural width once at mount and drives
the reveal from that. Because the root clips with `overflow-hidden`, the wipe is
produced by the parent's edge rather than by the panel's own content — which is
why a too-narrow `width` looks like a hard cut instead of a partial reveal.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.toolbarDynamic` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `relative flex items-center h-12 rounded-2xl bg-default/80 dark:bg-default/80 backdrop-blur-xl border border-default/10 dark:border-default/10 shadow-2xl shadow-black/20 overflow-hidden` |
| `inner` | `flex items-center justify-center h-full shrink-0 overflow-hidden whitespace-nowrap` |
| `toggle` | `flex items-center justify-center w-12 h-full shrink-0` |
| `collapsed` | `flex items-center gap-1 pr-3 shrink-0` |
| `expanded` | `flex-1 flex items-center h-full px-4` |
