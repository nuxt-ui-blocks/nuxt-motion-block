---
title: AI Message
description: One chat turn — role, part-driven content, a copy action and your own actions.
---

A single turn in a conversation. It wraps Nuxt UI's `UChatMessage` with a
motion-choreographed action row, sensible defaults per role, and typed slots —
so you render one message here and never hand-assemble an avatar, a bubble, a
header and a copy button.

Defaults are the reason it exists. A user turn is solid and right-aligned, the
way a sent message reads everywhere. An assistant turn is soft and left-aligned,
so it does not fight the reasoning traces, tool cards and diffs it usually
contains. Pass `bubble: false` and you get neither.

Use it for one turn. For the transcript, see
[AI Messages](/components/ai/ai-messages).

## Usage

Give it a `role` and some content and the styling follows: solid and right for
`user`, soft and left for everything else. Override the defaults only where the
conversation genuinely needs it.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-message-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="rounded-2xl border border-default p-4">
      <MAiMessage
        id="turn-1"
        :parts="[{ type: 'text', text: 'Ship the token audit behind a flag, or land it cold?' }]"
        role="user"
      />
    </div>

    <div class="rounded-2xl border border-default p-4">
      <MAiMessage
        id="turn-2"
        :actions="voteActions"
        :bubble="bubble"
        :parts="assistantParts"
        role="assistant"
      >
        <template #header>
          <span class="flex items-center gap-2 text-xs text-muted">
            <MAgentAvatar
              :seed="'reviewer'"
              :size="20"
            />
            Reviewer
          </span>
        </template>
      </MAiMessage>
    </div>

    <USwitch
      v-model="bubble"
      class="self-start"
      label="bubble"
    />
  </div>
</template>

<script setup lang="ts">
type MessageAction = {
  key: string
  icon: string
  label: string
  active?: boolean
  onClick: () => void
}

const bubble = ref(true)
const vote = ref<'up' | 'down' | null>(null)

const assistantParts = [
  { type: 'reasoning', text: 'Check blast radius, then pick a default.' },
  { type: 'text', text: 'Behind a flag. The audit walks every theme token, so landing it cold means a long tail of visual diffs nobody has reviewed yet.' },
]

const voteActions = computed<MessageAction[]>(() => [
  {
    key: 'up',
    icon: 'i-lucide-thumbs-up',
    label: 'good response',
    active: vote.value === 'up',
    onClick: () => vote.value = vote.value === 'up' ? null : 'up',
  },
  {
    key: 'down',
    icon: 'i-lucide-thumbs-down',
    label: 'bad response',
    active: vote.value === 'down',
    onClick: () => vote.value = vote.value === 'down' ? null : 'down',
  },
])
</script>
```
::


## Customize

::code-preview
---
label: Preview
---
  :::div{class="w-full"}
    <component-example name="ai-message-custom" />
  :::
#code
  <PlaygroundCode name="AiMessage" />
::

## Props

::component-props
  ::component-prop{name="id" type="string"}
  Required. Stable identity for the turn. The `parts` array is keyed off it, so
  changing it remounts the message rather than reconciling two different turns.
  ::
  ::component-prop{name="role" type="'system' | 'user' | 'assistant'"}
  Required. Drives the default `side` and `variant`, and whether a copy action is
  offered first.
  ::
  ::component-prop{name="parts" type="AiMessagePart[]"}
  Required. The turn's content as typed pieces — `{ type, state?, text? }`.
  `type` is a plain string, not a union, so a part type the AI SDK adds later
  cannot break your build. The `#content` slot receives the joined plain text of
  every `type: 'text'` part.
  ::
  ::component-prop{name="bubble" type="boolean" default="true"}
  Wrap the turn in a surface. Set `false` when the turn already brings its own
  surfaces — a reasoning trace, a tool call, a diff — because a bubble around a
  stack of cards reads as a box inside a box.
  ::
  ::component-prop{name="side" type="'left' | 'right'"}
  Overrides alignment. Defaults to `right` for `user` and `left` otherwise.
  ::
  ::component-prop{name="variant" type="'solid' | 'outline' | 'soft' | 'subtle' | 'naked'"}
  Overrides the surface style. Defaults to `solid` for a bubbled user turn,
  `soft` for a bubbled assistant turn, and `naked` whenever `bubble` is `false`.
  ::
  ::component-prop{name="color" type="'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'"}
  Passed straight through to the underlying `UChatMessage`.
  ::
  ::component-prop{name="copyable" type="boolean" default="true"}
  Offer a copy action — but only when the turn has plain text. A turn made purely
  of tool calls has nothing to copy, so no button appears.
  ::
  ::component-prop{name="actions" type="AiMessageAction[]" default="[]"}
  Extra `{ key, icon, label, active?, onClick }` objects, rendered after the copy
  button. `active: true` marks the button as a toggle that is currently on.
  ::
  ::component-prop{name="metadata" type="unknown"}
  Anything else you want to hand to the slots — a model name, token counts, a
  timestamp.
  ::
  ::component-prop{name="class" type="string" default="''"}
  Merged onto the underlying `UChatMessage` root.
  ::
