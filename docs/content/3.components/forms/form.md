---
title: Form
description: A schema-driven form with animated field entrance, messages and error shakes.
---

A schema-driven form wrapper. Pass a list of fields once and the component
renders the labels, controls, helper copy and error messages, keeps the values
in a single object and links every message to its control. Field errors stay
with the caller: validate on submit, return a map of messages, and the form
animates the ones that are present.

The controls are Nuxt UI primitives, so text, email, password, URL and phone
inputs, textareas, selects and checkboxes inherit the same focus rings,
disabled states and keyboard behaviour as the rest of the library.

## Usage

Pass `fields` and bind `v-model`. On submit, validate the values and assign an
errors object. A field that had an error and is now valid shows the success
message until the next submit.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="form-basic" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center p-6">
    <MForm
      v-model="values"
      class="w-full max-w-md"
      :errors="errors"
      :fields="fields"
      submit-label="Send message"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Ada Lovelace',
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ada@example.com',
    description: 'Only used to reply to this message.',
    autocomplete: 'email',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea' as const,
    placeholder: 'What are you building?',
    rows: 3,
  },
]

const values = ref<Record<string, string | boolean>>({
  name: '',
  email: '',
  message: '',
})

const errors = ref<Record<string, string | undefined>>({})

function handleSubmit(next: Record<string, string | boolean>) {
  const name = String(next.name ?? '').trim()
  const email = String(next.email ?? '').trim()
  const message = String(next.message ?? '').trim()
  const nextErrors: Record<string, string | undefined> = {}

  if (!name) {
    nextErrors.name = 'Tell us who you are.'
  }

  if (!email) {
    nextErrors.email = 'An email address is required.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'That email address looks incomplete.'
  }

  if (!message) {
    nextErrors.message = 'Add a sentence about the project.'
  }

  errors.value = nextErrors
}
</script>
```

::

`errors` is keyed by field name. A field with a message gets `aria-invalid`,
turns its label red and attaches the message to `aria-describedby`. Clear the
entry to remove the error and reveal the success state.

## Customize

Use `select` and `checkbox` field types for richer forms, and the `actions` slot
when the default submit button is not enough. The slot can hold a reset button,
a secondary action or a custom submit control.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="form-custom" />
  :::
#code
```vue
<template>
  <div class="flex w-full justify-center p-6">
    <MForm
      ref="form"
      v-model="values"
      class="w-full max-w-md"
      :errors="errors"
      :fields="fields"
      success-message="Saved"
      @submit="handleSubmit"
    >
      <template #actions>
        <div class="flex flex-wrap items-center gap-2">
          <UButton type="submit">
            Create account
          </UButton>
          <UButton
            type="button"
            color="neutral"
            variant="ghost"
            @click="reset"
          >
            Reset
          </UButton>
        </div>
      </template>
    </MForm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const fields = [
  {
    name: 'name',
    label: 'Name',
    placeholder: 'Ada Lovelace',
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ada@example.com',
    autocomplete: 'email',
  },
  {
    name: 'plan',
    label: 'Plan',
    type: 'select' as const,
    placeholder: 'Choose a plan',
    description: 'You can change this later.',
    options: [
      { label: 'Starter — $0', value: 'starter' },
      { label: 'Studio — $24', value: 'studio' },
      { label: 'Agency — $79', value: 'agency' },
    ],
  },
  {
    name: 'updates',
    label: 'Product updates',
    type: 'checkbox' as const,
    description: 'One short email each month. No noise.',
  },
]

const initialValues = {
  name: '',
  email: '',
  plan: '',
  updates: true,
}

const values = ref<Record<string, string | boolean>>({ ...initialValues })
const errors = ref<Record<string, string | undefined>>({})
const form = ref<{ reset: (values?: Record<string, string | boolean>) => void } | null>(null)

