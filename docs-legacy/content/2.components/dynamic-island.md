---
title: Dynamic Island
description: A pill that morphs between five system-style views — idle, incoming call, timer, notification and now playing.
navigation:
  icon: i-lucide-pill
---

# Dynamic Island

A black pill that grows and shrinks to fit whichever system-style view it is
showing: a resting cloud that reveals the temperature on hover, an incoming
call, a 60-second timer with a progress track, a notification, and a now-playing
row with transport controls. Switching views is one keyed remount plus a layout
animation, so the pill's width animates between the two states instead of
snapping.

The pill is driven by its own switcher, which is rendered below it as a row of
five icon buttons — there is no prop to hide it, so on a real surface you either
cover it or you drive the view yourself.

The spring's bounce is per transition, not per view: the component keeps a
`from-to` key and looks the bounce up in a table, so `idle → music` and
`idle → timer` do not feel like the same switch. Two states the table does not
name fall back to `0.5`.

Content is keyed on `activeView`, which mirrors the reference implementation's
remount. That is deliberate: each view owns fresh state, so the idle temperature
starts hidden, the transport starts playing, and the timer restarts from 60 every
time you come back to it.

## Usage

Leave `view` undefined and the island manages itself through the switcher it
renders. Pass `view` to take control, and listen to `update:view` so the
built-in switcher keeps working — otherwise clicking it will do nothing, because
a controlled view is only ever the value you give it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="dynamic-island-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="overflow-hidden rounded-3xl bg-neutral-950 dark:bg-black">
      <MDynamicIsland
        :view="view"
        @update:view="selected = $event"
      />
    </div>

    <div class="flex items-center justify-between gap-3">
      <p class="text-xs text-muted">
        Switch views with the pill below it, or take control from here.
      </p>
      <USelect
        v-model="selected"
        :items="options"
        size="sm"
        class="w-36"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
type IslandView = 'idle' | 'ring' | 'timer' | 'notification' | 'music'

const options = [
  { label: 'Self-driven', value: 'self-driven' },
  { label: 'Idle', value: 'idle' },
  { label: 'Ring', value: 'ring' },
  { label: 'Timer', value: 'timer' },
  { label: 'Notification', value: 'notification' },
  { label: 'Music', value: 'music' },
]

const selected = ref('self-driven')

