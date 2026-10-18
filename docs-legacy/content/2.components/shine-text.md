---
title: Shine Text
description: A highlight band that sweeps across text, the way light passes over brushed metal.
navigation:
  icon: i-lucide-sun
---

# Shine Text

A band of colour travels across a string of text and returns, forever. The
letters themselves never move — only the fill behind them changes, which is why
the effect reads as a light source passing over a surface rather than as an
animation applied to text.

The trick is `background-clip: text`. The glyphs are filled with a wide
gradient and the gradient is *slid* behind them, so the shine is genuinely part
of the letterforms. The obvious alternative — an overlay div with the text
knocked out — sits on top of the type and mutes it, and it desynchronises from
the text as soon as the string reflows.

Useful for a status word, a pricing badge, or any short headline that needs to
look alive without moving.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shine-text-basic" />
  :::
#code
```vue
<template>
  <MShineText
    class="text-3xl font-bold"
    text="Available now"
  />
</template>
```
::

## The sweep

The gradient runs at `110deg` with stops at 40%, 50% and 60%, and the background
is `250% 100%` — wide enough that the band enters from off the left, crosses the
glyphs, and leaves off the right without ever snapping back into view.

The narrow stop range is the point. A broad gradient reads as a wash, a fade, a
tint; a narrow one reads as a specular highlight. Widening those stops turns the
shine into a generic gradient animation, so they are constants rather than
props.

Motion is `linear` with a `repeatDelay`. The pause matters more than it looks: a
sweep that never rests reads as a loading state, whereas sweep → rest → sweep
reads as light moving over something physical.

## Props

::field-group
  ::field{name="text" type="string" required}
  The string to sweep. It is rendered as-is rather than split into characters,
  so line breaks and inline markup in the surrounding markup are your business,
  not the component's.
  ::

  ::field{name="duration" type="number" default="2.5"}
  Seconds for one complete sweep. Set it below roughly `1.2` and the eye stops
  resolving the band as a band.
  ::

  ::field{name="repeatDelay" type="number" default="0.6"}
  Seconds of rest between sweeps. Raise it to roughly `2` for a slow, ambient
  shimmer; drop it towards `0` and you have a progress indicator.
  ::

  ::field{name="baseColor" type="string" default="'var(--ui-text-muted)'"}
  The colour the text sits at before the band arrives. Also the colour on both
  sides of the band. Any CSS colour, including a token or a `color-mix()`.
  ::

  ::field{name="shineColor" type="string" default="'var(--ui-text)'"}
  The travelling highlight itself. Keep it lighter than `baseColor` for a
  specular read; a darker band looks like a shadow crossing the text.
  ::

  ::field{name="class" type="string"}
  Classes for the root span, which is the element the gradient is clipped to.
  ::
::

## Accessibility

The root span carries the plain string in its text content, so assistive
technology reads the string once, in order, with no per-word emphasis and no
duplicate announcement. The effect is purely visual — it changes colour and
nothing else.

Under `prefers-reduced-motion` the component drops the gradient entirely and
paints the text in `baseColor` outright. It does not freeze the sweep in place.
Freezing would leave `color: transparent` in effect, and if
`background-clip: text` were ever unsupported the text would be invisible;
painting a real colour is the only variant that is legible in every case.

## Examples

### Colours

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shine-text-colours" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MShineText
      class="text-3xl font-bold"
      base-color="#3f3f46"
      shine-color="#fde68a"
      text="Gold standard"
    />
    <MShineText
      class="text-3xl font-bold"
      base-color="#1e3a5f"
      shine-color="#67e8f9"
      text="Cyan signal"
    />
  </div>
</template>
```
::

### Timing

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="shine-text-timing" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MShineText
      class="text-2xl font-semibold"
      text="Sweep every 4 seconds"
    />
    <MShineText
      class="text-2xl font-semibold"
      :duration="4"
      text="Sweep every 4 seconds, paused 2s"
    />
  </div>
</template>
```
::

## Notes

- The root span is `display: inline`. It needs to sit inside a block or a flex
  row; on its own it will be sized by the surrounding formatting context, not by
  the component.
- `background-clip: text` is what makes the effect possible and it is what
  breaks it in print. A printed page gets a transparent glyph outline. Supply a
  `baseColor` fallback in your print stylesheet if this ever goes to paper.
- The gradient is `250% 100%`, so very large type spends proportionally longer
  showing base colour than highlight. If the band looks like a flash rather
  than a sweep on a very large heading, that is the cause — shorten the string
  rather than shortening `duration`.