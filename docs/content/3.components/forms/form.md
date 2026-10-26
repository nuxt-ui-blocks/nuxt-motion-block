---
title: Form
description: A schema-driven form with animated field entrance, messages and error shakes.
---

A schema-driven form wrapper. Pass a list of fields once and the component
renders the labels, controls, helper copy and error messages, keeps the values
in a single object and links every message to its control. Validation is either
a Standard Schema (Zod, Valibot, Yup) or a map of messages returned by the
caller, and the form animates the errors that are present.

The form is built on Nuxt UI's `Form` and `FormField` components. Each field is
wrapped in a `UFormField`, which owns the label, the helper copy, the error
message and the ids that tie them to the control. The controls themselves are
Nuxt UI primitives, so text, email, password, URL and phone inputs, textareas,
selects, checkboxes, radios and switches inherit the same focus rings, disabled
states and keyboard behaviour as the rest of the library.

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

Helper copy sits under the field label, above the control, so the label and its
explanation read as one block. Checkbox fields are the exception: their label
sits inline with the box, so the helper copy moves under the control instead.

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
`password`, `url`, `tel`, `textarea`, `select`, `radio`, `checkbox` or `switch`.
Select and radio fields read their choices from `options`; radios lay out with
`orientation`, defaulting to `vertical`. Checkbox and switch fields render their
label inline next to the control.

Call `reset(values?)` on the component ref to clear the submit state and success
messages and to write a fresh set of values. The custom example uses it behind
the reset button, after clearing its own errors.

## Complex fields

Radio groups, switches, selects with icons and inputs with leading or trailing
icons all come from the same field config. A `radio` field renders a Nuxt UI
radio group, so its label becomes the group legend and the options use the same
`label` and `value` shape as a select.

