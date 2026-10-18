---
title: Scroll Velocity
description: Text that drifts and accelerates with the speed and direction of your scroll.
---

Rows of text that move on their own and react to how fast you are scrolling.
Each line scrolls continuously at a base velocity, and the speed and direction of
your scroll are folded into that baseline: scroll down and the lines speed up,
scroll up and they reverse. The whole thing is driven by a `requestAnimationFrame`
loop, so the motion is smooth rather than stepped.

Alternate lines run in opposite directions, so a stack of `texts` reads as a
stack of counter-moving bands.

## Usage

Pass the phrases as `texts`. Every phrase becomes its own marquee row; even-numbered
rows move one way and odd-numbered rows the other. `velocity` is the base speed,
and `damping`/`stiffness` shape how the scroll is smoothed into that speed.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      Scroll Velocity
    </h3>
    <MScrollVelocity
      :texts="['Nuxt Motion Block', 'Scroll Down']"
      :velocity="100"
      :damping="50"
      :stiffness="400"
      :num-copies="6"
    />
  </div>
</template>
```
::

## Examples

### Multiple phrases

Every entry in `texts` is a separate row, the odd ones travelling against the
even ones.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-basic" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        Scroll Velocity
      </h3>
      <p class="text-muted">
        Dynamic text effects that respond to scroll speed for engaging parallax experiences
      </p>
    </div>

    <div class="bg-default rounded-lg p-6 shadow">
      <MScrollVelocity
        :texts="['Fast Scroll', 'Medium Speed', 'Slow Motion']"
        :velocity="75"
        class="text-3xl font-bold text-center"
      />
    </div>

    <div class="mt-6 flex justify-center">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-mouse"
          class="w-4 h-4 mr-2"
        />
        Try Scrolling
      </UButton>
    </div>
  </div>
</template>
```
::

### Velocity mapping and copies

`velocityMapping` remaps the smoothed scroll velocity into a speed multiplier, so
you can make the effect more or less sensitive. `numCopies` sets how many times
each phrase is repeated inside its row — raise it for very wide screens so the
line never runs out of text.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-mapping" />
  :::
#code
```vue
<template>
  <div class="space-y-4">
    <MScrollVelocity
      :texts="['Velocity mapping']"
      :velocity="120"
      :num-copies="4"
      :velocity-mapping="{ input: [0, 500], output: [0, 8] }"
      :damping="40"
      :stiffness="500"
      scroller-class="text-3xl font-semibold"
    />
  </div>
</template>
```
::

### Styling hooks

`parallaxClass`, `scrollerClass`, `parallaxStyle` and `scrollerStyle` reach the
inner wrapper and the moving row, so you can restyle either without overriding
the theme globally.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="scroll-velocity-styling" />
  :::
#code
```vue
<template>
  <div class="space-y-6">
    <MScrollVelocity
      :texts="['Styled with the theme hooks']"
      :velocity="80"
      class="rounded-xl bg-default"
      parallax-class="py-4"
      scroller-class="text-3xl tracking-tight"
      :parallax-style="{ background: 'linear-gradient(90deg, transparent, var(--ui-bg-muted), transparent)' }"
      :scroller-style="{ opacity: 0.85 }"
    />
  </div>
</template>
```
::

## Customize

Adjust `texts`, `velocity`, `damping`, `stiffness` and `numCopies` live in the
playground below.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="scroll-velocity-custom" />
  :::
#code
  <PlaygroundCode name="ScrollVelocity" />
::

## Props

