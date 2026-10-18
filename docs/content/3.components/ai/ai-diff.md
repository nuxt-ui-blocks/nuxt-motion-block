---
title: AI Diff
description: A reviewable code patch with a staggered wipe, a verdict flash, and accept or reject.
---

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

Pass `lines` as `{ content, kind, number? }` entries and nothing else — the card
renders its own header and counts. Add `onAccept` / `onReject` only if your app
has somewhere to put the verdict.

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
      :key="runId"
      :lines="lines"
      :on-accept="noop"
      :on-reject="noop"
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
  { content: '  | \'error\'', kind: 'context', number: 10 },
])

// Bumping the key remounts the card, which is what returns it to a pending
// state and replays the wipe.
const runId = ref(0)

const noop = () => {}

const replay = () => {
  runId.value += 1
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
    <component-example name="ai-diff-custom" />
  :::
#code
  <PlaygroundCode name="AiDiff" />
::

## Props

::component-props
  ::component-prop{name="lines" type="AiDiffLine[]"}
  Required. Each entry is `{ content: string, kind: 'added' | 'removed' | 'context', number?: number }`.
  The `number` gutter is omitted per line when absent, so leave it off entirely
  for tabular data rather than code. The `+n` / `-n` totals in the header are
  derived from `lines`, never passed in.
  ::
  ::component-prop{name="onAccept" type="() => void"}
  Optional. Renders the Accept button. Its presence alone does not decide
  anything: the card updates its own verdict first, then calls the handler.
  ::
  ::component-prop{name="onReject" type="() => void"}
  Optional. Renders the Reject button. The action row appears only when at least
  one of `onAccept` or `onReject` is present, and hides as soon as a decision
  exists.
  ::
  ::component-prop{name="title" type="string"}
  Optional file path or description. Rendered in a truncating monospace gutter on
  the header's left.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the outer card, which also carries
  `w-full overflow-hidden rounded-xl border border-default bg-default`.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiDiff` in `app.config.ts`.

The diff lines themselves are rendered by the shared `CodeBlock` component in
`diff` mode, so they are themed through `ui.codeBlock` (`diffBody`, `diffLine`,
`diffLineNumber`, `diffLinePrefix`, `diffLineContent` and the `kind` variants)
rather than here.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `w-full overflow-hidden rounded-xl border border-default bg-default`
  ::
  ::component-slot-row{name="header"}
  `flex items-center gap-2 border-b border-default px-3 py-2`
  ::
  ::component-slot-row{name="title"}
  `min-w-0 truncate font-mono text-xs text-default`
  ::
  ::component-slot-row{name="stats"}
  `ml-auto flex shrink-0 items-center gap-1.5 text-xs tabular-nums`
  ::
  ::component-slot-row{name="statAdded"}
  `text-[oklch(58%_0.17_150)]`
  ::
  ::component-slot-row{name="statRemoved"}
  `text-error`
  ::
  ::component-slot-row{name="body"}
  `overflow-hidden`
  ::
  ::component-slot-row{name="actions"}
  `flex items-center justify-end gap-2 border-t border-default px-3 py-2`
  ::
  ::component-slot-row{name="reject"}
  `cursor-pointer rounded-lg px-2.5 py-1 text-xs text-muted transition-colors hover:bg-muted hover:text-default`
  ::
  ::component-slot-row{name="accept"}
  `cursor-pointer rounded-lg bg-inverted px-2.5 py-1 text-xs text-inverted`
  ::
  ::component-slot-row{name="decision"}
  `border-t border-default px-3 py-2 text-xs capitalize text-muted`
  ::
::

## Accessibility

- Both buttons are native `<button type="button">`, so they are tabbable and
  activate on Enter and Space without extra handling.
- The action row unmounts once a decision lands and the verdict text takes its
  place. The verdict is inserted into the live DOM after a button press, so
  screen readers announce it without a focus change, and it is text rather than
  colour.
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
- Rejection collapses via an `AnimatePresence` exit to `height: 0`, so the
  element is measured once on the way out and its space is reclaimed. A rejected
  edit should stop occupying the page.
- The card reads its lines from props and keeps the verdict in local state. A
  stored transcript is rendered by remounting the card with a new `key`, which is
  what replays the wipe and starts a fresh instance pending.