function handleSubmit(next: Record<string, string | boolean>) {
  const nextErrors: Record<string, string | undefined> = {}

  if (!String(next.name ?? '').trim()) {
    nextErrors.name = 'A name is required.'
  }

  const email = String(next.email ?? '').trim()

  if (!email) {
    nextErrors.email = 'Enter your email address.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'Check the email format.'
  }

  if (!String(next.plan ?? '')) {
    nextErrors.plan = 'Pick a plan to continue.'
  }

  errors.value = nextErrors
}

function reset() {
  errors.value = {}
  form.value?.reset({ ...initialValues })
}
</script>
```
::

Field order is the array order. Each field accepts a `name` that becomes the key
in the values and errors objects, a `label`, and a `type` of `text`, `email`,
`password`, `url`, `tel`, `textarea`, `select` or `checkbox`. Select fields read
their choices from `options`, and checkbox fields render with their label
inline.

Call `reset(values?)` on the component ref to clear the submit state and success
messages and to write a fresh set of values. The custom example uses it behind
the reset button, after clearing its own errors.

## Props

::component-props
  ::component-prop{name="fields" type="FormFieldConfig[]" required}
  Ordered field schema. Each entry needs `name` and `label`; `type`,
  `placeholder`, `description`, `options`, `autocomplete`, `required` and
  `rows` are optional.
  ::
  ::component-prop{name="modelValue" type="Record<string, string | boolean>"}
  Controlled values keyed by field name. Leave it out to let the form hold its
  own values.
  ::
  ::component-prop{name="errors" type="Record<string, string | undefined>"}
  Error messages keyed by field name. An empty or missing entry means the field
  is valid.
  ::
  ::component-prop{name="submitLabel" type="string" default="Submit"}
  Label for the default submit button.
  ::
  ::component-prop{name="successMessage" type="string" default="Looks good"}
  Copy shown under a previously invalid field once it passes validation.
  ::
  ::component-prop{name="disabled" type="boolean" default="false"}
  Disable every control and the default submit button.
  ::
  ::component-prop{name="class" type="string"}
  Extra classes for the form element.
  ::
::

## Events

::component-props
  ::component-prop{name="update:modelValue" type="(values: Record<string, string | boolean>) => void"}
  Emitted with a shallow copy of the values whenever a control changes.
  ::
  ::component-prop{name="submit" type="(values: Record<string, string | boolean>) => void"}
  Emitted on submit with the current values. The event is always prevented, so
  the page does not reload.
  ::
::

## Slots

::component-props
  ::component-prop{name="actions" type="slot"}
  Replaces the default submit button. Use it for a custom button row while
  keeping the form element and its submit handler.
  ::
::

## Accessibility

- Every control has a label tied to it with `for` and `id`, including the
  checkbox, which uses the Nuxt UI checkbox label.
- `aria-describedby` lists the helper text and the error message together, so a
  screen reader hears both in reading order.
- A field with an error gets `aria-invalid="true"`, and the message is rendered
  with `role="alert"` so it is announced when it appears.
- The success state uses a check icon plus the words from `successMessage`; a
  colour is never the only signal that a field is valid.
- The form uses native submission, so pressing Enter in a text field submits
  it. `novalidate` keeps the browser's own bubbles out of the way because
  validation belongs to the caller.
- The entrance stagger and error shake are decorative. Under
  `prefers-reduced-motion: reduce` the stagger is removed and the shake is not
  started at all; error text still appears.
- `disabled` is passed to each control, so fields cannot be edited or submitted
  while the form is busy or read-only.

## Performance

- Fields render from a single `v-for`; there is no per-field component or
  watcher.
- One shallow error watcher starts the shake for messages that arrive after a
  submit. Values are copied shallowly on each edit, not deep-cloned.
- Entrance and message movement are CSS transitions and keyframes. The shake
  runs through the Web Animations API only when a submit produces an error, so
  nothing runs on idle.
- The component has no timers, observers or network requests. Validation stays
  in the caller, so the bundle carries only the layout and behaviour.
