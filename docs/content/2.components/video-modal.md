---
title: Video Modal
description: A modal that mounts a native video element, plays it when it opens and pauses it when it closes.
navigation:
  icon: i-lucide-video
---

# Video Modal

A `UModal` whose content is a native `<video controls>` with a spring entrance.
The part worth knowing is not the animation but the lifecycle: the element only
exists while the modal is open, so the component plays it on open and pauses it
on close, driven by a watcher on `open`.

Because playback is triggered imperatively rather than by the `autoplay`
attribute alone, closing the modal genuinely stops the audio instead of leaving
it running behind the overlay.

The `open` watcher is not `immediate`, so a modal that is already open on first
render does not call `play()` ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â it waits for the first *change* to `open`.

## Usage

Drive `open` yourself and pass a `src`; the trigger goes in the default slot. A
`poster` is worth setting, because it is the frame the user sees during the
entrance and while the browser fetches the first chunk.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="video-modal-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MVideoModal
      v-model:open="open"
      :src="src"
      :poster="poster"
    >
      <UButton
        label="Watch the tour"
        icon="i-lucide-play"
      />
    </MVideoModal>

    <p class="text-xs text-muted">
      The element mounts with the modal and is told to play on open, pause on close.
    </p>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)

const src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
const poster = 'https://picsum.photos/seed/video-modal-poster/800/450'
</script>
```
::

## Props

::field-group
  ::field{name="src" type="string"}
  Required. Set as the `src` of the `<video>` element, which is created with the
  modal's content ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â so changing it while the modal is closed costs nothing, and
  changing it while open swaps the source in place.
  ::
  ::field{name="poster" type="string" default="''"}
  The poster frame. Set as the native `poster` attribute and shown before
  playback starts; also what is visible during the entrance spring.
  ::
  ::field{name="autoplay" type="boolean" default="false"}
  Set as the native `autoplay` attribute. Note that it is effectively
  decorative here: the `open` watcher calls `play()` unconditionally whenever
  the modal opens, regardless of this value, so the video starts either way.
  The rejection is swallowed with `.catch(() => {})`.
  ::
  ::field{name="open" type="boolean" default="false"}
  Controlled open state. The component holds no state of its own here ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â it
  forwards to `UModal` and emits `update:open` back out, so `v-model:open` is
  the intended usage.
  ::
::

## Events

::field-group
  ::field{name="update:open" type="(value: boolean) => void"}
  Emitted from the underlying modal. Dismissal through the overlay, Escape, the
  close button, or the trigger all arrive here ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â this is what makes
  `v-model:open` work.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  The trigger, forwarded to `UModal`'s default slot. It is the only thing you
  can put here; the panel itself is the video element and takes no slot.
  ::
::

## Accessibility

Semantics are entirely `UModal`'s: `role="dialog"`, `aria-modal`, a focus trap,
Escape to dismiss, and focus restored to the trigger on close. The video renders
with the native `controls` attribute, so playback, seeking, volume, fullscreen
and captions are all keyboard-operable without any extra work.

What the component does not do is label or caption the video. There is no
`aria-label`, no `<track>` support and no way to pass attributes to the element ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â
it is rendered from a fixed set of attributes, so if your video has captions you
will need to reach past this component. Pair it with a transcript link outside
the modal.

There is no reduced-motion branch. The entrance spring
(`stiffness: 300, damping: 25`, scaling from `0.95`) and the matching exit play
unconditionally.

## Performance

- The `<video>` element is created with the modal's content and destroyed with
  it, so a closed modal holds no decoder, no buffer and no network connection.
- Playback control runs through a `nextTick` before touching the ref, so the
  element is guaranteed to exist on the tick the watcher fires ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and the code
  bails out cleanly if it does not.
- The rejected-`play()` promise is caught and ignored, which keeps a blocked
  unmuted autoplay from surfacing as an unhandled rejection in the console.
- `opacity` and `scale` only; no layout property is animated, so opening the
  modal does not reflow the page behind it.

::tip
`play()` is called on every open with no `muted` and no user-gesture check, and
browsers block unmuted programmatic playback that was not preceded by a click.
In practice the user clicks the trigger first, which usually satisfies the
policy ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â but if the modal is opened programmatically (a route change, a
notification tap), the promise rejects silently and the poster simply stays
until the user presses play.
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.videoModal` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` |  |
| `container` | `relative` |
| `video` | `w-full rounded-lg` |