::

## Slots

Every message-level slot receives `{ id, role, parts, metadata }`. The
`#content` slot additionally receives `content`, the joined plain text.

::component-slots
  ::component-slot-row{name="header"}
  Replaces the header row entirely.
  ::
  ::component-slot-row{name="leading"}
  The avatar slot, to the left of the bubble.
  ::
  ::component-slot-row{name="files"}
  Where attachments render.
  ::
  ::component-slot-row{name="body"}
  The full body area. Use it when you are composing cards rather than text.
  ::
  ::component-slot-row{name="content"}
  Just the text. Receives the derived `content` string alongside the message props.
  ::
  ::component-slot-row{name="actions" type="{ actions: AiMessageAction[] }"}
  Rendered before the default icon buttons. To replace them, override `#body` as
  well.
  ::
::

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiMessage` in `app.config.ts`.

::component-props
  ::component-prop{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

::component-slots
  ::component-slot-row{name="root"}
  `ai-message-root`
  ::
  ::component-slot-row{name="action"}
  `ai-message-action cursor-pointer rounded-lg p-1.5 text-muted hover:bg-muted hover:text-default aria-pressed:bg-muted aria-pressed:text-default`
  ::
  ::component-slot-row{name="actionIcon"}
  `ai-message-pop`
  ::
::

## Accessibility

- The action row is hover-revealed, which would hide it from anyone tabbing
  through the transcript — so `:focus-within` reveals it too. Focus counts as
  intent.
- Each action is a native `<button>` carrying its `label` as `aria-label`, since
  the visible content is an icon only. The icon itself is `aria-hidden`.
- A toggle action sets `aria-pressed`, so a cast vote is announced as pressed
  rather than only looking pressed.
- Buttons slide in from the side their message belongs to — left for the agent,
  right for the user — via a `--ai-message-slide` custom property, so the reveal
  points at the turn it belongs to.
- Under `prefers-reduced-motion: reduce` the slide is dropped and the copy icon's
  pop keyframe is disabled; the buttons simply appear.
- The copy button's success state lasts 1600ms and then reverts. A refused
  clipboard permission is swallowed: the icon does not change and nothing is
  announced, because a failure here is not worth interrupting a reader over.
- The component sets no landmark or ARIA role of its own; semantics come from
  `UChatMessage`.

## Performance

- Nuxt UI owns the row's opacity reveal and these buttons own `transform` — one
  property per owner, so the two fades never fight.
- The copy timer is cleared on every copy and again in `onBeforeUnmount`, so a
  fast double-click or a mid-transition unmount cannot leave a stray timer
  writing to a detached component.
- Only `text` parts are joined for the copy string. Reasoning traces and file
  parts are skipped, so a turn with a long trace does not copy the trace.
- The action array is a `computed`, so the copy button's icon and label swap on a
  1600ms timer without re-rendering the message body.

