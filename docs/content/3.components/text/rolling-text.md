---
title: Rolling Text
description: Split-flap text where every character cycles through a glyph ramp before landing.
---

Each character is its own little drum. When the roll plays, the drum spins
through a short ramp of random glyphs and then stops on the real letter, staggered
slightly from its neighbour, so a word assembles the way a departure board does.

The ramp is generated from the text itself by default: the unique characters in
the string become the pool the intermediate glyphs are drawn from, which keeps the
motion inside the same alphabet as the final word.

## Usage

Pass the text as `text`. It rolls once on mount by default.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="rolling-text-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-8 p-10 text-center">
    <div>
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Split-flap headline
      </p>
      <p class="mt-3 text-4xl font-semibold text-highlighted">
        <MRollingText text="Ship something" />
      </p>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted">
      <span>
        <MRollingText
          text="fast"
          class="font-medium text-primary"
        />
      </span>
      <span>
        <MRollingText
          text="readable"
          class="font-medium text-highlighted"
        />
      </span>
      <span>
        <MRollingText
          text="accessible"
          class="font-medium text-highlighted"
        />
      </span>
    </div>
  </div>
</template>
```

::

A character that has not been armed yet shows its final glyph, so `trigger` never
leaves the line half-spun or showing random letters before the first play.

## Customize

`trigger` decides what starts a roll: `mount`, `inView`, `hover` or `manual`. With
`manual`, flip `playing` to `true` to replay; with `hover`, moving the pointer over
the text replays it on a fine-pointer device.

`direction` flips the drum, `glyphs` replaces the ramp alphabet, and `duration`,
`stagger` and `rampLength` tune the rhythm.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="rolling-text-custom" />
  :::
#code
```vue
<template>
  <div class="grid w-full gap-4 p-6 sm:grid-cols-2">
    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Hover to replay
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :ramp-length="6"
          text="Hover me"
          trigger="hover"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Rolls down
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :duration="700"
          direction="down"
          text="Downwards"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Custom glyph ramp
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :ramp-length="8"
          glyphs="0123456789"
          text="012345"
        />
      </p>
    </div>

    <div class="rounded-xl border border-default bg-elevated/40 p-6">
      <p class="text-xs font-medium tracking-wide text-muted uppercase">
        Manual trigger
      </p>
      <p class="mt-3 text-2xl font-semibold text-highlighted">
        <MRollingText
          :playing="playing"
          text="On demand"
          trigger="manual"
        />
      </p>
      <UButton
        class="mt-4"
        color="neutral"
        size="sm"
        variant="subtle"
        @click="replay"
      >
        Replay
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

const playing = ref(false)

async function replay() {
  playing.value = false
  await nextTick()
  playing.value = true
}
</script>
```

::

## Props

::component-props
  ::component-prop{name="text" type="string" required}
  Text to render. Split into graphemes before rolling.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the root element.
  ::
  ::component-prop{name="direction" type="'up' | 'down'" default="'up'"}
  Direction the glyph column rolls in before landing.
  ::
  ::component-prop{name="duration" type="number" default="500"}
  Roll duration per character, in milliseconds.
  ::
  ::component-prop{name="glyphs" type="string"}
  Ramp alphabet cycled through before landing on the target character. Defaults
  to the unique characters found in `text`.
  ::
  ::component-prop{name="playing" type="boolean" default="false"}
  Plays the roll when `trigger` is `manual` and this flips to `true`.
  ::
  ::component-prop{name="rampLength" type="number" default="4"}
  Number of intermediate glyphs shown before the target lands.
  ::
  ::component-prop{name="stagger" type="number" default="40"}
  Per-character stagger, in milliseconds.
  ::
  ::component-prop{name="trigger" type="'mount' | 'inView' | 'hover' | 'manual'" default="'mount'"}
  What starts the roll.
  ::
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.rollingText` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `inline-block`
  ::
  ::component-slot-row{name="srOnly"}
  `sr-only`
  ::
  ::component-slot-row{name="space"}
  `inline-block whitespace-pre`
  ::
  ::component-slot-row{name="char"}
  `inline-block h-[1em] overflow-hidden align-bottom leading-none`
  ::
  ::component-slot-row{name="column"}
  `flex flex-col`
  ::
  ::component-slot-row{name="glyph"}
  `block h-[1em] leading-none`
  ::
::

## Accessibility

- The drum glyphs are decorative: every one is `aria-hidden="true"` and a
  visually hidden copy of the full `text` fills the `srOnly` slot, so assistive
  technology reads the word once instead of reading the ramp.
- The root is a plain `span`, so the component inherits the semantics of whatever
  heading, paragraph or link it sits inside.
- Under `prefers-reduced-motion: reduce` the keyframes are disabled in CSS and the
  columns sit on their final glyph. The text is always fully readable, including
  before a `manual` or `hover` trigger fires.
- `trigger="hover"` is an enhancement only. The same text is present and legible
  for keyboard and touch users without replaying it.

## Performance

- The roll is CSS keyframes over `translateY`, not a JavaScript animation loop.
  Each column carries its timing in `--rt-duration` and `--rt-delay` custom
  properties, so a replay is a remount rather than a per-frame update.
- Glyph columns are `will-change`-free and stay on the compositor: only
  `transform` changes.
- The ramp is built from a seeded PRNG, so the server and the client produce the
  same glyphs on the first render and hydration never mismatches.
- Each character renders one column with `rampLength + 1` glyphs, so keep `text`
  to a word or short phrase rather than a paragraph.
