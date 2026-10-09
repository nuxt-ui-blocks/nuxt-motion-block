---
title: AI Diff
description: A reviewable code patch with a staggered wipe, a verdict flash, and accept or reject.
navigation:
  icon: i-lucide-diff
---

# AI Diff

A diff card for a patch an agent wants applied: the header, the coloured lines,
and — if you pass the callbacks — an Accept / Reject row that resolves the
proposal instead of leaving the reader to work out what happened next.

The motion is restrained on purpose. Added lines wipe in from the left on a
stagger; context lines are already on screen and do not animate, because
animating them would misrepresent what actually changed. Accepting flashes the
whole card green once and settles; rejecting collapses the lines to zero height
and leaves the verdict behind, so a thrown-away proposal stops occupying the
page.

## Usage

Pass `lines` as `{ type, content, lineNumber? }` entries and nothing else — the
card renders its own header, counts and legend. Add `@accept` / `@reject` only if
your app has somewhere to put the verdict.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-diff-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <MAiDiff
      :decision="decision"
      :lines="lines"
      :on-accept="() => decision = 'accepted'"
      :on-reject="() => decision = 'rejected'"
      title="src/runtime/composables/useAiState.ts"
    />

    <UButton
      class="self-start"
      label="Propose another patch"
      size="sm"
      variant="soft"
      @click="replay"
    />
  </div>
</template>

<script setup lang="ts">
type DiffLine = {
  content: string
  kind: 'added' | 'removed' | 'context'
  number?: number
}

const lines = ref<DiffLine[]>([
  { content: 'export type AIState =', kind: 'context', number: 4 },
  { content: '  | \'idle\'', kind: 'removed', number: 5 },
  { content: '  | \'listening\'', kind: 'removed', number: 6 },
  { content: '  | \'thinking\'', kind: 'context', number: 7 },
  { content: '  | \'streaming\'', kind: 'added', number: 8 },
  { content: '  | \'done\'', kind: 'context', number: 9 },
  { content: '  | \'error\'', kind: 'context', number: 10 }
])

const decision = ref<'accepted' | 'rejected' | null>(null)

const replay = () => {
  // A new array identity clears the decision and replays the wipe.
  lines.value = [...lines.value]
  decision.value = null
}
</script>
```
::

## Props

::field-group
  ::field{name="lines" type="AiDiffLine[]"}
  Required. Each entry is `{ content: string, kind: 'added' | 'removed' | 'context', number?: number }`.
  The `number` gutter is omitted per line when absent, so leave it off entirely
  for tabular data rather than code. The `+n` / `-n` totals in the header are
  derived from `lines`, never passed in.
  ::
  ::field{name="decision" type="'accepted' | 'rejected' | null" default="null"}
  Seeds the verdict. Local state backs the buttons, but this lets you render a
  stored transcript as already-decided — without it every historical patch would
  come back pending. Changing `lines` clears it, because a different patch is a
  different question.
  ::
  ::field{name="onAccept" type="() => void"}
  Optional. Renders the Accept button. Its presence alone does not decide
  anything: the card updates its own verdict first, then calls the handler.
  ::
  ::field{name="onReject" type="() => void"}
  Optional. Renders the Reject button. The action row appears only when at least
  one of `onAccept` or `onReject` is present, and hides as soon as a decision
  exists.
  ::
  ::field{name="title" type="string"}
  Optional file path or description. Rendered in a truncating monospace gutter on
  the header's left.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the outer card, which also carries
  `w-full overflow-hidden rounded-xl border border-border bg-elevated`.
  ::
::

## Accessibility

- Both buttons are native `<button type="button">`, so they are tabbable and
  activate on Enter and Space without extra handling.
- The action row unmounts once a decision lands and the verdict text takes its
  place. If a decision arrives from outside, screen readers get the new text via
  the live DOM rather than a focus trap on a stale button.
- The +/- counters use `tabular-nums` so a changing total does not shift the
  header.
- Line content uses `whitespace-pre`, which preserves indentation but does not
  wrap; the `<pre>` scrolls horizontally instead. A diff in prose would need
  different styling.
- Under `prefers-reduced-motion: reduce` there is no clip-path wipe, no stagger,
  no flash and no collapse transition — the card renders at its final state.
- Diff colour is never the only signal: added lines carry a `+`, removed lines a
  `-`, and the kind also changes the line background.
- The component sets no ARIA role. Wrapping it in a `<figure>` with a
  `<figcaption>` naming the change is the usual way to give a patch an accessible
  name.

## Performance

- Lines animate on a `clipPath` inset rather than `width` or `transform`, so the
  animation stays off layout and off the compositor's transform channel while
  still reading as a wipe.
- `:layout` is on the outer card only, and only when reduced motion is off. It is
  what makes the collapse animate smoothly as the card shrinks.
- Rejection collapses via a `max-height` transition from `60rem` to `0rem`
  rather than a measured `height: 0` exit, so no measurement pass is needed and a
  diff taller than 60rem is still reachable.
- The `lines` watch resets the verdict on any new array identity, so replacing the
  array is both the "new patch" signal and the animation replay. Mutating the
  array in place will not retrigger it.