Password fields can opt into a show/hide toggle with `reveal`, and `icon` and
`trailingIcon` place icons inside any text input.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="form-complex" />
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
      success-message="Account ready"
      submit-label="Create workspace"
      @submit="handleSubmit"
    >
      <template #actions>
        <div class="flex flex-wrap items-center gap-2">
          <UButton type="submit">
            Create workspace
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
    label: 'Workspace name',
    placeholder: 'Acme Studio',
    description: 'Shown on invoices and shared links.',
    icon: 'i-lucide-building-2',
    autocomplete: 'organization',
    required: true,
  },
  {
    name: 'email',
    label: 'Billing email',
    type: 'email' as const,
    placeholder: 'billing@acme.com',
    icon: 'i-lucide-mail',
    autocomplete: 'email',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password' as const,
    placeholder: 'At least 8 characters',
    description: 'Used to sign in to the workspace.',
    icon: 'i-lucide-lock',
    autocomplete: 'new-password',
    reveal: true,
    required: true,
  },
  {
    name: 'website',
    label: 'Website',
    type: 'url' as const,
    placeholder: 'https://acme.com',
    icon: 'i-lucide-globe',
    trailingIcon: 'i-lucide-arrow-up-right',
    autocomplete: 'url',
  },
  {
    name: 'plan',
    label: 'Plan',
    type: 'select' as const,
    placeholder: 'Choose a plan',
    description: 'You can change this at any time.',
    options: [
      { label: 'Starter', value: 'starter', icon: 'i-lucide-leaf' },
      { label: 'Studio', value: 'studio', icon: 'i-lucide-sparkles' },
      { label: 'Agency', value: 'agency', icon: 'i-lucide-building' },
    ],
    required: true,
  },
  {
    name: 'billing',
    label: 'Billing period',
    type: 'radio' as const,
    orientation: 'horizontal' as const,
    options: [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
  {
    name: 'updates',
    label: 'Product updates',
    type: 'checkbox' as const,
    description: 'One short email each month. No noise.',
  },
  {
    name: 'twoFactor',
    label: 'Two-factor authentication',
    type: 'switch' as const,
    description: 'Ask for a code from your authenticator app at sign-in.',
  },
  {
    name: 'terms',
    label: 'I agree to the terms of service',
    type: 'checkbox' as const,
    description: 'Required before the workspace can be created.',
  },
]

const initialValues = {
  name: '',
  email: '',
  password: '',
  website: '',
  plan: '',
  billing: '',
  updates: true,
  twoFactor: false,
  terms: false,
}

const values = ref<Record<string, string | boolean>>({ ...initialValues })
const errors = ref<Record<string, string | undefined>>({})
const form = ref<{ reset: (values?: Record<string, string | boolean>) => void } | null>(null)

function handleSubmit(next: Record<string, string | boolean>) {
  const nextErrors: Record<string, string | undefined> = {}

  if (!String(next.name ?? '').trim()) {
    nextErrors.name = 'Give the workspace a name.'
  }

  const email = String(next.email ?? '').trim()

  if (!email) {
    nextErrors.email = 'Enter a billing email.'
  }
  else if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email)) {
    nextErrors.email = 'Check the email format.'
  }

  const password = String(next.password ?? '')

  if (!password) {
    nextErrors.password = 'Choose a password.'
  }
  else if (password.length < 8) {
    nextErrors.password = 'Use at least 8 characters.'
  }

  if (!String(next.plan ?? '')) {
    nextErrors.plan = 'Pick a plan to continue.'
  }

  if (!String(next.billing ?? '')) {
    nextErrors.billing = 'Choose a billing period.'
  }

  if (!next.terms) {
    nextErrors.terms = 'Accept the terms to continue.'
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

An unchecked switch and an unchecked checkbox hold the same `false` value, so
one validation branch covers both. Radio groups and selects store the option
`value`, which keeps values plain strings across the whole form.

## Validation

Pass a Standard Schema validator with `schema` and the form validates on
submit, blur, change and input. Any library that implements the spec works:
Zod, Valibot, Yup, Joi, ArkType or Regle. Issues are keyed by their path, so a
message on `role` lands on the field named `role`.

::code-preview
---
label: Preview
---

  :::div{class="w-full"}
    <component-example name="form-schema" />
  :::
#code
```vue
<template>
  <div class="flex w-full flex-col items-center gap-4 p-6">
    <MForm
      v-model="values"
      class="w-full max-w-md"
      :schema="schema"
      :fields="fields"
      success-message="Invite sent"
      submit-label="Send invite"
      @submit="handleSubmit"
    />

    <p
      v-if="submitted.email"
      class="text-sm text-muted"
    >
      Invited {{ submitted.email }} as {{ submitted.role }}.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, 'Use at least two characters.'),
  email: z.email('Enter a complete email address.'),
  role: z.enum(['viewer', 'editor', 'admin'], { message: 'Pick a role.' }),
})

const fields = [
  {
    name: 'name',
    label: 'Full name',
    placeholder: 'Ada Lovelace',
    icon: 'i-lucide-user',
    autocomplete: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email' as const,
    placeholder: 'ada@example.com',
    icon: 'i-lucide-mail',
    autocomplete: 'email',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select' as const,
    placeholder: 'Choose a role',
    description: 'Admins can invite other people.',
    options: [
      { label: 'Viewer', value: 'viewer', icon: 'i-lucide-eye' },
      { label: 'Editor', value: 'editor', icon: 'i-lucide-pencil' },
      { label: 'Admin', value: 'admin', icon: 'i-lucide-shield' },
    ],
  },
]

const values = ref<Record<string, string | boolean>>({
  name: '',
  email: '',
  role: '',
})

const submitted = ref<Record<string, string | boolean>>({})

function handleSubmit(next: Record<string, string | boolean>) {
  submitted.value = next
}
</script>
```
::

With a schema, `submit` fires only after validation passes, so the handler
receives clean values and never has to build an error map. `errors` still works
alongside it for server-side messages: an entry in the prop wins over the one
the schema produced.

No library at hand? `validate` receives the current values and returns the same
`FormError[]` shape the schema path produces:

```ts
function validate(state: Record<string, string | boolean>) {
  return String(state.email ?? '').includes('@')
    ? []
    : [{ name: 'email', message: 'Enter a complete email address.' }]
}
```

`validateOn` narrows when validation runs, defaulting to
`['input', 'blur', 'change']`. Drop `input` to validate on blur and submit only,
which keeps a long form quiet while someone is still typing.

## Props

::component-props
  ::component-prop{name="fields" type="FormFieldConfig[]" required}
  Ordered field schema. Each entry needs `name` and `label`; `type`,
  `placeholder`, `description`, `options`, `orientation`, `icon`,
  `trailingIcon`, `autocomplete`, `required`, `reveal` and `rows` are optional.
  ::
  ::component-prop{name="modelValue" type="Record<string, string | boolean>"}
  Controlled values keyed by field name. Leave it out to let the form hold its
  own values.
  ::
  ::component-prop{name="errors" type="Record<string, string | undefined>"}
  Error messages keyed by field name. An empty or missing entry means the field
  is valid. An entry here wins over a message produced by `schema` or
  `validate`.
  ::
  ::component-prop{name="schema" type="StandardSchemaV1"}
  Standard Schema validator used to validate the values. Powers submit, blur,
  change and input validation, including the messages Nuxt UI renders under
  each control.
  ::
  ::component-prop{name="validate" type="(state: FormValues) => FormError[] | Promise<FormError[]>"}
  Custom validation used when no schema library is involved. Receives the current
  values and returns messages keyed by `name`.
  ::
  ::component-prop{name="validateOn" type="('input' | 'blur' | 'change' | 'focus')[]" default="['input', 'blur', 'change']"}
  Events that trigger validation. Submit always validates.
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
  the page does not reload. With `schema` or `validate`, it fires only after
  validation passes.
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

- Each control is wrapped in a `UFormField`, which generates the ids that tie the
  label, the helper copy and the error message to the control. Checkbox and
  switch fields keep their label inline; a radio group uses its label as the
  group legend, so the options are announced as one named group.
- `aria-describedby` lists the helper text and the error message together, so a
  screen reader hears both in reading order.
- A field with an error gets `aria-invalid="true"` and the error colour on the
  label, ring and message. The error text is mirrored into a visually hidden
  `role="status"` region, so it is announced politely when it appears rather
  than interrupting the label the user is reading.
- The success state uses a check icon plus the words from `successMessage`; a
  colour is never the only signal that a field is valid.
- The form uses native submission, so pressing Enter in a text field submits
  it. `novalidate` keeps the browser's own bubbles out of the way because
  validation belongs to the caller.
- The entrance stagger and error shake are decorative. Under
  `prefers-reduced-motion: reduce` the stagger is removed and the shake is not
  started at all; error text still appears.
- `disabled` is handed to `UForm`, which forwards it to every control through
  context, so fields cannot be edited or submitted while the form is busy or
  read-only.

## Performance

- Fields render from a single `v-for`; there is no per-field component or
  watcher.
- One shallow error watcher starts the shake for messages that arrive through
  the `errors` prop; schema validation shakes from Nuxt UI's `error` event
  instead. Values are copied shallowly on each edit, not deep-cloned.
- Only the success message animates: it fades in with a CSS transition. Errors
  appear immediately, because a delayed message is a delayed correction. The
  shake runs through the Web Animations API only when a submit produces an
  error, so nothing runs on idle.
- The component has no timers, observers or network requests. Validation stays
  in the caller, so the bundle carries only the layout and behaviour.
