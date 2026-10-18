---
title: Text Roll
description: Text whose letters roll in on a 3D axis.
---

The TextRoll component gives each letter a 3D flip: it enters by rotating around the X axis and exits the same way, so the line appears to roll into place. It is a strong choice for a headline or label that should feel physical rather than a simple fade.

## Usage

Pass the text as `children`. `class` is merged onto the root, and each letter rolls in with a per-character delay derived from `getEnterDelay`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-roll-basic" />
  :::
#code
```vue
<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-6">
        Discover
        <MTextRoll
          children="Amazing Features"
          class="text-primary"
        />
      </h1>

      <p class="text-xl text-muted mb-8">
        Our platform offers
        <MTextRoll
          children="cutting-edge solutions"
          class="text-purple-600 dark:text-purple-400 font-semibold"
        />
        that help you achieve your goals faster.
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
            <MTextRoll
              children="Blazing quick"
              class="text-primary"
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
            <MTextRoll
              children="Beautiful Effects"
              class="text-purple-600 dark:text-purple-400"
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
            <MTextRoll
              children="Plug-in ready"
              class="text-green-600 dark:text-green-400"
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
          Explore Features
        </UButton>
      </div>
    </div>
  </div>
</template>
```
::

## Examples

### Rolling words

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-roll-usage" />
  :::
#code
```vue
<template>
  <div class="p-4">
    <MTextRoll children="Scrolling words" />
  </div>
</template>
```
::

### Timing and custom variants

`duration` sets how long each letter takes to flip, while `getEnterDelay` and
`getExitDelay` stagger the letters. `variants` replaces the default rotateX
pair, and `onAnimationComplete` fires once after the last letter's exit — handy
for chaining the next roll.

::code-preview
---
label: Preview
---
  :::div{class="p-4"}
    <component-example name="text-roll-timing" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-sm flex-col items-center gap-5">
    <div class="flex items-baseline gap-2">
      <span class="text-xs uppercase tracking-widest text-muted">Now playing</span>
      <MTextRoll
        :key="track"
        :children="track"
        :duration="0.6"
        :get-enter-delay="i => i * 0.045"
        :get-exit-delay="i => i * 0.045"
        :transition="{ ease: [0.22, 1, 0.36, 1] }"
        :variants="{
          enter: { initial: { rotateX: 0, opacity: 1 }, animate: { rotateX: 95, opacity: 0 } },
          exit: { initial: { rotateX: -95, opacity: 0 }, animate: { rotateX: 0, opacity: 1 } },
        }"
        class="text-lg font-semibold text-primary"
        :on-animation-complete="() => (finished = true)"
      />
    </div>

    <div class="flex items-center gap-3">
      <UButton
        label="Next track"
        icon="i-lucide-skip-forward"
        variant="outline"
        @click="next"
      />
      <span class="text-xs text-dimmed">{{ finished ? 'ready' : 'rolling…' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const tracks = ['Midnight City', 'Reunion', 'Outro']
const index = ref(0)
const track = computed(() => tracks[index.value])
const finished = ref(false)

function next() {
  finished.value = false
  index.value = (index.value + 1) % tracks.length
}
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="text-roll-custom" />
  :::
#code
  <PlaygroundCode name="TextRoll" />
::

## Props

::component-props
  ::component-prop{name="children" type="string" default="''"}
  The text to roll.
  ::

  ::component-prop{name="duration" type="number" default="0.5"}
  Duration of each letter's enter and exit animation in seconds.
  ::

  ::component-prop{name="getEnterDelay" type="(index: number) => number" default="(i) => i * 0.1"}
  Per-letter delay before the enter animation, in seconds.
  ::

  ::component-prop{name="getExitDelay" type="(index: number) => number" default="(i) => i * 0.1 + 0.2"}
  Per-letter delay before the exit animation, in seconds.
  ::

  ::component-prop{name="transition" type="object" default="{ ease: 'easeIn' }"}
  Transition merged over each letter's animation, after `duration` is applied.
  ::

  ::component-prop{name="variants" type="object" default="undefined"}
  Custom enter and exit variant pairs that replace the default 90° rotation.
  ::

  ::component-prop{name="onAnimationComplete" type="() => void" default="undefined"}
  Called once, after the last letter finishes its exit animation.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textRoll` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="letter"}
  `relative inline-block [perspective:10000px] [transform-style:preserve-3d] [width:auto]`
  ::
  ::component-slot-row{name="enter"}
  `absolute inline-block [backface-visibility:hidden] [transform-origin:50%_25%]`
  ::
  ::component-slot-row{name="exit"}
  `absolute inline-block [backface-visibility:hidden] [transform-origin:50%_100%]`
  ::
  ::component-slot-row{name="placeholder"}
  `invisible`
  ::
  ::component-slot-row{name="srOnly"}
  `sr-only`
  ::
::

## Accessibility

The roll is decorative: each letter is `aria-hidden="true"` and a visually hidden copy of the full `children` string fills the `srOnly` slot, so assistive technology reads the text once rather than letter by letter. The root is a plain `span` with no role or landmark.

## Performance

- Each letter renders three animated `span`s (enter, exit and a `placeholder` that reserves layout space), so a short string produces roughly three times the node count. Keep `children` to a word or short phrase.
- The `placeholder` keeps the measured width stable while the enter/exit layers are `absolute`, which avoids a layout shift during the roll.
- There is no reduced-motion handling; the letters always roll.