::component-props
  ::component-prop{name="texts" type="string[]" default="[]"}
  The phrases to display. Each becomes its own row; odd rows travel against even
  rows.
  ::
  ::component-prop{name="velocity" type="number" default="100"}
  Base velocity of the animation, in pixels per second. Rows alternate the sign of
  this value.
  ::
  ::component-prop{name="damping" type="number" default="50"}
  Damping factor for the internal velocity spring. Higher values settle the speed
  more quickly and reduce wobble.
  ::
  ::component-prop{name="stiffness" type="number" default="400"}
  Stiffness factor for the internal velocity spring. Higher values make the row
  respond to changes in scroll speed more aggressively.
  ::
  ::component-prop{name="numCopies" type="number" default="6"}
  How many copies of each phrase are rendered inside a row. Raise it for wide
  viewports so the row never shows a gap.
  ::
  ::component-prop{name="velocityMapping" type="{ input: [number, number], output: [number, number] }" default="{ input: [0, 1000], output: [0, 5] }"}
  Remaps the smoothed scroll velocity into a speed multiplier. The `input` range
  is the raw velocity and `output` the multiplier applied on top of `velocity`;
  with the default, a fast scroll can multiply the movement up to `5×`.
  ::
  ::component-prop{name="scrollContainerRef" type="any"}
  Declared for parity with the React primitive and forwarded to each row, but the
  current implementation reads `window.scrollY` directly, so the velocity always
  reacts to page scroll regardless of this value. Treat it as inert.
  ::
  ::component-prop{name="parallaxClass" type="string" default="''"}
  Classes merged onto the inner parallax wrapper (`relative overflow-hidden` from
  the theme), the element that clips each row.
  ::
  ::component-prop{name="scrollerClass" type="string" default="''"}
  Classes merged onto the moving row. Override this to change the typography the
  theme applies.
  ::
  ::component-prop{name="parallaxStyle" type="object" default="{}"}
  Inline styles for the parallax wrapper.
  ::
  ::component-prop{name="scrollerStyle" type="object" default="{}"}
  Inline styles for the moving row, merged after the `translateX` transform.
  ::
  ::component-prop{name="class" type="string"}
  Merged onto the root `<section>`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.scrollVelocity` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="parallax"}
  `relative overflow-hidden`
  ::
  ::component-slot-row{name="scroller"}
  `flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`
  ::
  ::component-slot-row{name="text"}
  `flex-shrink-0`
  ::
::

## Accessibility

The rows are plain, animated `span`s inside a `<section>`. There are no ARIA
attributes, roles or live regions, and because the text is duplicated `numCopies`
times, the same phrase appears many times in the accessibility tree. A screen
reader reads every copy.

There is no `prefers-reduced-motion` handling: the `requestAnimationFrame` loop
runs for every user, and because a row moves on its own even without scrolling, a
motion-sensitive user has no way to stop it from props alone. Keep these bands
decorative and out of the primary reading path, and if the content is meaningful,
provide it as static text elsewhere.

## Performance

- Each row runs a `useRafFn` loop that updates a single `baseX` counter and writes
  a `translateX` transform. The work per frame is arithmetic, not measurement.
- The only measurement is the width of the first copy (`offsetWidth`), read once
  on mount and on window `resize` — never per frame.
- `useRafFn` pauses automatically when the tab is hidden, so a backgrounded page
  costs nothing.
- The rows animate `transform` only, so the compositor can run them off the main
  thread and no frame triggers layout.
- The velocity spring is a hand-rolled simulation (`stiffness / 1000` and
  `damping / 1000` per frame) rather than a Motion spring, which keeps the whole
  component dependency-free at runtime.

## How the velocity works

Each frame the row reads `window.scrollY`, subtracts the previous value and
multiplies by `60` to get a per-second figure. That raw velocity is smoothed by
the spring to produce `smoothVelocity`, which `velocityMapping` then rescales into
a multiplier. The multiplier is added to the base movement, and its sign decides
the direction the row travels:

```txt
moveBy  = direction × velocity × (delta / 1000)
moveBy += direction × moveBy × velocityFactor
```

So a positive `velocityFactor` speeds the row up in its current direction, and a
negative one flips `directionFactor` and sends it the other way. `velocity` is the
floor — the row keeps drifting at that speed even when the page is still.

Because the position is wrapped between `-copyWidth` and `0`, the row can scroll
forever without its `baseX` value growing unbounded.
