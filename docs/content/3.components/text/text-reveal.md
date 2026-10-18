---
title: Text Reveal
description: Reveals text one character at a time with a choice of effects.
---

The TextReveal component splits a string into characters and animates each one in with a small stagger, producing the effect of text being written or unveiled. It is the right component for a headline or paragraph that should draw the eye on load or on scroll.

## Usage

Pass the text as `text` and pick an `effect`. The reveal starts on mount, or when the element scrolls into view (`startOnView`).

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-basic" />
  :::
#code
```vue
<template>
  <div class="flex justify-center">
    <MTextReveal
      effect="fade"
      :duration="2"
      :delay="0.5"
      :stagger="0.1"
      text="This text is typed out like a typewriter"
    />
  </div>
</template>
```
::

## Examples

### Fade effect

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-fade" />
  :::
#code
```vue
<template>
  <div class="p-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold mb-6">
          <MTextReveal
            effect="fade"
            text="Transform Your Digital Experience"
            class="block"
          />
        </h1>

        <p class="text-xl text-muted max-w-2xl mx-auto">
          <MTextReveal
            effect="fade"
            text="Create stunning interfaces with our collection of animated components that enhance user engagement and drive results."
            :stagger="0.03"
          />
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <div>
          <h2 class="text-2xl font-bold text-highlighted mb-4">
            <MTextReveal
              effect="fade"
              text="Core features"
            />
          </h2>

          <ul class="space-y-4">
            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-primary/10 dark:bg-primary/70 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-primary"
                  />
                </div>
              </div>
              <span class="ml-3 text-default">
                <MTextReveal
                  effect="fade"
                  text="Lightning fast performance with optimized load times"
                  :stagger="0.02"
                />
              </span>
            </li>

            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-purple-600 dark:text-purple-400"
                  />
                </div>
              </div>
              <span class="ml-3 text-default">
                <MTextReveal
                  effect="fade"
                  text="Beautiful animations that captivate your audience"
                  :stagger="0.02"
                />
              </span>
            </li>

            <li class="flex items-start">
              <div class="flex-shrink-0 mt-1">
                <div class="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <UIcon
                    name="i-lucide-check"
                    class="w-4 h-4 text-green-600 dark:text-green-400"
                  />
                </div>
              </div>
              <span class="ml-3 text-default">
                <MTextReveal
                  effect="fade"
                  text="Easy integration with clean, well-documented code"
                  :stagger="0.02"
                />
              </span>
            </li>
          </ul>
        </div>

        <div class="bg-default rounded-xl shadow-lg p-6">
          <h3 class="text-xl font-semibold text-highlighted mb-4">
            <MTextReveal
              effect="fade"
              text="Why Choose Us?"
            />
          </h3>

          <div class="space-y-4">
            <p class="text-muted">
              <MTextReveal
                effect="fade"
                text="Our platform offers cutting-edge solutions that help you achieve your goals faster."
                :stagger="0.02"
              />
            </p>

            <p class="text-muted">
              <MTextReveal
                effect="fade"
                text="With 99.9% uptime and 24/7 support, you can trust us to deliver."
                :stagger="0.02"
              />
            </p>
          </div>

          <div class="mt-6">
            <UButton
              size="lg"
              color="primary"
            >
              <MTextReveal
                effect="fade"
                text="Get Started Today"
              />
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```
::

### Effects and directions

Every `effect` pairs with a `direction`, so the same reveal can slide, rotate,
bounce, scale or blur from any edge — or from a random offset per character with
`direction="random"`. `charClass` styles each character wrapper, which is handy
for colouring a reveal without touching the root.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-effects" />
  :::
#code
```vue
<template>
  <div class="grid w-full max-w-lg gap-4">
    <p
      v-for="test in tests"
      :key="test.label"
      class="flex items-baseline gap-3"
    >
      <span class="w-24 shrink-0 text-xs uppercase tracking-widest text-muted">
        {{ test.label }}
      </span>
      <MTextReveal
        :text="test.text"
        :effect="test.effect"
        :direction="test.direction"
        :stagger="0.04"
        char-class="text-primary"
        class="text-xl font-semibold"
      />
    </p>
  </div>
</template>

<script setup lang="ts">
const tests = [
  { label: 'Slide up', text: 'Slide from below', effect: 'slide', direction: 'up' },
  { label: 'Rotate left', text: 'Rotate in place', effect: 'rotate', direction: 'left' },
  { label: 'Bounce down', text: 'Bounce into view', effect: 'bounce', direction: 'down' },
  { label: 'Scale', text: 'Grow into focus', effect: 'scale', direction: 'up' },
  { label: 'Blur', text: 'Resolve from blur', effect: 'blur', direction: 'up' },
]
</script>
```
::

### Controlled replay

