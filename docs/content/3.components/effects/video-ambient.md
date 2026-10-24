---
title: Video Ambient
description: A video player with an ambient glow sampled from its own frames.
---

A video with light spilling out of it. Two passes make the effect read: an inner
glow scaled just past the player's edges, and a much larger, softer, more
saturated bloom behind it. Both are drawn from the same 24×14 grab, so the bleed
costs two `drawImage` calls per sample regardless of the video's real
resolution.

No pixel data is ever read back, so the effect survives a cross-origin source
with no CORS headers. The one thing that can still fail is `drawImage` itself,
which a handful of strict configurations throw on for a tainted source; that
failure is caught and the glow falls back to a blurred poster or a theme-coloured
gradient.

## Usage

Pass `src` and a required `alt`. Playback starts once the component is mounted,
muted and looping, which is what makes autoplay acceptable to the browser.

The player has no intrinsic size of its own, so give the wrapper one — usually
`aspect-video` plus a width. The glow bleeds past the player by `scale`, so put
the component inside a container that clips its own overflow if that bleed would
otherwise widen the page.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="video-ambient-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center overflow-hidden rounded-2xl border border-default bg-elevated/30 px-4 py-10 sm:px-8 sm:py-14">
    <MVideoAmbient
      alt="A red flower in bloom among green leaves"
      class="aspect-video w-full max-w-xl"
      src="https://mdn.github.io/shared-assets/videos/flower.mp4"
    />
  </div>
</template>
```
::

Autoplay is started from script rather than the `autoplay` attribute, so a
reader who prefers reduced motion never gets a moving video — not even for the
frames before hydration.

## Customize

`blur`, `saturation` and `scale` shape the glow: the inner pass uses them
directly and the outer bloom multiplies each one. `gain` adds light rather than
tint, because the frame is composited onto itself with `lighter`; past roughly
`2.2` the highlights clip to white.

`sampleRate` caps how often the glow re-samples, `intensity` fades it, and
`glow` turns it off entirely for an A/B comparison. `rounded` is applied to the
video itself so the glow keeps hugging its corners.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="video-ambient-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-5">
    <div class="w-full max-w-lg overflow-hidden rounded-2xl border border-default bg-elevated/30 px-4 py-8 sm:px-8 sm:py-10">
      <MVideoAmbient
        alt="Jellyfish drifting through dark blue water"
        :blur="44"
        :gain="1.9"
        :glow="glow"
        :intensity="1"
        :rounded="28"
        :saturation="2.4"
        :scale="1.45"
        class="aspect-video w-full"
        controls
        src="https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        :label="glow ? 'Hide glow' : 'Show glow'"
        :icon="glow ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        color="neutral"
        variant="outline"
        size="sm"
        @click="glow = !glow"
      />
      <span class="text-xs text-muted">
        The glow is sampled from the current frame, never read back.
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const glow = ref(true)
</script>
```
::

## Props

::component-props
  ::component-prop{name="src" type="string"}
  Video source URL.
  ::
  ::component-prop{name="alt" type="string"}
  Describes the video for assistive technology. Rendered as the video's
  `aria-label`.
  ::
  ::component-prop{name="autoPlay" type="boolean" default="true"}
  Starts playback on mount. Ignored when the reader prefers reduced motion.
  ::
  ::component-prop{name="glow" type="boolean" default="true"}
  Turns the ambient glow on or off.
  ::
  ::component-prop{name="intensity" type="number" default="0.9"}
  Glow opacity, from 0 to 1.
  ::
  ::component-prop{name="blur" type="number" default="34"}
  Blur radius in pixels on the inner glow. The outer bloom doubles it.
  ::
  ::component-prop{name="gain" type="number" default="1.7"}
  Extra light pushed into the glow, above the video's own brightness.
  ::
  ::component-prop{name="saturation" type="number" default="1.9"}
  Colour boost on the glow. 1 is the video's own saturation.
  ::
  ::component-prop{name="scale" type="number" default="1.3"}
  How far past the video's edges the inner glow bleeds. 1 is no bleed.
  ::
  ::component-prop{name="sampleRate" type="number" default="12"}
  How many times per second the glow re-samples the current frame.
  ::
  ::component-prop{name="rounded" type="number" default="20"}
  Border radius in pixels applied to the video.
  ::
  ::component-prop{name="poster" type="string"}
  Poster image. Also used as the blurred fallback glow until a frame is
  sampled.
  ::
  ::component-prop{name="controls" type="boolean" default="false"}
  Shows the browser's native playback controls.
  ::
  ::component-prop{name="loop" type="boolean" default="true"}
  Replays the video when it ends.
  ::
  ::component-prop{name="muted" type="boolean" default="true"}
  Starts muted. Autoplay requires it in every current browser.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the positioned wrapper. Give it a size, for example
  `aspect-video w-full`.
  ::
::

## Accessibility

- The video carries an `aria-label` from `alt`, and the glow layers are
  `aria-hidden` and `pointer-events-none` so they add nothing to the
  accessibility tree and never intercept a click on the player.
- Autoplay only ever starts muted, and `controls` is available for anyone who
  wants to stop, seek or unmute.
- A `prefers-reduced-motion` preference suppresses autoplay entirely and stops
  the sampling loop. The glow is painted once from a still frame — or from the
  poster — and then left alone.
- Nothing is conveyed by the glow alone: it repeats colour that is already
  visible in the video frame.

## Performance

- Each sample draws a 24×14 grab twice, once per glow pass. The cost is the same
  for a 4K source as for a 360p one, and the browser's own bilinear upscaling
  does most of the smoothing before the CSS blur finishes it.
- The loop is `requestAnimationFrame`-driven and throttled to `sampleRate`, so
  it never fires on a frame the browser is already dropping.
- Sampling stops when the video pauses, the wrapper scrolls out of view, the tab
  is hidden, or the glow is switched off.
- The fallback layer stays mounted and crossfades with the first sampled frame,
  so there is no layout pass and no flash between the two.
