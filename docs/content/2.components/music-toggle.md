---
title: Music Toggle
description: A record that spins while playing, wrapped in a progress ring, with a waveform and a keyboard-seekable slider.
navigation:
  icon: i-lucide-disc-3
---

# Music Toggle

A record that spins while it plays, a progress ring that draws the elapsed time around
it, and a waveform that shares the pulse. Press the record to toggle, or drive it from
outside.

The component is deliberately split in two. Give it a `src` and it owns an `<audio>`
element, playing and pausing it as the state changes. Omit `src` and it is purely
visual ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â you own playback and you feed it `playing` and `progress`. It also works
controlled or not: pass `playing` and it never mutates its own state, leave it out and
it keeps one internally from `defaultPlaying`.

## Usage

Point it at a file and let it play, or omit `src` and bind `playing` and `progress`
yourself. Bind `v-model:playing` either way ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â that is what the emit carries ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and pass
`on-seek` if you want the slider to be operable.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="music-toggle-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col items-center gap-8 py-6">
    <MMusicToggle
      v-model:playing="playing"
      :progress="progress"
      :on-seek="seek"
      :size="104"
      title="Midnight Drive"
      artist="Nova Kinetic"
      cover="https://picsum.photos/seed/midnight-drive/400/400"
    />

    <div class="flex w-full flex-col gap-1.5">
      <USlider
        v-model="progress"
        :min="0"
        :max="1"
        :step="0.01"
        aria-label="Track progress"
      />
      <span class="text-xs text-muted">
        progress = {{ progress.toFixed(2) }} ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· focus the ring, then use ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â Ãƒâ€šÃ‚Â/ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢, Home or End
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const playing = ref(false)
const progress = ref(0.35)

function seek(value: number) {
  progress.value = value
}
</script>

