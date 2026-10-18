---
title: True Focus
description: Text focus effect with animated borders and blur transitions.
---

The TrueFocus component creates a text focus effect with animated borders and blur transitions. It highlights individual words with customizable borders, glow effects, and animation timing.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-basic" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-xl max-w-2xl mx-auto">
    <div class="text-center mb-6">
      <h3 class="text-2xl font-bold mb-3 text-highlighted">
        True Focus
      </h3>
      <p class="text-muted">
        Highlight specific words in a sentence with dynamic focus effects for emphasis
      </p>
    </div>

    <div class="bg-default rounded-lg p-6 shadow">
      <MTrueFocus
        sentence="Create stunning interfaces with our animated components"
        :manual-mode="true"
        :blur-amount="4"
        border-color="blue"
        class="text-xl text-center"
      />
    </div>

    <div class="mt-6 flex justify-center gap-3">
      <UButton
        color="primary"
        variant="solid"
        size="sm"
      >
        <UIcon
          name="i-lucide-play"
          class="w-4 h-4 mr-2"
        />
        Animate Focus
      </UButton>
      <UButton
        color="gray"
        variant="outline"
        size="sm"
      >
        <UIcon
          name="i-lucide-settings"
          class="w-4 h-4 mr-2"
        />
        Customize
      </UButton>
    </div>
  </div>
</template>
```
::

## Examples

### Automatic cycle

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-example" />
  :::
#code
```vue
<template>
  <div class="p-6 bg-elevated rounded-lg">
    <h3 class="text-lg font-bold mb-4 text-highlighted">
      True Focus
    </h3>
    <MTrueFocus
      sentence="True Focus"
      :manual-mode="false"
      :blur-amount="5"
      border-color="red"
      :animation-duration="2"
      :pause-between-animations="1"
    />
  </div>
</template>
```
::

With `manualMode` off the focus steps through the words on its own: each move
takes `animationDuration` seconds and rests for `pauseBetweenAnimations` before
the next. A slow `2s` move over a one- or two-word sentence reads as a deliberate
pan rather than a flick.

### Amber focus, hover-driven

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="true-focus-glow" />
  :::
#code
```vue
<template>
  <div class="flex flex-col items-center gap-4 p-8">
    <MTrueFocus
      sentence="Ship code that lasts"
      manual-mode
      :blur-amount="4"
      border-color="amber"
      glow-color="rgba(245, 158, 11, 0.8)"
      :animation-duration="0.35"
      :pause-between-animations="1.5"
      class="text-2xl"
    />
    <p class="max-w-sm text-center text-sm text-muted">
      Manual mode: the focus follows the word you hover. The corner brackets
      carry a drop shadow tinted by the border colour, so an amber frame gets an
      amber halo — and `glowColor` resolves through the same theme colour
      resolver, ready for slots that want it.
    </p>
  </div>
</template>
```
::

`borderColor` and `glowColor` both run through the theme colour resolver, so
Nuxt UI colour names (`green`, `amber`, `blue`) work as well as raw values. The
corners drop-shadow in the resolved *border* colour; `glowColor` is written to
the focus overlay's `--glow-color` custom property for slots that want a second
tint.

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="true-focus-custom" />
  :::
#code
  <PlaygroundCode name="TrueFocus" />
::

## Props

::component-props
  ::component-prop{name="sentence" type="string" default="'True Focus'"}
  The sentence to display with focus effects.
  ::
  
  ::component-prop{name="manualMode" type="boolean" default="false"}
  Whether to control focus manually or automatically. In manual mode the focus
  follows the pointer; otherwise it advances on a timer.
  ::
  
  ::component-prop{name="blurAmount" type="number" default="5"}
  Amount of blur to apply to unfocused words.
  ::
  
  ::component-prop{name="borderColor" type="string" default="'green'"}
  Color of the focus border. Resolved through the theme colour resolver.
  ::
  
  ::component-prop{name="glowColor" type="string" default="'rgba(0, 255, 0, 0.6)'"}
  Color written to the focus overlay's `--glow-color` custom property. Resolved
  through the theme colour resolver.
  ::
  
  ::component-prop{name="animationDuration" type="number" default="0.5"}
  Duration of the focus animation in seconds. Also the width of each automatic
  step.
  ::
  
  ::component-prop{name="pauseBetweenAnimations" type="number" default="1"}
  Pause between automatic animations in seconds. The step interval is
  `animationDuration + pauseBetweenAnimations`.
  ::
  
  ::component-prop{name="class" type="string" default="undefined"}
  Classes for the root element, merged after the theme's `root` slot. Type styles
  set here are inherited by every word.
  ::
  
  ::component-prop{name="ui" type="object" default="undefined"}
  Per-slot classes merged over the theme defaults. See [UI](#ui).
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.trueFocus` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `relative flex gap-4 justify-center items-center flex-wrap`
  ::
  ::component-slot-row{name="word"}
  `relative text-[3rem] font-black cursor-pointer`
  ::
  ::component-slot-row{name="focus"}
  `absolute top-0 left-0 pointer-events-none box-border border-0`
  ::
  ::component-slot-row{name="corner"}
  `absolute w-4 h-4 border-[3px] rounded-[3px]`
  ::
::

## Accessibility

The words are plain `span`s inside a `div`: no `aria-live` region, no focus
semantics, no `tabindex`. Assistive technology reads the full sentence once, in
order, regardless of which word is visually in focus, and the border overlay is
decoration on a `pointer-events-none` box.

In manual mode the focus follows the pointer only — the words are not focusable
and there is no keyboard equivalent, so hover here is visual enrichment and the
sentence underneath stays the content. Automatic mode advances on a timer and
needs nothing from the user.

There is no reduced-motion handling: the automatic cycle keeps stepping under
`prefers-reduced-motion`. The per-word blur is a CSS `filter` transition and the
focus box glides on `x`/`y`/`width`/`height` — all small, all continuous while a
step is running.

## Performance

- The focus box is a single animated element. Its rectangle is measured with two
  `getBoundingClientRect` calls (container and active word) once per focus
  change, after `nextTick` — never per frame.
- Word blur is a CSS `filter` transition driven by an inline `transition` string.
  The un-focused words carry a static blur; only the word entering or leaving
  focus transitions. Blur cost scales with painted area, so very large words are
  the expensive case.
- Automatic mode is one `setInterval` at `animationDuration +
  pauseBetweenAnimations` milliseconds. It is cleared on unmount, suspended while
  `manualMode` is on, and restarted when `manualMode` flips back off.
- There are no scroll, resize or rAF listeners, and the focus rectangle is not
  re-measured on layout changes: resize the page while a word is focused and the
  box stays where that word was until the next focus change.
