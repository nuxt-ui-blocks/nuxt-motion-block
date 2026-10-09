---
title: Text Effect
description: Splits a string into characters, words or lines and staggers a preset reveal across them.
navigation:
  icon: i-lucide-text-cursor-input
---

# Text Effect

Takes a plain string and splits it into segments — characters, words or lines —
then reveals each one in sequence. It is the general-purpose version of the
family: if you want a specific motion (blur, scramble, roll, wave) there is a
dedicated component, and this is the one to reach for when the difference
between those motions does not matter.

Two independent rates shape the result. `speedReveal` sets the stagger between
segments — the built-in defaults are `0.03s` per character, `0.05s` per word and
`0.1s` per line, divided by `speedReveal`. `speedSegment` sets how long each
segment takes on its own. Text that should feel punchy wants a high
`speedSegment` and a low `speedReveal`; text that should feel deliberate wants
the opposite.

The character mode groups by word so that lines still wrap at word boundaries.
Each character gets its own `overflow: hidden` wrapper, which is what lets a
`y`-based preset appear to rise out of the baseline rather than slide as a whole
paragraph.

## Usage

Pass the text as `children` and pick a segmentation. The component renders as
`as` (a `p` by default) and passes `class` to that element, so it drops into
existing copy without a wrapper.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="text-effect-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-md flex-col gap-5">
    <div class="rounded-2xl border border-default bg-default p-6">
      <p class="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
        {{ per }} · {{ preset }}
      </p>
      <MTextEffect
        :key="run"
        :children="copy"
        :per="per"
        :preset="preset"
        as="span"
        class="text-xl font-semibold text-default"
        :speed-reveal="1.4"
      />
    </div>

    <div class="grid grid-cols-2 gap-3">
      <USelect
        v-model="per"
        :items="perOptions"
      />
      <USelect
        v-model="preset"
        :items="presetOptions"
      />
    </div>

    <UButton
      label="Replay"
      icon="i-lucide-rotate-ccw"
      variant="outline"
      class="justify-center"
      @click="run++"
    />
  </div>
</template>

<script setup lang="ts">
const copy = 'Split the string, then stagger the reveal.'
const run = ref(0)
const per = ref<'word' | 'char' | 'line'>('char')
const preset = ref<'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'>('blur')

const perOptions = ['char', 'word', 'line']
const presetOptions = ['blur', 'fade-in-blur', 'scale', 'fade', 'slide']
</script>
```
::

## Props

::field-group
  ::field{name="children" type="string" default="''"}
  The text to animate. It is split on whitespace for `word`, on newlines for
  `line`, and per character for `char` — there is no slot, so a multi-line
  string in `line` mode needs real `\n` characters.
  ::
  ::field{name="per" type="'word' | 'char' | 'line'" default="'word'"}
  Segmentation unit. Each unit sets its own default stagger: `0.03s` for a
  character, `0.05s` for a word, `0.1s` for a line.
  ::
  ::field{name="preset" type="'blur' | 'fade-in-blur' | 'scale' | 'fade' | 'slide'" default="'fade'"}
  The motion applied to each segment. `fade` is opacity only; `slide` and
  `fade-in-blur` travel 20px upward and `blur`/`fade-in-blur` resolve a 12px
  filter. An unrecognised value falls back to `fade` rather than throwing.
  ::
  ::field{name="as" type="string" default="'p'"}
  Element to render as.
  ::
  ::field{name="delay" type="number" default="0"}
  Seconds before the first segment animates, applied as the container's
  `delayChildren`.
  ::
  ::field{name="speedReveal" type="number" default="1"}
  Multiplier on the between-segment stagger. Higher is tighter. A value of `0`
  collapses the stagger to zero and the segments animate together.
  ::
  ::field{name="speedSegment" type="number" default="1"}
  Multiplier on each segment's own duration, which the source derives as
  `(1 / speedSegment) * 0.4` seconds.
  ::
  ::field{name="trigger" type="boolean" default="true"}
  Whether the animated tree renders at all. Set it to `false` and the root
  element is empty — the text does not appear as plain text — so it is a switch
  for "show the animation" versus "show nothing", not a way to disable motion.
  To replay, remount the component (a changing `:key` is enough).
  ::
  ::field{name="class" type="string"}
  Merged onto the root element, which carries `overflow: hidden`, `display: inline-flex`
  and `flex-wrap: wrap` inline so a `char` preset cannot leak outside the element.
  ::
  ::field{name="variants" type="{ container?: Record<string, any>, item?: Record<string, any> }"}
  Motion variants that replace the generated ones. `container` replaces the
  stagger orchestration entirely — supply your own `staggerChildren` if you do,
  since the computed `speedReveal` and `delay` no longer apply. `item` replaces
  the preset's hidden/visible pair.
  ::
  ::field{name="containerTransition" type="any"}
  Transition merged onto the container `Motion`. Only reaches the container, not
  the segments.
  ::
  ::field{name="segmentTransition" type="any"}
  Transition merged onto every segment `Motion`, applied after the preset's own
  duration, so it wins where the two overlap.
  ::
  ::field{name="segmentWrapperClassName" type="string"}
  Class on the per-word wrapper that `char` mode introduces around each word.
  The wrapper is what carries `overflow: hidden` in `char` mode; changing it
  away from that can make `slide` and `fade-in-blur` look like they slide in
  from nowhere.
  ::
::

## Accessibility

The component renders ordinary text inside a real element, so a screen reader
announces it as text and it needs no ARIA. Two caveats come from the DOM shape:
each segment is its own element, so a copied selection carries one element per
character in `char` mode, and `trigger="false"` removes the content from the
accessibility tree entirely rather than rendering it statically.

There is no reduced-motion handling in the source. Under
`prefers-reduced-motion: reduce` the reveal still plays. Set `trigger="false"`
and render your own plain text if you need a non-animated fallback.

## Performance

- Segments are computed once per `children`/`per` change, not per frame; the
  animation runs on transforms and opacity.
- `char` mode builds one extra wrapper element per word, so the element count is
  roughly `characters + words`. `word` mode is the cheapest option; `char` on a
  long paragraph is not.
- The blur presets animate a `filter`, which is composited but not free — a long
  string in `blur` or `fade-in-blur` does more work per frame than `fade`.
- Changing `speedReveal` or `speedSegment` recomputes the variants and the
  stagger, but no animation state is reset, so it can be driven live.

::tip
`speedSegment` is not "speed" in the intuitive sense. It only sets each segment's
own duration, while `speedReveal` sets the gap between segments — so raising
`speedSegment` makes every segment take longer but the overall run *longer and
more deliberate*, not faster. Raise `speedReveal` when you want it to feel
brisk.
::