Set `startOnView="false"` to start immediately, and use `trigger` to drive the
reveal yourself — toggling it replays the animation. `reduceMotion` shortens the
reveal to a near-instant settle, `ariaLabel` overrides what is announced, and the
`click` event lets the surrounding UI react.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-reveal-controlled" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4">
    <MTextReveal
      text="Reveal on demand"
      effect="slide"
      :start-on-view="false"
      :trigger="playing"
      :reduce-motion="reduceMotion"
      aria-label="Reveal on demand heading"
      class="cursor-pointer text-2xl font-bold text-default"
      @click="replay"
      @complete="completed = true"
    />

    <div class="flex items-center gap-4">
      <UButton
        label="Replay"
        icon="i-lucide-rotate-ccw"
        variant="outline"
        @click="replay"
      />
      <USwitch
        v-model="reduceMotion"
        label="Reduce motion"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const playing = ref(true)
const reduceMotion = ref(false)
const completed = ref(false)

function replay() {
  playing.value = false
  nextTick(() => {
    playing.value = true
  })
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
    <component-example name="text-reveal-custom" />
  :::
#code
  <PlaygroundCode name="TextReveal" />
::

## Props

::component-props
  ::component-prop{name="text" type="string" default="''"}
  Text to reveal.
  ::

  ::component-prop{name="direction" type="'up' | 'down' | 'left' | 'right' | 'random'" default="'up'"}
  Direction the characters travel from. `random` picks a direction per character.
  ::

  ::component-prop{name="effect" type="'fade' | 'slide' | 'bounce' | 'rotate' | 'scale' | 'blur'" default="'slide'"}
  The motion applied to each character. `fade` is opacity only; the others add the matching transform or filter on top of the fade.
  ::

  ::component-prop{name="stagger" type="number" default="0.05"}
  Seconds between consecutive characters.
  ::

  ::component-prop{name="duration" type="number" default="0.6"}
  Duration of each character's animation in seconds.
  ::

  ::component-prop{name="delay" type="number" default="0"}
  Seconds before the first character animates.
  ::

  ::component-prop{name="startOnView" type="boolean" default="true"}
  Wait until the element scrolls into view before revealing. Set it to `false` to start immediately on mount.
  ::

  ::component-prop{name="once" type="boolean" default="true"}
  Animate only the first time the element enters the viewport. Only relevant when `startOnView` is `true`.
  ::

  ::component-prop{name="charClass" type="string" default="''"}
  CSS classes applied to each character wrapper.
  ::

  ::component-prop{name="trigger" type="boolean" default="undefined"}
  Explicitly control whether the reveal has started. Leave it `undefined` to let `startOnView` drive it.
  ::

  ::component-prop{name="ariaLabel" type="string" default="''"}
  Overrides the label announced for the text. Defaults to `Animated text: ${text}`.
  ::

  ::component-prop{name="reduceMotion" type="boolean" default="false"}
  Shorten each character's transition to a near-instant `0.1s` and remove the stagger. The characters still settle into place, they simply do not travel. The same happens automatically when the user prefers reduced motion.
  ::

  ::component-prop{name="class" type="string" default="undefined"}
  CSS classes applied to the root element.
  ::

  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## Events

::component-events
  ::component-event{name="complete" type="() => void"}
  Emitted once the reveal is considered finished. It is wired to an internal
  `hasAnimated` flag that the current implementation never sets, so in practice
  it does not fire — drive replays with `trigger` instead (see the tip below).
  ::
  ::component-event{name="click" type="() => void"}
  Emitted when the root element is clicked.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.textReveal` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `text-reveal-container inline-block`
  ::
  ::component-slot-row{name="char"}
  `text-reveal-char relative`
  ::
  ::component-slot-row{name="charInner"}
  `inline-block`
  ::
  ::component-slot-row{name="srOnly"}
  `sr-only`
  ::
::

## Accessibility

The root exposes `role="text"` and an `aria-label` — `ariaLabel` when set, otherwise `Animated text: <text>` — and every visible character is `aria-hidden`. A visually hidden copy of the full string fills the `srOnly` slot so assistive technology reads the text once, as a sentence. `aria-live` and `aria-busy` are bound to the component's internal animation flag (`off` and `false` at rest).

## Performance

- Characters are computed once per `text` change; the reveal animates transforms, opacity and (for `blur`) a filter.
- Each character is wrapped in an extra `span`, so the element count is roughly the character count; very long strings produce many nodes.
- `startOnView` uses an intersection observer. With `once` at its default the reveal runs a single time and the watcher stops driving it afterwards.

::tip
The `complete` event is emitted from a watcher on an internal `hasAnimated` flag,
and nothing in the current implementation ever flips that flag to `true`. Treat
`complete` as reserved and schedule follow-up work from your own timeout, or
remount the component with a changing `:key` to replay it.
::
