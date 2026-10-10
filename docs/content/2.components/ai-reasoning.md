---
title: AI Reasoning
description: A model thinking out loud, collapsed behind a one-line summary with a measured duration.
navigation:
  icon: i-lucide-brain
---

# AI Reasoning

A trace of what the model was doing, collapsed behind a one-line summary. It
builds on Nuxt UI's `ChatReasoning`, which already handles the parts that are easy
to get subtly wrong: it times the trace, opens the moment streaming starts,
auto-closes when the answer lands, and swaps its label for a shimmer only while
work is actually happening.

What this component adds is the label ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â seconds, to a decimal, in the module's own
voice ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â and a left rule that doubles as the indent, so the trace reads as an aside
rather than as part of the answer it is explaining.

Use it inside an [AI Message](/docs/components/ai-message) body, usually with
`bubble: false` so the trace is not boxed inside a bubble.

## Usage

Put the trace in the default slot and drive `isStreaming` from your turn state.
The summary, the duration and the auto-collapse are all handled; there is no
timing prop you need to compute.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-reasoning-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-lg rounded-2xl border border-default p-5">
    <MAiReasoning :is-streaming="streaming">
      The user asked why the audit needs a flag. Blast radius first: the audit
      walks every theme token, so a cold landing produces a long tail of visual
      diffs. Then the alternative ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â a flag adds one branch and one flag to read
      later, and nothing here is dangerous without review. So: flag first, remove
      it once the diffs are clean.
    </MAiReasoning>

    <div class="mt-4 flex items-center gap-3">
      <UButton
        :label="streaming ? 'Finish thinking' : 'Start thinking'"
        size="sm"
        variant="soft"
        @click="streaming = !streaming"
      />
      <span class="text-xs text-muted">
        isStreaming = {{ streaming }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const streaming = ref(true)
</script>
```
::

## Props

::field-group
  ::field{name="isStreaming" type="boolean" default="false"}
  Whether the trace is still being produced. It opens the block on the rising
  edge, drives the shimmer, and ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â with `collapseWhenDone` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â triggers the
  auto-close on the falling edge.
  ::
  ::field{name="collapseWhenDone" type="boolean" default="true"}
  Collapse itself once `isStreaming` goes false. The trace is scaffolding:
  interesting while it happens, clutter once the answer has landed. Setting it
  `false` turns the underlying auto-close off entirely and leaves the block
  wherever the reader put it.
  ::
  ::field{name="duration" type="number"}
  Seconds the model spent, in seconds. Omit it and the component times the trace
  itself between the `isStreaming` edges and reports its own measurement.
  ::
  ::field{name="defaultOpen" type="boolean"}
  Start expanded. Omit it and the block opens or closed depending on what
  `isStreaming` starts as ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â which is the behaviour you want in a live transcript
  and the wrong one for a static page.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the underlying reasoning block.
  ::
::

## Slots

The default slot is the trace itself. Its container is styled for you: a left
border in `border-border`, `pl-4`, relaxed leading and `text-muted`. The block's
own top padding is forced to `0` so the rule, not a gap, is what separates the
trace from the answer below it.

## Accessibility

- The disclosure and its label come from `UChatReasoning`, which renders a real
  button with `aria-expanded` and a region bound to it. The trace is not simply
  hidden with CSS.
- The summary text is the label, and it is meaningful at every state: `Thought for
  4.2s` once a duration is known, `Reasoning` before one is. The block is never
  unlabelled.
- The shimmer that replaces the label appears only while `isStreaming` is true,
  so a settled trace is not advertising work that has stopped.
- The 600ms delay before auto-collapsing is a readability decision: snapping shut
  the instant a trace finishes feels like the content was yanked away mid-read.
- Duration is derived from `Date.now()`, not a frame loop, so the measurement costs
  nothing per frame and a backgrounded tab does not produce a wildly inflated
  number beyond the real elapsed time.
- A trace longer than a screen is not virtualised. It is scrolled, not truncated.
- There is no ARIA live region here. Announcing a growing trace would be
  unusable; if a reader needs to know the model finished, that belongs in the
  message that follows.

## Performance

- The trace is timed by a `watch` on `isStreaming` with `immediate: true`, so a
  trace that starts already streaming is measured from mount rather than never.
- The measurement runs once on the falling edge and is kept in a `ref`. It is the
  same measurement `ChatReasoning` makes for its own sake, duplicated only so the
  summary can say how long it took.
- `duration` wins over the internal measurement when both exist, which is what lets
  a stored transcript render its original timing instead of re-timing a replay.
- `autoCloseDelay` is a single `computed` off `collapseWhenDone`. `0` is the
  underlying component's own "do not auto-close" signal, so the opt-out needs no
  separate branch.
- The `ui` override is a static object, not a `computed` ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â it never changes, and
  rebuilding it per render would be pure waste.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiReasoning` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `'w-full'` |
| `body` | `'!pt-0 text-sm text-muted'` |
| `trace` | `'border-border border-l pl-4 leading-relaxed text-muted'` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiReasoning` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full` |
| `body` | `!pt-0 text-sm text-muted` |
| `trace` | `border-border border-l pl-4 leading-relaxed text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [ui prop](/getting-started/theming), or app-wide under `ui.aiReasoning` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full` |
| `body` | `!pt-0 text-sm text-muted` |
| `trace` | `border-border border-l pl-4 leading-relaxed text-muted` |

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiReasoning` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `w-full` |
| `body` | `!pt-0 text-sm text-muted` |
| `trace` | `border-border border-l pl-4 leading-relaxed text-muted` |
