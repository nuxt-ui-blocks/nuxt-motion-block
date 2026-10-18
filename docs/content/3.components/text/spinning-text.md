---
title: Spinning Text
description: Text that spins with 3D effects.
---

The SpinningText component creates text that spins with 3D effects. It's perfect for creating eye-catching headings and animated text elements.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-basic" />
  :::
#code
```vue
<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Welcome to
        <MSpinningText
          children="NUXT-MOTION-BLOCK"
          class="text-primary"
        />
      </h1>

      <p class="text-xl text-muted mb-8">
        Create stunning interfaces with our collection of animated components that
        <MSpinningText
          children="ENHANCE-USER-ENGAGEMENT"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        and drive results.
      </p>

      <div class="bg-default rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6">
          <div class="flex-1 text-center md:text-left">
            <h3 class="text-lg font-semibold mb-2">
              Real-time Preview
            </h3>
            <p class="text-muted text-sm">
              See changes instantly as you type with our live preview feature
            </p>
          </div>
          <MSpinningText
            children="99.9-PERCENT-UPTIME"
            class="text-2xl font-bold text-green-600 dark:text-green-400"
          />
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-4">
        <UButton
          size="lg"
          color="primary"
        >
          Get Started
        </UButton>
        <UButton
          size="lg"
          variant="outline"
        >
          View Documentation
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Minimal ring

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-usage" />
  :::
#code
```vue
<template>
  <div class="p-4 flex justify-center">
    <MSpinningText children="SPINNING-TEXT-IS-AWESOME" />
  </div>
</template>
```
::

### Tight ring, reversed

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-ring" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-10 p-8">
    <MSpinningText
      children="TIGHT-AND-FAST"
      class="text-sm font-bold tracking-widest text-primary"
      :radius="2.5"
      :font-size="0.8"
      :duration="4"
    />
    <MSpinningText
      children="REVERSED-SLOW"
      class-name="text-xs uppercase text-muted"
      reverse
      :radius="4"
      :font-size="0.6"
      :duration="16"
    />
  </div>
</template>
```
::

`radius` is measured in `ch` — the letter's own width — so a small ring with a
small `fontSize` reads as a tight badge, while `reverse` spins the second ring the
other way. `className` lands on the container alongside `class`, which is how the
second ring is greyed without touching its letters.

### Custom motion

::code-preview
---
label: Preview
---
  :::div{class="p-4 flex justify-center"}
    <component-example name="spinning-text-custom-motion" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MSpinningText
      children="DOUBLE-TURN"
      class="text-lg font-semibold text-secondary"
      :duration="6"
      :variants="variants"
      :transition="transition"
      :style="{ filter: 'drop-shadow(0 0 12px currentColor)' }"
    />
    <p class="max-w-xs text-center text-sm text-muted">
      `variants.container` replaces the 360° target with 720°, and
      `transition` switches the easing to ease-in-out for a softer start and stop at each cycle seam.
    </p>
  </div>
</template>

<script setup>
const variants = {
  container: {
    visible: { rotate: 720 },
  },
}
const transition = {
  ease: 'easeInOut',
}
</script>
```
::

`variants.container` is spread over the default `visible` variant, so a custom
`visible` replaces the `360°` target outright — here `720°`, two full turns per
cycle. `transition` merges over the base `{ repeat: Infinity, ease: 'linear' }`,
and its `duration` wins over the `duration` prop when both are set.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="spinning-text-custom" />
  :::
#code
  <PlaygroundCode name="SpinningText" />
::

## Props

::component-props
  ::component-prop{name="children" type="string" :required="true"}
  Text to spin.
  ::
  
  ::component-prop{name="style" type="object" default="undefined"}
  Custom styles to apply to the container.
  ::
  
  ::component-prop{name="duration" type="number" default="10"}
  Animation duration in seconds.
  ::
  
  ::component-prop{name="className" type="string" default="undefined"}
  CSS classes to apply to the container.
  ::
  
  ::component-prop{name="class" type="string" default="undefined"}
  Classes for the container element, merged with `className` after the theme's
  `root` slot.
  ::
  
  ::component-prop{name="reverse" type="boolean" default="false"}
  Reverse the spinning direction.
  ::
  
  ::component-prop{name="fontSize" type="number" default="1"}
  Font size multiplier.
  ::
  
  ::component-prop{name="radius" type="number" default="5"}
  Radius of the spinning circle, in `ch`.
  ::
  
  ::component-prop{name="transition" type="object" default="{}"}
  Animation transition options. Merged over the base
  `{ repeat: Infinity, ease: 'linear' }`; a `duration` here wins over the
  `duration` prop.
  ::
  
  ::component-prop{name="variants" type="object" default="{}"}
  Animation variants for container and items. `variants.container` is spread over
  the default `visible` variant, so a custom `visible` replaces the `360°` target.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.spinningText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative`
  ::
  ::component-slot-row{name="letter"}
  `absolute left-1/2 top-1/2 inline-block`
  ::
  ::component-slot-row{name="srLabel"}
  `sr-only`
  ::
::

## Accessibility

Every letter is `aria-hidden="true"` and the full `children` string is mirrored
into the `srLabel` slot as an `sr-only` span, so assistive technology reads the
text once, in order, rather than as a ring of disconnected characters. The root is
a plain `span` with no role.

There is no reduced-motion handling: the container runs a `repeat: Infinity`
rotation regardless of `prefers-reduced-motion`. For a decorative badge that is
usually fine — but do not put meaning that has to sit still inside one without
pausing it yourself.

## Performance

- The container runs a single infinite `rotate` through motion-v's variants. Each
  letter's position is a static `transform` (`translate` + `rotate` + `translateY`
  by index) written once in `style` — one running animation regardless of how many
  letters are on the ring.
- Node count equals character count: one `Motion` span per letter plus one
  `sr-only` copy of the string. Every letter is absolutely positioned inside a
  `relative` root with no other content, so the root itself takes no layout space
  and the ring overflows a zero-size box.
- `radius` and `fontSize` only change the values written into each letter's
  `style` — there is no measuring, no observer and no scroll or pointer listener
  anywhere in the component.
- The `containerVariants` and `finalTransition` computeds rebuild on every render
  but read only props, so they are cheap; the letter styles are plain function
  calls during render.
