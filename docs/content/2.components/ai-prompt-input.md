---
title: AI Prompt Input
description: The composer: attachments, a live counter, and a submit button that becomes stop.
navigation:
  icon: i-lucide-text-cursor-input
---

# AI Prompt Input

The composer. It re-bases on Nuxt UI's `ChatPrompt` and `ChatPromptSubmit`, so the
box, the field and the button belong to the design system rather than to this
module ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â and you inherit autoresize, the Enter / Shift+Enter and Escape keys, the
IME guard on Enter, focus rings, and the send / stop / reload glyph set.

The IME guard is worth calling out: accepting a Japanese candidate with Enter used
to both submit the prompt and swallow the character. That is handled for you.

The module keeps only the motion it owns ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the attachment chips, the character
counter, and the press physics plus crossfade on the submit button. The box's own
chrome is the theme's, and the only status it carries is an accent ring on `error`
and `done`.

Pair it with [AI Messages](/docs/components/ai-messages) for the transcript and
[AI Orb Face](/docs/components/ai-orb-face) for the character above it.

## Usage

Bind `v-model` to the draft, set `state`, and handle `submit`. Everything else ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â
attachments, the counter, the button swap ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â is opt-in through `attachable`,
`removable` and `max-length`.

::code-preview
---
label: Preview
---
  :::div{class="flex justify-center w-full h-full"}
    <component-example name="ai-prompt-input-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full max-w-lg flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <UButton
        v-for="value in states"
        :key="value"
        :color="state === value ? 'primary' : 'neutral'"
        :label="value"
        size="sm"
        :variant="state === value ? 'solid' : 'outline'"
        @click="state = value"
      />
    </div>

    <MAiPromptInput
      v-model="draft"
      :attachments="attachments"
      attachable
      :max-length="180"
      placeholder="Ask anythingÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦"
      removable
      :state="state"
      @attach="onAttach"
      @remove-attachment="onRemoveAttachment"
      @submit="onSubmit"
      @stop="state = 'idle'"
    >
      <UButton
        color="neutral"
        icon="i-lucide-globe"
        size="xs"
        variant="ghost"
      />
    </MAiPromptInput>

    <p class="text-xs text-muted">
      {{ draft ? `last submit: "${submitted}"` : 'type something, or attach a file' }}
    </p>
  </div>
</template>

<script setup lang="ts">
type Attachment = {
  id: string
  name: string
  size?: number
}

type DemoState = 'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'

const states: DemoState[] = ['idle', 'thinking', 'streaming', 'done', 'error']

const draft = ref('')
const submitted = ref('')
const state = ref<DemoState>('idle')
const attachments = ref<Attachment[]>([])

const onAttach = () => {
  attachments.value = [
    ...attachments.value,
    { id: `f-${attachments.value.length + 1}`, name: 'token-audit.md', size: 18_432 }
  ]
}

const onRemoveAttachment = (id: string) => {
  attachments.value = attachments.value.filter(file => file.id !== id)
}