// Leaving `view` undefined hands control back to the island's own switcher.
const view = computed<IslandView | undefined>(() =>
  selected.value === 'self-driven' ? undefined : (selected.value as IslandView),
)
</script>
```
::

## Views

| View | Width | Contents | Slot to override |
| --- | --- | --- | --- |
| `idle` | intrinsic, `min-w-[100px]` | Cloud icon; a thermometer and `12°C` that expand in on hover | `idle` |
| `ring` | `w-64` | Phone icon, "Incoming Call", caller name, pulsing dot | `ring` |
| `timer` | `w-64` | Timer icon, whole seconds remaining, amber progress track | `timer` |
| `notification` | `w-72` | Bell, "New Message", yellow count chip | — |
| `music` | `w-72` | Track and artist, skip/play/skip transport | — |

Three of the five views are overridable. `notification` and `music` render their
markup inline with no slot, so the island's own "you have a new notification"
copy is fixed.

## Props

::field-group
  ::field{name="view" type="'idle' | 'ring' | 'timer' | 'notification' | 'music'" default="undefined"}
  Controlled view. Left `undefined`, the island uses its internal state and its
  own switcher drives it. Set it and you own the value — pass `@update:view` so
  the switcher still appears to work.
  ::
  ::field{name="onViewChange" type="(view: DynamicIslandView) => void"}
  The change callback, as a prop rather than only an emit, so `@view-change`
  works as well as `v-model:view` (which lands on `update:view`). Both are called
  on every view change, including the ones the built-in switcher makes.
  ::
  ::field{name="class" type="string"}
  Merged onto the outer container, which is `h-[200px]`. The height is fixed —
  it is the room the pill and its switcher need — so `class` is for background
  and spacing, not for sizing.
  ::
::

## Events

::field-group
  ::field{name="update:view" type="(view: DynamicIslandView) => void"}
  Fired with the new view whenever it changes. This is what backs
  `v-model:view`, and it fires from the built-in switcher as well as from a
  controlled prop round-trip.
  ::
::

## Slots

::field-group
  ::field{name="idle"}
  Replaces the resting view's contents. The hover handlers that reveal the
  temperature live on the wrapper around the slot, so an overridden `idle` view
  still gets them — but the temperature markup itself is part of the fallback,
  so you lose it along with the icon.
  ::
  ::field{name="ring"}
  Replaces the incoming-call row: icon, caller block and the pulsing indicator.
  The view's `w-64` container is not part of the slot, so your content inherits
  that width.
  ::
  ::field{name="timer"}
  Replaces the timer row: icon, the seconds label and the progress track. The
  countdown and the track's animation both look for the element you would expect
  here — see the tip below.
  ::
::

## Accessibility

The root container is a plain `<div>` with no role and no live region, so a view
change is completely silent to a screen reader. Attribute inheritance is off and
`$attrs` is bound to the root, so the fix is cheap: put
`aria-live="polite"` (or `role="status"`) on `<MDynamicIsland>` and the pill's
contents become the announcement.

The transport buttons in the music view are properly labelled —
`aria-label="Previous track"`, a play/pause label that flips with state, and
`aria-pressed` on the play toggle. The five switcher buttons carry the view name
as their `aria-label` and `aria-pressed` for the active one. Nothing else in the
component is focusable by default, and there is no focus management across view
changes: the remount drops focus if it was inside the old view.

Reduced motion is honoured for the pill and the content: the layout spring drops
to `duration: 0` and the content animates `opacity` and `scale` only, dropping
the `blur(5px)` that otherwise opens the new view.

## Performance

- The countdown is split in two: a 1s `setInterval` updates the integer seconds
  label, and a self-rescheduling `requestAnimationFrame` writes the progress
  track's `style.width` directly to the DOM. The 60fps part never goes through
  Vue reactivity.
- Both loops are torn down when the island leaves the timer view and again in
  `onBeforeUnmount`, and the progress element reference is dropped with them so
  the next entry re-resolves it.
- The progress element is resolved lazily on the first animation frame rather
  than on view change, because the keyed subtree has not necessarily been patched
  yet at that instant.
- View content is keyed on `activeView`, so switching remounts one small subtree
  rather than diffing five of them, and per-view refs reset for free.
- Only two springs run per switch — the pill's layout animation and the content's
  entrance — and the content entrance is delayed `0.05s` so the pill is already
  moving when the new content appears.

::tip
The timer's progress track is found by querying the island's own DOM for
`[data-island-progress]`. Override the `timer` slot without an element carrying
that attribute and the countdown label keeps ticking but the progress bar
silently never appears — the animation frame loop keeps running and finds
nothing. Add `data-island-progress` to your own element to bring it back.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.dynamicIsland` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `h-[200px]` |
| `inner` | `relative flex h-full w-full flex-col justify-center` |
| `pill` | `mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black` |
| `content` |  |
| `idle` | `flex items-center gap-2 px-3 py-2` |
| `idleIcon` | `h-5 w-5 text-white` |
| `temperature` | `flex items-center gap-1 overflow-hidden text-white` |
| `temperatureIcon` | `h-3 w-3` |
| `temperatureValue` | `pointer-events-none whitespace-nowrap text-white text-xs` |
| `ring` | `flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white` |
| `timer` | `flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white` |
| `notification` | `flex w-64 items-center gap-3 overflow-hidden px-4 py-2 text-white` |
| `music` | `flex w-72 items-center gap-3 overflow-hidden px-4 py-2 text-white` |
| `track` | `absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 justify-center gap-1 rounded-full border bg-default p-1` |
| `dot` | `flex size-8 cursor-pointer items-center justify-center rounded-full border border-default bg-primary px-2 text-inverted` |
| `dotIcon` | `size-3` |
