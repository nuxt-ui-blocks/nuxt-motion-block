---
title: ASCII Render
description: Samples an image or video into a grid of characters, mapping each cell's luminance to a glyph.
navigation:
  icon: i-lucide-text-cursor-input
---

# ASCII Render

Samples a picture — or a video frame by frame — into a character grid. Each cell's
luminance picks one glyph from a ramp, and the result is painted into a `<pre>`
element over a transparent copy of the media.

Rows are derived from the media's aspect ratio rather than from a `rows` prop: a
monospace cell is treated as roughly twice as tall as it is wide (`CHAR_ASPECT =
0.5`), so a 16:9 source at `columns: 80` produces about 23 rows.

Set `color="source"` and each glyph is filled with the matching pixel of the frame
instead of a single colour. The implementation takes the sampled grid canvas,
turns it into a data URL and uses it as a clipped background behind the text —
so the ASCII is tinted by the image, at the cost of a `toDataURL()` encode per
frame.

If the media can't be read — a CORS-tainted canvas, a missing `2d` context, a
decode error, or a video `play()` rejection — the component silently falls back to
the plain image or video. You get a normal picture, not a broken component, but
also no ASCII and no error to catch, so check that your media serves permissive
CORS headers before assuming the effect is working.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ascii-render-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-4">
    <MAsciiRender
      :source="{ type: 'image', src: src }"
      alt="Snow-covered mountain ridge under a pale sky"
      :columns="columns"
      :font-size="8"
      :invert="invert"
      :color="color"
      class="h-64 w-full"
    />

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="columns"
        :items="columnItems"
      />
      <USelect
        v-model="color"
        :items="['mono', 'source']"
      />
    </div>

    <UCheckbox
      v-model="invert"
      label="Invert the luminance ramp"
    />
  </div>
</template>

<script setup lang="ts">
const src = 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200&q=80'
const columns = ref(90)
const color = ref<'mono' | 'source'>('mono')
const invert = ref(false)

const columnItems = [
  { label: '45 columns', value: 45 },
  { label: '90 columns', value: 90 },
  { label: '160 columns', value: 160 },
]
</script>```
::

The `charset` ramp is ordered dense to sparse — index 0 is used for black, the
last index for white. The default `@%#*+=-:. ` puts the heaviest glyph on dark
pixels, which reads correctly against a dark background. If your page is light,
pass `invert` so the ramp flips, or supply your own ramp in the same order.

## Props

::field-group
  ::field{name="source" type="{ src: string, type: 'image' | 'video' }" required}
  The media to sample. Any `type` other than the exact string `'video'` renders
    an `<img>`, so passing a MIME type like `'image/png'` is safe — it will not
    silently produce nothing.
  ::
  ::field{name="alt" type="string" required}
  Description of the media, exposed through a visually hidden `<span>`. This is
    the only accessible name the component produces.
  ::
  ::field{name="columns" type="number" default="80"}
  Character columns. Clamped to 8–240, and rounded to an integer. This is the
    main quality/cost dial: every column is one pixel of the sampling canvas and
    one glyph in the DOM.
  ::
  ::field{name="fontSize" type="number" default="10"}
  Glyph size in pixels. The `<pre>` uses `line-height: 1` and `white-space: pre`,
    so this also controls row height and therefore how tall the grid is.
  ::
  ::field{name="charset" type="string" default="'@%#*+=-:. '"}
  The luminance-to-glyph ramp, dense to sparse. A one-character string is
    rejected and replaced with the default.
  ::
  ::field{name="color" type="'mono' | 'source'" default="'mono'"}
  `mono` paints every glyph in the theme text colour. `source` fills each glyph
    with the sampled colour by clipping the frame behind the text.
  ::
  ::field{name="invert" type="boolean" default="false"}
  Flip the luminance mapping, so dark pixels take the last glyph instead of the
    first. Use it for light backgrounds or to invert an unconventional ramp.
  ::
  ::field{name="fps" type="number" default="24"}
  Frames sampled per second for video sources. Clamped to 1–60. Ignored for
    images.
  ::
  ::field{name="paused" type="boolean" default="false"}
  Draw one frame and hold it. Because `paused` is one of the `watchEffect`'s
    dependencies, flipping it rebuilds the renderer: the running loop is cancelled
    and the video paused, or playback restarts. It works as a live toggle.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the container alongside `relative isolate overflow-hidden
    rounded-xl bg-default`. This is where you set the size.
  ::
::

## Accessibility

Both the media element and the `<pre>` are `aria-hidden="true"`, and the media
element's `alt` is empty — the ASCII is a picture of a picture, and exposing both
would have assistive technology read the same content twice. The real
description reaches users through the `alt` prop, rendered in a `.sr-only` span,
so it is always available even when the fallback picture is showing.

The `video` is `muted` and `playsinline` and carries `tabindex="-1"`, which
sidesteps the autoplay-block problem and keeps it out of the tab order. Be aware
of the usual consequence: a decorative video with no controls is unreachable for
keyboard users, so never use this for content that needs to be played or paused
deliberately.

Reduced motion is respected. With `useReducedMotion()` true, the renderer draws
a single frame and pauses the video instead of running the animation loop.

## Performance

- Sampling happens on a canvas sized to `columns × rows` — tiny — but
  `getImageData` is called on every frame and forces a readback from the
  compositor. The context is created with `willReadFrequently: true` to keep it
  on the CPU, which is the right trade at this resolution.
- Cost is roughly linear in `columns`: `160` columns means 160 glyphs per row and
  a correspondingly larger canvas read. Combined with `fontSize`, that is the
  difference between a legible effect and an unreadable wall of glyphs.
- A `requestAnimationFrame` loop is running for video and is throttled to `fps`,
  so the render rate is independent of the display refresh rate. Drop `fps` first
  when optimising a video source.
- Rendering only happens for images when the component mounts; a video keeps its
  `requestAnimationFrame` loop alive for as long as it is on screen. Switching
  `source` re-runs the `watchEffect`, and `onCleanup` cancels the pending frame
  and detaches the media listeners.
- With `color="source"`, every frame additionally encodes the sampling canvas
  with `toDataURL()`. That is a full PNG encode per frame and is meaningfully
  more expensive than the sampling itself.
- The media element is `opacity-0` rather than removed from the layout, so the
  browser keeps decoding it — the video has to load even when it is invisible.

::tip
The renderer is a `watchEffect`, and it reads `isVisible` — an
`IntersectionObserver` flag with a 10% bottom `rootMargin` — as a reactive
dependency. Scrolling the component out of view therefore tears the renderer
down and scrolls it back in re-runs it, which is what stops off-screen videos
from burning frames. The observer's `disconnect` is registered inside `onMounted`,
so it is torn down with the component.
::

::tip
The same `watchEffect` is what makes the controls in the example feel live. It
reads `source`, `columns`, `charset`, `fps`, `color`, `invert`, `paused`,
`isVisible` and the reduced-motion flag, so changing any of them tears the old
renderer down — cancelling its frame and detaching the media listeners — and
rebuilds it. The cost is a brief flash while the new frame loads; the benefit is
that there is no separate "apply" step for any prop.
::