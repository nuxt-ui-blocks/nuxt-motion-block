---
title: Text Shimmer
description: Text with shimmer effect that moves across the content.
---

The TextShimmer component creates text with a shimmer effect that moves across the content. It's perfect for creating eye-catching headings and text elements with a sparkling animation.

The effect is a moving highlight painted into the text: the element uses `background-clip: text` with two layers — a base colour plus a narrow gradient band — and animates `background-position` from right to left on a linear loop. `spread` widens that band, `duration` sets the loop time, and `as` chooses the element so the shimmer can be a real heading instead of a styled paragraph.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-basic" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center space-y-8 p-8">
    <div class="text-center max-w-2xl">
      <MTextShimmer
        text="Transform Your Digital Experience"
        :duration="2.5"
        :spread="2"
        class="text-4xl font-bold mb-4"
      />
      <MTextShimmer
        text="Create stunning interfaces with our collection of animated components"
        :duration="3"
        :spread="1.5"
        class="text-xl text-muted"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      <UCard class="text-center">
        <UIcon
          name="i-lucide-zap"
          class="w-12 h-12 text-primary mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Blazing quick
        </h3>
        <p class="text-muted text-sm">
          Tuned for speed
        </p>
      </UCard>

      <UCard class="text-center">
        <UIcon
          name="i-lucide-sparkles"
          class="w-12 h-12 text-purple-500 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Beautiful Effects
        </h3>
        <p class="text-muted text-sm">
          Stunning animations
        </p>
      </UCard>

      <UCard class="text-center">
        <UIcon
          name="i-lucide-code"
          class="w-12 h-12 text-green-500 mx-auto mb-4"
        />
        <h3 class="text-lg font-semibold mb-2">
          Plug-in ready
        </h3>
        <p class="text-muted text-sm">
          Quick to add
        </p>
      </UCard>
    </div>
  </div>
</template>
```
::

## Examples

### Heading

Pass a heading tag through `as` to render the shimmer as real document structure rather than a styled `p`, and size it with `class`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-heading" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MTextShimmer
      text="Heading Shimmer"
      as="h1"
      class="text-3xl font-bold"
    />
  </div>
</template>
```
::

### Loading label

A shimmer is a natural fit for in-progress copy. A larger `spread` widens the highlight so it reads as a soft sweep rather than a tight glint, and a shorter `duration` keeps it lively.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-shimmer-loading" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-3 p-8">
    <MTextShimmer
      text="Generating your report…"
      :duration="1.6"
      :spread="4"
      class="text-2xl font-semibold"
    />
    <p class="text-sm text-muted">
      A wider spread reads as a softer, broader sweep across the text.
    </p>
  </div>
</template>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-shimmer-custom" />
  :::
#code
  <PlaygroundCode name="TextShimmer" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="'no text provided'"}
  Text to shimmer.
  ::

  ::component-prop{name="as" type="string" default="'p'"}
  HTML element to render as.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the container.
  ::

  ::component-prop{name="duration" type="number" default="2"}
  Animation duration in seconds for one full sweep.
  ::

  ::component-prop{name="spread" type="number" default="2"}
  Spread of the shimmer effect. Multiplied by the text length to size the highlight band.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textShimmer` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000] [background-repeat:no-repeat,padding-box] [--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]`
  ::
::

## Accessibility

The string is the element's own text content and is rendered a single time, so a screen reader announces it normally with no duplicate layers to skip. There is no `aria-hidden` decorator and nothing is generated for the shimmer, so the accessibility tree is exactly the text you passed.

The component does not read `prefers-reduced-motion`, so the loop runs even when a user has asked for less motion. For reduced-motion contexts, render a plain element instead, or gate the shimmer behind your own preference check.

## Performance

- The whole effect is one element: two background layers clipped to the text, so there are no extra nodes or pseudo-elements per character.
- `spread` is turned into a `--spread` CSS custom property (`text.length × spread` px) and the band is drawn with the theme's `--bg` gradient, so retuning the shape is a single style update rather than a re-render.
- The loop is a `motion-v` transition on `background-position` — `repeat: Infinity`, `ease: 'linear'` — which repaints the text box but triggers no layout.
