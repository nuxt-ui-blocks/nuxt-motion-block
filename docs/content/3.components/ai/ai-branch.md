---
title: AI Branch
description: Several answers to the same question, swapped one at a time under an anchor that never moves.
---

A branch is a model's second attempt at the same reply. The reader is comparing
drafts, not reading a new conversation, so the user's message stays put and only
the response changes. Swapping both would reset the context every time and make
three drafts of one answer look like three unrelated exchanges.

The controls sit under the user's bubble, on the side the message came from -
close to the thing being varied, and away from the answer being read. The
readout doubles as the announcement: `aria-live` on "2 of 3" means a screen
reader hears the change without the response being re-read from the top.

Wrapping at both ends is deliberate. A branch list is a small closed set, and
disabling the arrow at the edge would imply the last draft is final.

## Usage

Pass the branches and bind the index. `select` carries the whole branch as well,
so a tracker can record which draft was preferred without mapping the index back.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-branch-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md space-y-3">
    <MAiBranch
      v-model="selected"
      :branches="branches"
    />
    <p class="text-xs text-muted">
      Branch <span class="font-mono">{{ branches[selected]?.id }}</span> of {{ branches.length }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Branch = { id: string, userMessage: string, aiResponse: string }

/**
 * Three real answers, not three rewordings. Branch navigation is only worth a
 * UI when the alternatives differ in what they do.
 */
const branches: Branch[] = [
  {
    id: 'terse',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'Done - removed 4 branches. The backup ref `archive/2026-04` holds the commits for 30 days.',
  },
  {
    id: 'careful',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'I can archive them to a backup ref first, then delete. That keeps the 18 commits recoverable for 30 days without leaving the branches in the list.',
  },
  {
    id: 'explain',
    userMessage: 'Delete the stale branches.',
    aiResponse: 'Nothing on them is reachable from `main`, so deleting only removes the labels. The commits stay in the reflog until gc runs, which is why the backup ref is the part that actually matters.',
  },
]

const selected = ref(0)
</script>
```
::

## Customize

The custom example swaps the assistant bubble for anything through the
`response` slot - a tool call, a diff, a card with a retry action. The slot
receives the branch and its index, so the replacement can render the whole
draft and not just its text.

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ai-branch-custom" />
  :::
#code
  <PlaygroundCode name="AiBranch" />
::

## Props

::component-props
  ::component-prop{name="branches" type="AiBranchData[]"}
  Required. `{ id, userMessage, aiResponse }` drafts. The `id` keys the presence
  animation, so reordering the list does not replay the wrong branch.
  ::
  ::component-prop{name="defaultBranch" type="number" default="0"}
  Which branch to start on. Ignored once `modelValue` is bound.
  ::
  ::component-prop{name="modelValue" type="number"}
  Controlled branch index, i.e. `v-model`. Out-of-range values are clamped on
  read rather than producing an empty bubble.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the wrapper.
  ::
::

## Events

::component-events
  ::component-event{name="update:modelValue" payload="[index: number]"}
  The branch changed, by press or by arrow key. Emitted whether or not the index
  is bound.
  ::
  ::component-event{name="select" payload="[branch: AiBranchData, index: number]"}
  The same change, carrying the branch itself. Useful for logging which draft
  was kept.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="response" props="[branch: AiBranchData, index: number]"}
  Replaces the assistant bubble. The wrapper still owns the entrance and exit, so
  a custom response only has to be the content, not the motion.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiBranch` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  ::
  ::component-slot-row{name="message"}
  The user's bubble column, aligned to the end.
  ::
  ::component-slot-row{name="bubbleUser"}
  The anchor. It inverts so it stays the same shape and colour in every branch.
  ::
  ::component-slot-row{name="controls"}
  The arrow row. It is absent for a single branch.
  ::
  ::component-slot-row{name="control"}
  The `UButton`s. `square` and `ghost` come from the component; this slot carries
  the muted text colour.
  ::
  ::component-slot-row{name="page"}
  The `n of m` readout - the element that carries `aria-live`.
  ::
  ::component-slot-row{name="response"}
  The animating wrapper around the answer.
  ::
  ::component-slot-row{name="bubbleAssistant"}
  The default answer bubble, used when the `response` slot is not filled.
  ::
::

## Accessibility

- The block is a `role="group"` labelled "Response branches", so the controls
  are announced as belonging to something rather than as two loose arrows.
- Both arrows are real buttons with `aria-label`s; the chevron is decorative.
- The `n of m` readout is a live region, so switching branches is announced even
  though the focus stays on the arrow. The new response is not re-read, which is
  what the reader wants - they already know the question.
- Left and right arrows move between branches while a control has focus, on top
  of the buttons' own activation.
- Under `prefers-reduced-motion: reduce` the response changes instantly; the
  vertical travel is removed rather than shortened.
- The user bubble is not colour-only: it is the paragraph the arrows belong to,
  and its position and inversion both signal who said it.

## Performance

- Only the active response is mounted, and `AnimatePresence` runs its exit before
  the next entry, so two long answers are never laid out at once.
- Switching is a single index write; there is no compiled list of mounted
  branches sitting hidden behind `display: none`.
- The transitions are frozen objects from the shared tokens, so a parent
  re-render does not restart the spring mid-swap.
- Branch ids key the animation, so a branch that moves position keeps its
  identity and does not cross-fade with itself.
