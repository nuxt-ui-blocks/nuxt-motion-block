---
title: Video Text
description: Letters cut straight out of a looping clip, so the footage becomes the type.
---

Video Text stacks a `<video>` under a full-size block, fills that block with a solid colour, paints the text in the opposite colour, and sets the block to `mix-blend-mode: multiply` (or `screen`). Where the glyphs are, the colour cancels out and the clip shows through; everywhere else the surround stays flat.

That is one element and one blend, rather than an SVG mask or a per-letter clip path — the type stays real text, so it keeps the font's own metrics and can be swapped for any markup in the slot.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="video-text-example" />
  :::
#code
```vue
<template>
  <MVideoText
    src="https://media.w3.org/2010/05/video/movie_300.mp4"
    text="Motion"
    class="h-64 w-full rounded-xl"
  />
</template>
```
::

## Examples

### Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="video-text-custom" />
  :::
#code
  <PlaygroundCode name="VideoText" />
::

## Props

::component-props
  ::component-prop{name="src" type="string"}
  Video to show through the letters. It is always muted, which is what lets it autoplay.
  ::

  ::component-prop{name="text" type="string" default="''"}
  Text cut out of the clip. The default slot wins when it is filled.
  ::

  ::component-prop{name="blend" type="'multiply' | 'screen'" default="'multiply'"}
  Which way the knock-out blends. `multiply` cuts the letters out of a **black** surround; `screen` does the same out of a **white** one. Pick the one that matches the backdrop the component sits on.
  ::

  ::component-prop{name="fontSize" type="string" default="'clamp(3rem, 13vw, 9rem)'"}
  Size of the letters. Any CSS length works, so a `clamp()` keeps the type fluid in a resizing frame.
  ::

  ::component-prop{name="autoplay" type="boolean" default="true"}
  Start the clip on mount. It is skipped entirely when the reader prefers reduced motion, which leaves the poster or first frame in place.
  ::

  ::component-prop{name="loop" type="boolean" default="true"}
  Loop the clip, so the letters keep moving for as long as they are on screen.
  ::

  ::component-prop{name="poster" type="string" default="undefined"}
  Image shown until the first frame is ready. Worth setting on slow connections, because the type is invisible until the clip paints.
  ::

  ::component-prop{name="class" type="string" default="''"}
  CSS classes for the frame. Give it a height, or the letters decide the size.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Markup cut out of the clip. It sits in a flex box centred in the frame, so a multi-line headline or a logo works as well as plain text.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.videoText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative flex items-center justify-center overflow-hidden`
  ::
  ::component-slot-row{name="video"}
  `absolute inset-0 size-full object-cover`
  ::
  ::component-slot-row{name="mask"}
  `relative flex size-full items-center justify-center`
  ::
  ::component-slot-row{name="text"}
  `text-center font-black uppercase leading-none tracking-tight`
  ::
::

## Accessibility

The video is `aria-hidden`, `tabindex="-1"` and has no controls, so it never becomes a media player the reader has to operate — the words are the content, and the footage is only their fill. The knock-out text is ordinary DOM text, which means it is selectable, searchable and read out in full.

Because the letters are drawn by blending rather than by an image, contrast depends on what the clip is doing underneath. Choose a clip with bright, moving light rather than a mostly flat one, and check the result against the surround colour you picked: a `multiply` surround on a dark page, a `screen` surround on a light one. With reduced motion the clip does not autoplay, so the letters stay on their first frame and the page holds still.
