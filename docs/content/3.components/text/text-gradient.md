---
title: Text Gradient
description: Text with animated gradient effects and various animation styles.
---

The TextGradient component creates text with animated gradient effects and various animation styles. It's perfect for creating eye-catching headings and text elements with dynamic color transitions.

The gradient itself is a `linear-gradient` (or `radial-gradient`) painted into a `background-clip: text` box, so the fill is the text. `colors` and `direction` shape the gradient, `size` sets how much of it is in view, and `animation` decides whether it stays still, drifts, swells, or cycles. Everything animates through `motion-v` variants, which makes it smooth on the GPU and easy to pause.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-basic" />
  :::
#code
```vue
<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        <MTextGradient
          text="Transform Your Digital Experience"
          animation="wave"
          :speed="0.5"
          class="block"
        />
      </h1>

      <p class="text-xl text-muted mb-8">
        Create stunning interfaces with our collection of animated components that
        <MTextGradient
          text="enhance user engagement"
          animation="flow"
          :speed="0.7"
          class="font-semibold"
        />
        and drive results.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/70 flex items-center justify-center">
              <UIcon
                name="i-lucide-zap"
                class="w-8 h-8 text-primary"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextGradient
              text="Blazing quick"
              animation="pulse"
              :speed="0.8"
            />
          </h3>
          <p class="text-muted text-sm">
            Tuned for speed with minimal load times
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-sparkles"
                class="w-8 h-8 text-purple-600 dark:text-purple-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextGradient
              text="Beautiful Effects"
              animation="rainbow"
              :speed="0.6"
            />
          </h3>
          <p class="text-muted text-sm">
            Stunning animations that captivate your audience
          </p>
        </UCard>

        <UCard class="text-center">
          <div class="flex justify-center mb-4">
            <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <UIcon
                name="i-lucide-code"
                class="w-8 h-8 text-green-600 dark:text-green-400"
              />
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">
            <MTextGradient
              text="Plug-in ready"
              animation="wave"
              :speed="0.9"
            />
          </h3>
          <p class="text-muted text-sm">
            Quick to add with clean, well-documented code
          </p>
        </UCard>
      </div>

      <div class="mt-12">
        <UButton
          size="lg"
          color="primary"
          class="px-8 py-3 text-lg"
        >
          Get Started Today
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Heading

Renders as whatever tag `as` names, so a gradient can be a real heading instead of a styled `span`. Pass sizing through `class`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-heading" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MTextGradient
      text="Heading Text"
      as="h1"
      class="text-4xl"
    />
  </div>
</template>
```
::

### Gradient directions

`direction` switches the gradient axis and `colors` sets the stops. Use `radial` for a circular wash rather than a linear sweep.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-gradient-directions" />
  :::
#code
```vue
<template>
  <div class="grid grid-cols-2 gap-8 p-8 text-center text-2xl font-bold">
    <MTextGradient
      text="Horizontal"
      direction="horizontal"
    />
    <MTextGradient
      text="Vertical"
      direction="vertical"
    />
    <MTextGradient
      text="Diagonal"
      direction="diagonal"
    />
    <MTextGradient
      text="Radial"
      direction="radial"
      :colors="['#f472b6', '#a855f7', '#22d3ee']"
    />
  </div>
</template>
```
::

### Animate on hover

With `hover` the gradient scales up while the pointer rests on the text, which is a good fit for interactive labels and links.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-hover" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <h2 class="text-3xl font-bold">
      <MTextGradient
        text="Hover to grow"
        hover
        class="cursor-pointer"
      />
    </h2>
    <p class="text-sm text-muted">
      The gradient scales up while the pointer rests on the text.
    </p>
  </div>
</template>
```
::

### Labels and decoration

The root is announced as `role="text"`. Provide `aria-label` when the visible string is not what you want read aloud, and use `hide-from-screen-reader` for purely decorative gradients such as a star rating.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-gradient-accessible" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-6 p-8">
    <MTextGradient
      text="Announced once"
      aria-label="A headline that is announced once"
      class="text-3xl font-bold"
    />
    <MTextGradient
      text="★★★★★"
      hide-from-screen-reader
      :colors="['#fbbf24', '#f59e0b', '#fbbf24']"
      class="text-3xl"
    />
    <p class="text-sm text-muted">
      The headline carries a custom label; the stars are decorative and hidden from screen readers.
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
    <component-example name="text-gradient-custom" />
  :::
#code
  <PlaygroundCode name="TextGradient" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to display with gradient.
  ::

  ::component-prop{name="as" type="string" default="'span'"}
  HTML element to render as.
  ::

  ::component-prop{name="colors" type="string[]" default="['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7']"}
  Array of colors for the gradient.
  ::

  ::component-prop{name="direction" type="'horizontal' | 'vertical' | 'diagonal' | 'radial'" default="'horizontal'"}
  Direction of the gradient.
  ::

  ::component-prop{name="animation" type="'wave' | 'pulse' | 'flow' | 'rainbow' | 'static'" default="'wave'"}
  Animation type for the gradient. `static` paints the gradient with no motion.
  ::

  ::component-prop{name="duration" type="number" default="3"}
  Animation duration in seconds, divided by `speed` to get the loop time.
  ::

  ::component-prop{name="speed" type="number" default="1"}
  Animation speed multiplier. Higher is faster.
  ::

  ::component-prop{name="size" type="number" default="200"}
  Size of the gradient background as a percentage.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes to apply to the text.
  ::

  ::component-prop{name="hover" type="boolean" default="false"}
  Enable hover effect, scaling the gradient up while hovered.
  ::

  ::component-prop{name="ariaLabel" type="string" default="''"}
  Accessibility label for the text. Defaults to `Animated gradient text: <text>` when empty.
  ::

  ::component-prop{name="hideFromScreenReader" type="boolean" default="false"}
  Hide the text from screen readers with `aria-hidden`.
  ::

  ::component-prop{name="reduceMotion" type="boolean" default="false"}
  Reduce motion for accessibility.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  The text content. Falls back to the `text` prop when the slot is empty.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textGradient` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `text-gradient bg-clip-text text-transparent font-bold`
  ::
  ::component-slot-row{name="srOnly"}
  `sr-only`
  ::
::

## Accessibility

The root is a `role="text"` element labelled through `aria-label`. When you pass no `ariaLabel`, the label falls back to `Animated gradient text: <text>`, and when there is no text either it becomes `Animated gradient text` — so a screen reader always announces something meaningful rather than the raw colour treatment.

Set `hideFromScreenReader` to put `aria-hidden` on the root for decorative gradients, such as a star rating, where a neighbouring caption carries the meaning.

Motion respects accessibility: the component reads `prefers-reduced-motion` on mount and freezes the gradient for users who ask for it, and you can force the same with `reduceMotion`.

## Performance

- The gradient is a CSS `background-image` clipped to the text, so the fill costs no extra DOM nodes — the glyphs are painted once.
- Animation runs through `motion-v` variants on `background-position` and `background-size`; the visual update is a paint on the text box rather than a layout reflow.
- `prefers-reduced-motion` and `reduceMotion` both return an empty transition, which stops the loop instead of merely slowing it.
- `duration` and `speed` combine into a single transition duration, and `rainbow` simply doubles it, so all five animations share one animation clock.