const onSubmit = (value: string) => {
  submitted.value = value
  attachments.value = []
  state.value = 'streaming'
}
</script>
```
::

## Props

::field-group
  ::field{name="state" type="'idle' | 'listening' | 'thinking' | 'streaming' | 'done' | 'error'" default="'idle'"}
  Shared AI state. A turn in flight turns submit into stop. `error` and `done`
  add an accent ring to the box; nothing else about the box changes, because a
  composer that reshapes per state fights the text the user is writing.
  ::
  ::field{name="modelValue" type="string"}
  Controlled draft. Leave it undefined and the component owns the value; bind it
  with `v-model` and it emits `update:modelValue` instead of clearing itself on
  submit. Submitting always emits the trimmed value.
  ::
  ::field{name="attachments" type="AIPromptAttachment[]" default="[]"}
  Files already attached to the draft, as `{ id, name, size? }`. `size` is in
  bytes and is rendered as `B`, `KB` or `MB` when present. Attachments live in the
  header because they belong to the draft, not to the message.
  ::
  ::field{name="attachable" type="boolean" default="false"}
  Show the paperclip control. It emits `attach` and does nothing else ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â opening a
  file dialog is your call, because only you know where your files live.
  ::
  ::field{name="removable" type="boolean" default="false"}
  Show a remove control per attachment. It emits `removeAttachment` with the
  attachment's `id`; removing it from the array is your job.
  ::
  ::field{name="maxLength" type="number"}
  Shows a `draft/maxLength` counter once the draft passes 80% of the limit, and
  turns the counter red past it. It does **not** truncate ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â enforce the limit in
  your submit handler if you need it.
  ::
  ::field{name="submitOnEnter" type="boolean" default="true"}
  `true` submits on Enter and inserts a newline on Shift+Enter. `false` inverts
  that, so Enter inserts a newline and Ctrl/Cmd+Enter submits ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the right default
  for composers holding multi-line prompts.
  ::
  ::field{name="placeholder" type="string" default="'Ask anythingÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¦'"}
  Forwarded to the underlying field. Without an `ariaLabel`, the placeholder is
  the only thing naming the textarea.
  ::
  ::field{name="ariaLabel" type="string"}
  Accessible name for the field, forwarded to the textarea rather than the box ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â
  which is where it belongs. Set it when the composer is embedded in a larger
  surface that needs to say what the prompt is *for*.
  ::
  ::field{name="autofocus" type="boolean" default="false"}
  Focus the field on mount. Off by default, unlike `ChatPrompt`: a composer that
  grabs focus the moment it renders is hostile inside a page that also has
  something to say.
  ::
  ::field{name="disabled" type="boolean" default="false"}
  Disable the field and the attach control. Submitting is dropped while disabled.
  ::
  ::field{name="error" type="Error"}
  Passed to the underlying component, which renders it.
  ::
  ::field{name="ui" type="ChatPromptProps['ui']"}
  Themed slot overrides, merged over this module's own spacing rather than
  replacing it.
  ::
  ::field{name="class" type="string"}
  Merged onto the underlying prompt box.
  ::
::

## Events

::field-group
  ::field{name="submit" payload="[value: string]"}
  The draft was submitted. The payload is trimmed and never empty ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the underlying
  component will not submit an empty draft.
  ::
  ::field{name="update:modelValue" payload="[value: string]"}
  Emitted on every keystroke. Present whether or not you bound `v-model`.
  ::
  ::field{name="attach"}
  The paperclip was pressed. Open your own file dialog.
  ::
  ::field{name="removeAttachment" payload="[id: string]"}
  A chip's remove button was pressed. Filter that `id` out of your array.
  ::
  ::field{name="stop"}
  The submit button was pressed while a turn was in flight.
  ::
  ::field{name="reload"}
  The submit button's reload affordance was used.
  ::
  ::field{name="close"}
  The underlying prompt requested closing.
  ::
::

## Slots

::field-group
  ::field{name="default"}
  Renders to the left of the submit button, after the attach control ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â the place
  for a model picker, a mode toggle, or a web-search toggle.
  ::
::

## Accessibility

- `ariaLabel` goes on the textarea, not the box, so the announced name matches
  the element that actually takes focus.
- The attach button and each chip's remove button are native `<button>`s with
  `aria-label`s ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â "Attach a file", and "Remove *filename*". The icons inside them
  are `aria-hidden`.
- The counter uses `tabular-nums`, so the digits do not reflow as the count
  climbs, and it turns to the error colour past the limit.
- The field grows to at most 8 rows and then scrolls. A long draft stays editable
  rather than pushing the whole page down.
- An empty draft cannot be submitted, but stop always works. That asymmetry comes
  from the underlying submit component honouring `disabled` only in the `ready`
  state, and it is the correct rule: you must always be able to interrupt a turn.
- Enter submissions are dropped while the field is disabled.
- Under `prefers-reduced-motion: reduce` the attachment list, the chips, the
  counter and the submit swap all resolve to instant state changes with no travel
  and no press physics.
- The submit button is keyed on `chatStatus` and swapped with `mode="popLayout"`,
  so the outgoing button leaves flow immediately instead of the row jumping
  mid-swap. That is a layout guarantee, not decoration: a composer that jumps is
  a composer people misclick.

## Performance

- Every animation variant is hoisted to a module-level constant. A re-render on
  every keystroke cannot allocate them.
- The attachment list and chips use `layout` animation so removing a chip slides
  the survivors into place, but only when reduced motion is off.
- The submit swap is paced by the state: `duration: 0.18 / speed`. A `thinking`
  composer is faster than an `idle` one, so the control stays responsive during
  the state where a user is most likely to interrupt.
- The draft is a computed with a getter and a setter, so controlled and
  uncontrolled modes are one code path rather than two branches in the template.
- Unmanaged draft only: submitting clears an internal value, never a bound one.
  Wiping a controlled draft would fight whoever owns it.
- `ui` is rebuilt as a computed so the accent ring can join the root's classes
  without allocating on every keystroke.

## UI

This component's theme exposes the slots below. Override any of them per instance with the [`ui` prop](/getting-started/theming), or app-wide under `ui.aiPromptInput` in `app.config.ts`.

::field-group
  ::field{name="ui" type="object"}
  Per-slot classes merged over the theme defaults.
  ::
::

| Slot | Default classes |
| ---- | --------------- |
| `root` | `gap-0` |
| `footer` | `pt-2` |
| `attachments` | `flex list-none flex-wrap gap-1.5 overflow-hidden py-1.5` |
| `attachment` | `flex items-center gap-1.5 rounded-lg border border-default bg-muted/50 py-1 pr-1 pl-2 text-xs` |
| `attachmentName` | `max-w-40 truncate` |
| `attachmentSize` | `text-muted` |
| `remove` | `cursor-pointer rounded-md p-0.5 text-muted transition-colors hover:bg-muted hover:text-highlighted` |
| `removeIcon` | `size-3` |
| `tools` | `flex min-w-0 items-center gap-1` |
| `attach` | `cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-muted hover:text-highlighted` |
| `attachIcon` | `size-4` |
| `actions` | `relative flex items-center gap-2` |
| `submit` | `flex` |
| `counter` | `text-xs tabular-nums` |
