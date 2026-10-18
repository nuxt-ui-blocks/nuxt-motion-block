---
title: Short Lower in
description: Rotating phrases that build one word at a time into a centered stack, then drop away.
---

Words drop in from above, one every `500ms`, each landing on its own centred line.
The stack grows downward as it fills, so a two-word phrase resolves to two centred
rows and a four-word phrase to four. Once the composition is complete it holds,
blurs, and slides out — then the next phrase builds itself the same way.

The phrase list is the content. There is no `text` prop and no `children` slot,
because there is nothing to reveal once: the component's whole job is to be the
rotator. Pass one phrase per string; each is split on spaces into the lines of its
own stack.

Useful for a hero subtitle that cycles through value statements, a status line, or
a tagline above a call to action.

## Usage

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="short-slide-down-basic" />
  :::
#code
```vue
<template>
  <MShortSlideDown
    class="text-2xl font-bold"
    :phrases="phrases"
  />
</template>

<script setup>
const phrases = ['Ship it', 'Then sleep on it', 'Ship it on Friday']
</script>
```
::

## Examples

### Tuning the dwell time

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="short-slide-down-timing" />
  :::
#code
```vue
<template>
  <div class="flex flex-col gap-10">
    <div class="text-center">
      <p class="mb-3 text-xs tracking-widest text-muted uppercase">
        Brisk · 1400ms
      </p>
      <MShortSlideDown
        class="text-xl font-bold"
        :phrases="phrases"
        :interval="1400"
      />
    </div>
    <div class="text-center">
      <p class="mb-3 text-xs tracking-widest text-muted uppercase">
        Unhurried · 4500ms
      </p>
      <MShortSlideDown
        class="text-xl font-bold"
        :phrases="phrases"
        :interval="4500"
      />
    </div>
    <p class="max-w-sm text-center text-sm text-muted">
      The build is identical. Only the pause between the finished stack and its
      exit changes, so a short interval reads as a ticker and a long one reads
      as a quote.
    </p>
  </div>
</template>

<script setup>
const phrases = ['Same build', 'Different dwell time']
</script>
```
::

## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="short-slide-down-custom" />
  :::
#code
  <PlaygroundCode name="ShortSlideDown" />
::

## Props

::component-props
  ::component-prop{name="phrases" type="string[]" required}
  The phrases to cycle through, one per cycle. Each phrase is split on spaces into
  the rows of its stack.
  ::

  ::component-prop{name="interval" type="number" default="2500"}
  Milliseconds the completed stack rests before it starts to exit. Measured from
  the end of the build, so the total cycle is `interval + 500ms + build time`.
  ::

  ::component-prop{name="class" type="string"}
  Classes for the root element, which is also the flex column and the live region.
  Type styles set here are inherited by every word.
  ::
::

## Accessibility

The root is an `aria-live="polite"` region containing the words themselves. There is
no `aria-label` and no `aria-hidden` on any word, which is the opposite of every
other component here — and correct here. The phrase changes over time, so a label
describing a fixed string would be re-announced on every swap, and hiding the words
would leave the live region announcing nothing at all. The polite region announces
each new phrase once, when it arrives, without interrupting.

Under `prefers-reduced-motion` the build is skipped entirely — the full stack
appears at once — and the component still rotates on `interval`. It has to: a
centred slot that froze would leave a visible hole in the layout for the rest of the
page's life. The swap itself is instant, since the transition is suppressed.

The initial state is the same on the server and the client. The server cannot know
the motion preference, and `initial` is only read when the visual element is first
created, so a client that changed its mind could never clear the server's hidden
attributes. Suppressing the *transition* keeps a single identical tree instead.

## Performance

- The whole cycle is one `setTimeout` chain: a timer per word reveal, plus the exit
  and advance ticks. Every pending timer is cleared and rebuilt whenever `phrases`,
  `interval` or the motion preference changes, and all of them are cleared on
  unmount. Between ticks the component does nothing — there is no frame loop.
- Each word is one `Motion` span with `layout`, so every reveal and exit measures
  the stack before and after (the layout transition runs at `500ms`, matched to the
  word build). That measurement is the real cost of the build — a four-word stack
  reflows on the way in and again on the way out.
- Animations touch `opacity`, `scale`, `y` and `filter: blur()`. The blur values are
  small (`2.4px` in, `1.2px` out) but blur is a paint effect rather than a
  transform, so it re-rasters the text for each frame of the transition.
- Node count is one span per word of the current phrase. The exit finishes
  (`320ms`) before the advance fires (`500ms` after the exit begins), so two phrases
  are never in the DOM at the same time.
- Under reduced motion there is a single timer per cycle and no transitions at all.
- There is no visibility check: the timers keep firing and the stack keeps
  rotating while the component sits scrolled off-screen.

## One cycle, in order

The schedule is fixed and entirely timer-driven. Nothing waits on an animation
finishing, so the timings below are the timings you get:

1. `wordCount` resets to `1` and the stack starts building.
2. Word *i* is revealed at exactly `i × 500ms`.
3. The build is treated as complete after `(words.length - 1) × 500 + 360ms`. The
   `360` is the first word's own `360ms` duration — the last word starts last, so
   the build ends when the last word lands, not when the second-to-last one does.
4. `interval` later, `exiting` flips to `true` and every word animates to the exit
   state.
5. `500ms` after the exit begins, the phrase index advances and the cycle repeats.

That last step is where the component's pacing comes from. The exit itself lasts
`320ms`, and the advance fires at `320 + 180` — the exit duration plus a `180ms`
gap of deliberate empty air. Without the gap the next phrase's first word would
start rising while the old stack was still dissolving, and the two would overlap
into a smear. The pause is what makes each cycle feel finished.

## Layout

Words are `display: block` inside a flex column with `align-items: center` and a
`12px` gap, so lines centre on their own width and the spacing between them stays
constant as the stack grows. Each word also carries `layout`, and the phrase wrapper
uses `AnimatePresence mode="popLayout"`. Together those mean a departing stack keeps
its place while the incoming one reflows into it, instead of the whole block jumping
to its new height.

The asymmetric travel is intentional: words arrive `28px` above and scale from
`0.992` while blurred `2.4px`, but exit only `10px` below with a lighter `1.2px`
blur. Arriving from further away reads as landing; leaving a shorter distance reads
as letting go.

## Notes

- The component starts on mount and rotates until it is unmounted. There is no
  `triggerOnView` and no replay prop — the rotation is the animation. Remount with
  a changing `:key` to restart it from the first phrase.
- `interval` is re-read whenever it changes, and so is the phrase count, so both
  are safe to drive from reactive state.
- Phrases are split on a **single** space. Two spaces in a row, or a newline
  inside a phrase, produces an empty row in the stack — the gap is preserved and
  the composition is off-centre by `12px`.
- The `12px` gap is an inline style on the root, so a `gap-*` utility in `class`
  will not override it. Pad the stack from the outside instead.
- The root is a flex container, which makes it a block-level box. To set it inline
  — inside a sentence, say — wrap it; compare
  [Short Slide Right](/components/text/short-slide-right), whose root is `inline-block`
  and is designed for exactly that.