```
::

## Props

::field-group
  ::field{name="bars" type="number" default="24"}
  Number of waveform bars rendered beside the track info.
  ::
  ::field{name="size" type="number" default="96"}
  Diameter of the record in pixels. Sets both the frame's width and height; the ring
  SVG scales to fit inside it.
  ::
  ::field{name="progress" type="number" default="0"}
  Playback position from 0 to 1. Always controlled ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it is never derived from the audio
  element, even when `src` is set.
  ::
  ::field{name="src" type="string"}
  Audio source. When set, the component renders a hidden `<audio>` and calls `play()`
  or `pause()` as the state changes. When omitted, nothing plays and the component is
  purely visual.
  ::
  ::field{name="title" type="string"}
  Track title. Shown above the artist and included in the accessible names of both the
  record and the slider.
  ::
  ::field{name="artist" type="string"}
  Track artist, shown under the title.
  ::
  ::field{name="cover" type="string"}
  Cover art URL drawn inside the record's centre label.
  ::
  ::field{name="playing" type="boolean"}
  Controlled playing state. Passing it switches the component to controlled mode, where
  it emits `update:playing` but never changes its own state.
  ::
  ::field{name="defaultPlaying" type="boolean" default="false"}
  Initial state for uncontrolled usage, where `playing` is left undefined.
  ::
  ::field{name="onPlayingChange" type="(playing: boolean) => void"}
  Function prop called with the new state whenever it toggles, alongside the
  `update:playing` emit.
  ::
  ::field{name="onSeek" type="(progress: number) => void"}
  Called with a 0ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ1 position when the slider is used. Its presence is what makes the
  slider focusable and keyboard-operable; omit it and the overlay is inert.
  ::
  ::field{name="class" type="string"}
  Merged into the root element's class list.
  ::
  ::field{name="className" type="string"}
  Alias of `class`, kept for parity with the React reference.
  ::
::

## Events

::field-group
  ::field{name="update:playing" type="(playing: boolean) => void"}
  Emitted on every toggle with the state the component wants to move to. In controlled
  mode it does nothing on its own ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â bind it, or use `on-playing-change`.
  ::
::

## Accessibility

The record is a real button: `aria-pressed` reflects the state and its `aria-label`
becomes "Play" or "Pause" followed by the track, so the control is announced with its
action rather than as an icon. With no `title` or `artist` it is just "Play" / "Pause".

The ring overlay is a `role="slider"` with `aria-valuemin` 0, `aria-valuemax` 100 and
`aria-valuenow` set to `progress` as a percentage, labelled "Seek <track>". Its
`tabindex` is `0` only when `onSeek` is supplied ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â otherwise it is `-1` and stays out of
the tab order, mirroring the reference's behaviour of leaving seeking out of reach when
no handler exists. Arrow keys and Home/End then step by 5%.

The overlay is `pointer-events-none` and has no pointer handler, so seeking is
keyboard-only; there is no drag or click-to-seek. The waveform, ring and cover art are
all `aria-hidden`.

Reduced motion is respected properly here: the rotation loop and the play/pause icon
spring both check `useReducedMotion()`, and the ring's dash offset drops to a `0`
duration transition.

## Performance

- The record's rotation is a hand-written `requestAnimationFrame` loop writing
  `style.rotate` directly, not a MotionValue ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â motion-v snapshots MotionValues bound
  through `:style`. Its tick locals are deliberately non-reactive, so no frame triggers
  a re-render.
- The loop resolves the record element lazily on the first frame, because function refs
  on `motion.*` do not resolve. It starts from `onMounted`, never during SSR, and is
  cancelled in `onBeforeUnmount`.
- The loop runs only while playing and motion is allowed; stopping it and starting it
  are keyed off `watch([playing, shouldReduceMotion])`.
- `progress` is watched with a non-immediate watcher, so passing `defaultPlaying` does
  not kick off playback on mount ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it starts on the first change.
- `play()` rejections are swallowed: a blocked autoplay leaves the visual state alone
  rather than throwing.
- The play/pause swap is wrapped in `<AnimatePresence :initial="false">`, and the source
  notes that motion-v's `AnimatePresence` does not implement `mode="wait"` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â both icons
  stay mounted during the swap and are centred on top of each other. Treat it as a
  crossfade, not a sequential hand-off. The ring's dash offset is a plain
  `motion.circle` with no presence wrapper at all, so it simply re-targets.

::tip
`progress` is entirely yours to own. When you pass `src`, the component plays and
pauses the audio but never reads `currentTime`, so the ring and waveform only advance if
you update `progress` yourself ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â from a `timeupdate` listener, an
`AudioContext`, or a plain `setInterval`. The `<audio>` element it renders is hidden
and carries a `<track kind="captions">` with no `src`, so captions are not wired up for
you either.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.musicToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'inline-flex items-center gap-3'` |
| `recordFrame` | `'relative shrink-0'` |
| `seek` | `'pointer-events-none absolute inset-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default'` |
| `ring` | `'h-full w-full -rotate-90'` |
| `ringTrack` | `'text-dimmed'` |
| `ringProgress` | `'text-primary'` |
| `disc` | `'absolute inset-[10%] overflow-hidden rounded-full border border-default bg-muted'` |
| `cover` | `'h-full w-full object-cover'` |
| `coverFallback` | `'h-full w-full bg-gradient-to-br from-primary/40 to-primary/10'` |
| `discCenter` | `'absolute inset-[38%] rounded-full bg-default'` |
| `toggle` | `'absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-default text-highlighted shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default'` |
| `iconWrapper` | `'absolute inset-0 flex items-center justify-center'` |
| `icon` | `'size-4 fill-current'` |
| `info` | `'flex flex-col gap-1.5'` |
| `text` | `'flex flex-col'` |
| `title` | `'text-sm font-medium text-highlighted'` |
| `artist` | `'text-xs text-muted'` |
| `bars` | `'flex h-5 items-end gap-[2px]'` |
| `bar` | `'w-[2px] rounded-full bg-inverted/70'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.musicToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex items-center gap-3` |
| `recordFrame` | `relative shrink-0` |
| `seek` | `pointer-events-none absolute inset-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `ring` | `h-full w-full -rotate-90` |
| `ringTrack` | `text-dimmed` |
| `ringProgress` | `text-primary` |
| `disc` | `absolute inset-[10%] overflow-hidden rounded-full border border-default bg-muted` |
| `cover` | `h-full w-full object-cover` |
| `coverFallback` | `h-full w-full bg-gradient-to-br from-primary/40 to-primary/10` |
| `discCenter` | `absolute inset-[38%] rounded-full bg-default` |
| `toggle` | `absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-default text-highlighted shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `iconWrapper` | `absolute inset-0 flex items-center justify-center` |
| `icon` | `size-4 fill-current` |
| `info` | `flex flex-col gap-1.5` |
| `text` | `flex flex-col` |
| `title` | `text-sm font-medium text-highlighted` |
| `artist` | `text-xs text-muted` |
| `bars` | `flex h-5 items-end gap-[2px]` |
| `bar` | `w-[2px] rounded-full bg-inverted/70` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.musicToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex items-center gap-3` |
| `recordFrame` | `relative shrink-0` |
| `seek` | `pointer-events-none absolute inset-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `ring` | `h-full w-full -rotate-90` |
| `ringTrack` | `text-dimmed` |
| `ringProgress` | `text-primary` |
| `disc` | `absolute inset-[10%] overflow-hidden rounded-full border border-default bg-muted` |
| `cover` | `h-full w-full object-cover` |
| `coverFallback` | `h-full w-full bg-gradient-to-br from-primary/40 to-primary/10` |
| `discCenter` | `absolute inset-[38%] rounded-full bg-default` |
| `toggle` | `absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-default text-highlighted shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `iconWrapper` | `absolute inset-0 flex items-center justify-center` |
| `icon` | `size-4 fill-current` |
| `info` | `flex flex-col gap-1.5` |
| `text` | `flex flex-col` |
| `title` | `text-sm font-medium text-highlighted` |
| `artist` | `text-xs text-muted` |
| `bars` | `flex h-5 items-end gap-[2px]` |
| `bar` | `w-[2px] rounded-full bg-inverted/70` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.musicToggle` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `inline-flex items-center gap-3` |
| `recordFrame` | `relative shrink-0` |
| `seek` | `pointer-events-none absolute inset-0 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `ring` | `h-full w-full -rotate-90` |
| `ringTrack` | `text-dimmed` |
| `ringProgress` | `text-primary` |
| `disc` | `absolute inset-[10%] overflow-hidden rounded-full border border-default bg-muted` |
| `cover` | `h-full w-full object-cover` |
| `coverFallback` | `h-full w-full bg-gradient-to-br from-primary/40 to-primary/10` |
| `discCenter` | `absolute inset-[38%] rounded-full bg-default` |
| `toggle` | `absolute inset-[38%] z-10 flex items-center justify-center rounded-full bg-default text-highlighted shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-default` |
| `iconWrapper` | `absolute inset-0 flex items-center justify-center` |
| `icon` | `size-4 fill-current` |
| `info` | `flex flex-col gap-1.5` |
| `text` | `flex flex-col` |
| `title` | `text-sm font-medium text-highlighted` |
| `artist` | `text-xs text-muted` |
| `bars` | `flex h-5 items-end gap-[2px]` |
| `bar` | `w-[2px] rounded-full bg-inverted/70` |
