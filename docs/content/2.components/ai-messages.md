---
title: AI Messages
description: A transcript of chat turns, with this module's six AI states mapped onto Nuxt UI's four.
navigation:
  icon: i-lucide-messages-square
---

# AI Messages

The transcript: a scrolling list of turns with per-role defaults already set.
It wraps Nuxt UI's `UChatMessages` and does one thing the wrapper cannot — it
accepts this module's six-state `AIState` vocabulary and translates it down to
the four states chat components actually speak.

That translation is the whole reason it exists. `idle`, `listening`, `thinking`,
`streaming`, `done`, `error` describe what an AI surface is doing far better
than `ready` / `submitted` / `streaming` / `error` describe what a chat list
should show. Rather than asking every consumer to bridge the two, this component
collapses the six onto the four in one place:

| `state` | chat status | why |
| --- | --- | --- |
| `idle` | `ready` | resting, input accepted |
| `listening` | `ready` | still taking input in, so it is still ready |
| `thinking` | `submitted` | a turn is in flight, nothing has arrived |
| `streaming` | `streaming` | tokens are landing |
| `done` | `ready` | finished, back to a resting surface |
| `error` | `error` | the turn failed |

## Usage

Pass your turns as messages with `parts` and set `state` to whichever of the six
AI states the surface is in — you never pick a chat status yourself. To render a
single turn with the motion-choreographed action row, see
[AI Message](/docs/components/ai-message).

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-messages-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        :variant="state === value ? 'solid' : 'outline'"
        size="sm"
        @click="state = value"
      />
    </div>

    <div class="rounded-2xl border border-default">
      <MAiMessages
        :messages="messages"
        :state="state"
        class="max-h-72"
      >
        <template #leading="{ role }">
          <MAgentAvatar
            v-if="role !== 'user'"
            :seed="role"
            :size="28"
          />
        </template>
      </MAiMessages>
    </div>
  </div>
</template>

<script setup lang="ts">
type ChatMessage = {
  id: string
  role: 'system' | 'user' | 'assistant'
  parts: { type: string, text?: string }[]
  metadata?: unknown
}

type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'thinking', 'streaming', 'done', 'error']
const state = ref<DemoState>('idle')

const messages = ref<ChatMessage[]>([
  {
    id: 'm-1',
    role: 'user',
    parts: [{ type: 'text', text: 'Why does the token audit need a flag?' }]
  },
  {
    id: 'm-2',
    role: 'assistant',
    parts: [{
      type: 'text',
      text: 'It walks every theme token, so landing it cold produces a long tail of visual diffs that nobody has reviewed yet.'
    }]
  }
])
</script>
```
::

## Props

::field-group
  ::field{name="messages" type="AiUIMessage[]"}
  Required. Each entry is `{ id, role, parts, metadata? }`, where `role` is
  `'system' | 'user' | 'assistant'` and `parts` is an array of
  `{ type, state?, text? }`. `type` is a plain string, so a part type the AI SDK
  adds later cannot break your build.
  ::
  ::field{name="state" type="'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'"}
  The conversation's state in this module's vocabulary, mapped internally onto a
  chat status per the table above. Omit it for a settled conversation.
  ::
  ::field{name="user" type="Record<string, unknown>"}
  Extra props for the `user` role, merged over the defaults
  `{ side: 'right', variant: 'solid', color: 'neutral' }`.
  ::
  ::field{name="assistant" type="Record<string, unknown>"}
  Extra props for the `assistant` role, merged over the defaults
  `{ side: 'left', variant: 'soft' }`. Assistant turns stay soft rather than
  solid so a turn carrying its own surfaces — a reasoning trace, a tool call — is
  not boxed twice.
  ::
  ::field{name="compact" type="boolean" default="false"}
  Tighter vertical rhythm, passed through to the wrapper.
  ::
  ::field{name="shouldAutoScroll" type="boolean" default="false"}
  Track new content automatically.
  ::
  ::field{name="shouldScrollToBottom" type="boolean" default="true"}
  Jump to the newest turn when the list mounts.
  ::
  ::field{name="spacingOffset" type="number" default="0"}
  Extra scroll room at the end of the list, in pixels. Raise it when the prompt
  input sits above the transcript rather than below it.
  ::
  ::field{name="class" type="string" default="''"}
  Merged onto the wrapper.
  ::
::

## Slots

The wrapper forwards every slot it does not consume — `header`, `leading`,
`files`, `body`, `content`, `actions` — into each turn. Slot props come from
`UChatMessages`, so a `#leading` receives the turn's `role`, and a `#body`
receives the turn's `parts`. A `#default` slot is forwarded too, which is the
supported way to draw the list yourself.

To get the motion-choreographed action row and the per-role bubble defaults on
each turn, use [AI Message](/docs/components/ai-message) inside a `#default`
slot instead of relying on the wrapper's own rendering.

## Accessibility

- This component adds no ARIA of its own; the scroll container, landmarks and
  live-region behaviour come from `UChatMessages`.
- `state` is the hook a screen reader can be told about. Nuxt UI announces status
  changes off the mapped chat status, which is why `thinking` and `streaming`
  map to `submitted` and `streaming` and not to `ready`.
- Because `listening` and `done` both collapse to `ready`, neither announces a
  change to assistive technology. If your UI needs those distinctions spoken,
  render them yourself rather than assuming the transcript will.
- The list has no fixed height by default. Set one on the wrapper — `max-h-72` in
  the example above — so scrolling actually happens, and keep the scroll container
  focusable if you want keyboard paging.

## Performance

- `state` is resolved through a `computed`, so a per-frame state change never
  re-renders the list; only the computed status string changes, and the wrapper
  receives a different `status` prop.
- The forwarded-slot list is derived from `useSlots()` on each render, so adding
  a slot is picked up without a restart.
- Role defaults are declared `as const`. An object literal inside a `computed`
  widens `side`, `variant` and `color` to `string`, which no longer satisfies
  the unions `ChatMessage` expects — a type error that only appears once the
  merge is written naively.
- `user` and `assistant` are spread into fresh objects per change, so mutating a
  role's props does not leak into the other role's defaults.
