---
title: AI Approval
description: The card an agent puts up before it acts, where the chosen option fills the card and the rest collapse away.
---

An approval is the one moment in a chat where the reader's answer changes what
happens next. The card has to read as a question, and the answer has to read as a
decision - not as a form control that has been filled in.

So choosing does not tick a radio button. The chosen option expands to fill the
card, keeping its label and its detail, and the alternatives collapse out of
existence. What is left is a statement: one line that says what was decided.
Greyed-out rejected options would invite a second look at something that already
happened, which is the opposite of what an irreversible action should feel like.

The card keeps its own state so it works with no wiring at all, but it accepts
`resolvedId` for the transcript case - replaying a conversation where the decision
was already made. Passing `undefined` puts the options back.

## Usage

Give it the question and the options. The default slot is extra context under the
question: what the action touches, how long the backup lasts, what cannot be
undone. Listen for `decide` to send the answer back to the agent.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-approval-basic" />
  :::
#code
```vue
<template>
  <div class="w-full max-w-md space-y-3">
    <MAiApproval
      :options="options"
      :question="question"
      :resolved-id="resolvedId"
      @decide="onDecide"
    >
      This deletes 4 branches and 18 commits. The backup ref stays for 30 days,
      and nothing here is reachable from `main`.
    </MAiApproval>

    <UButton
      v-if="resolvedId"
      color="neutral"
      size="xs"
      variant="ghost"
      @click="resolvedId = undefined"
    >
      Replay the decision
    </UButton>
  </div>
</template>

<script setup lang="ts">
type Option = { id: string, label: string, detail?: string, destructive?: boolean }

const question = 'Delete the stale branches?'

const options: Option[] = [
  { id: 'keep', label: 'Keep them', detail: 'No change' },
  { id: 'archive', label: 'Archive to a backup ref', detail: '4 branches' },
  { id: 'delete', label: 'Delete everything', detail: '18 commits', destructive: true },
]

/**
 * Held here only so the demo can be replayed; the card resolves itself without
 * it. In a real transcript this is the id that came back from the server.
 */
const resolvedId = ref<string | undefined>(undefined)

const onDecide = (option: Option) => {
  resolvedId.value = option.id
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
    <component-example name="ai-approval-custom" />
  :::
#code
  <PlaygroundCode name="AiApproval" />
::

## Props

::component-props
  ::component-prop{name="question" type="string"}
  Required. What the agent needs a human to settle, in one line.
  ::
  ::component-prop{name="options" type="AiApprovalOption[]"}
  Required. `{ id, label, detail?, destructive? }` rows. Two options read best;
  past four the card stops being a decision and starts being a menu.
  ::
  ::component-prop{name="resolvedId" type="string"}
  Render already resolved, e.g. when replaying a transcript. The component keeps
  its own state, so this is optional even after a decision.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the card, not the options.
  ::
::

## Events

::component-events
  ::component-event{name="decide" payload="[option: AiApprovalOption]"}
  Fired once, with the chosen option. A second press is ignored - the options are
  already gone, and a decision that can be re-fired is not a decision.
  ::
::

## Slots

::component-slots
  ::component-slot-row{name="default"}
  Extra context under the question. It is wired to the card with
  `aria-describedby`, so the consequences are announced with the question rather
  than after the buttons.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiApproval` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  The card, and the element that carries the layout animation as it shrinks.
  ::
  ::component-slot-row{name="question"}
  ::
  ::component-slot-row{name="detail"}
  The default slot's wrapper.
  ::
  ::component-slot-row{name="body"}
  The region that swaps options for the resolved row.
  ::
  ::component-slot-row{name="options"}
  The column of buttons, and the element that exits as a group.
  ::
  ::component-slot-row{name="option"}
  One button. The `destructive` variant swaps its border and text to the error
  hue.
  ::
  ::component-slot-row{name="optionLabel"}
  ::
  ::component-slot-row{name="optionDetail"}
  The right-aligned note - "18 commits".
  ::
  ::component-slot-row{name="resolved"}
  The decision. Its `tone` variant inverts for a neutral choice and keeps the
  error wash for a destructive one.
  ::
  ::component-slot-row{name="resolvedIcon"}
  ::
  ::component-slot-row{name="resolvedLabel"}
  ::
  ::component-slot-row{name="resolvedDetail"}
  ::
::

## Accessibility

- The card is a `role="group"` labelled by the question and described by the
  slot, so a screen reader hears what is being decided and what it costs before
  it reaches the first button.
- The resolved row is `role="status"`, so the decision is announced when the
  options are replaced. Without it, the focused button vanishes and the reader is
  told nothing.
- The tick is `aria-hidden` and the row carries a visually hidden "Decision:"
  prefix; a lone option label reads as another option otherwise.
- `destructive` changes the border and the text colour, never only a dot or an
  icon, and the label carries the words.
- Under `prefers-reduced-motion: reduce` the swap is instant, the card does not
  animate its height, and the option stagger is removed.
- Every option is a real `button`, so the card is usable with the keyboard and
  announces "button" rather than relying on a click handler.

## Performance

- The options are swapped with `AnimatePresence` in `popLayout` mode, so the
  exiting column is taken out of layout immediately and the card's height springs
  once instead of twice.
- The option transitions are computed from the list, so a re-render that does not
  change the options reuses the same objects and does not restart the stagger.
- Only the resolved row and the card carry layout animation. The inner buttons
  are plain springs on `y` and `opacity`, which the compositor can run without a
  layout pass.
- The decided id is a single ref; nothing is derived per option, so a card with
  two options and a card with six do the same work per frame.
